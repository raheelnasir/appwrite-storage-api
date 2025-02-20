import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { ID } from "node-appwrite";
import { InputFile } from 'node-appwrite/dist/inputFile';
import { storage } from "@/config";

/**
 * @description Uploads a file to Appwrite storage
 * @route POST /upload
 * @access Public
 */
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // For Appwrite Node SDK, we need to create an InputFile
    const file = req.file;
    
    // Upload file to Appwrite storage using InputFile
    const response = await storage.createFile(
      process.env.BUCKET_ID as string, // Bucket ID
      ID.unique(), // Unique file ID
      InputFile.fromPath(file.path, file.originalname || path.basename(file.path))
    );

    // Send success response
    res.status(201).json({
      message: "File uploaded successfully",
      fileId: response.$id,
    });

    // Cleanup: Delete temporary file from server
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @description Retrieves the preview URL of a file
 * @route GET /file/:fileId
 * @access Public
 */
export const getFileUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // Generate a public file preview URL from Appwrite
    const fileUrl = storage.getFileView(
      process.env.BUCKET_ID as string,
      req.params.fileId
    );
    
    // Send file URL as JSON response
    res.json({ fileUrl });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @description Retrieves file metadata such as size, type, and creation date
 * @route GET /file/metadata/:fileId
 * @access Public
 */
export const getFileMetadata = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch file metadata from Appwrite storage
    const metadata = await storage.getFile(
      process.env.BUCKET_ID as string,
      req.params.fileId
    );
    
    // Return metadata as response
    res.json({ metadata });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @description Deletes a file from Appwrite storage
 * @route DELETE /file/:fileId
 * @access Public
 */
export const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Delete file from Appwrite storage
    await storage.deleteFile(
      process.env.BUCKET_ID as string,
      req.params.fileId
    );
    
    // Send success response
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};