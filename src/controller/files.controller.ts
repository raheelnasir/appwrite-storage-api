import { Request, Response } from "express";
import fs from "fs";
import { ID } from "node-appwrite";
import { storage } from "@/config";
import { getContentTypeFromFileName } from "@/utils";

/**
 * @description Uploads a file to Appwrite storage
 * @route POST /upload
 * @access Public
 */
export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // Read file as buffer
    const fileBuffer = fs.readFileSync(req.file.path);

    // Convert buffer to File object
    const file = new File([fileBuffer], req.file.originalname, {
      type: req.file.mimetype,
    });

    // Upload file to Appwrite (Pass File object)
    const response = await storage.createFile(
      process.env.BUCKET_ID as string,
      ID.unique(),
      file
    );

    res.status(201).json({
      message: "File uploaded successfully",
      fileId: response.$id,
    });

    // Cleanup: Delete temp file after upload
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
export const getFileUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Generate a public file preview URL from Appwrite
    const file = await storage.getFileView(
      process.env.BUCKET_ID as string,
      req.params.fileId
    );
    const buffer = Buffer.from(file);

    // Set appropriate headers
    res.setHeader("Content-Type", "image/png"); // Change based on file type
    res.setHeader("Content-Length", buffer.length);

    // Send file data
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @description Retrieves file metadata such as size, type, and creation date
 * @route GET /file/metadata/:fileId
 * @access Public
 */
export const getFileMetadata = async (
  req: Request,
  res: Response
): Promise<void> => {
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
export const deleteFile = async (
  req: Request,
  res: Response
): Promise<void> => {
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

/**
 * @description Retrieves a file URL by its name
 * @route GET /file/byname/:fileName
 * @access Public
 */
export const getFileUrlByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fileName = req.params.fileName;
    const bucketId = process.env.BUCKET_ID as string;

    if (!fileName) {
      res.status(400).json({ error: "Filename is required" });
      return;
    }

    // First get the file by its name to retrieve the fileId
    try {
      // Query to find the file by name
      const fileList = await storage.listFiles(bucketId, [
        `name="${fileName}"`,
      ]);

      if (fileList.total === 0) {
        res.status(404).json({ error: "File not found" });
        return;
      }

      const fileId = fileList.files[0].$id;

      // Get the file content
      const file = await storage.getFileView(bucketId, fileId);
      const buffer = Buffer.from(file);

      // Determine content type from filename
      const contentType = getContentTypeFromFileName(fileName);

      // Set appropriate headers
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Length", buffer.length);

      // Send file data
      res.send(buffer);
    } catch (error) {
      res.status(404).json({ error: "File not found" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
