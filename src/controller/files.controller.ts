import { Request, Response } from "express";
import { storage } from "../config/appwrite";

/**
 * Upload File
 */
export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const response = await storage.createFile(
      process.env.BUCKET_ID as string,
      "unique()", // Generate a unique ID
      new File([req.file.buffer], req.file.originalname, { type: req.file.mimetype }),
      [req.file.mimetype]
    );

    res.json({
      message: "File uploaded successfully",
      fileId: response.$id,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get File Preview URL
 */
export const getFileUrl = (req: Request, res: Response) => {
  try {
    const fileUrl = storage.getFileView(process.env.BUCKET_ID as string, req.params.fileId);
    res.json({ fileUrl });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get File Metadata
 */
export const getFileMetadata = async (req: Request, res: Response) => {
  try {
    const metadata = await storage.getFile(process.env.BUCKET_ID as string, req.params.fileId);
    res.json({ metadata });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete File
 */
export const deleteFile = async (req: Request, res: Response) => {
  try {
    await storage.deleteFile(process.env.BUCKET_ID as string, req.params.fileId);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
