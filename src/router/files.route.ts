import express from "express";
import { uploadFile, getFileUrl, getFileMetadata, deleteFile } from "../controller";
import { upload } from "../config";

const router = express.Router();

/**
 * @route POST /upload
 * @description Upload a file to Appwrite
 */
router.post("/upload", upload.single("file"), uploadFile);

/**
 * @route GET /file/:fileId
 * @description Retrieve file preview URL
 */
router.get("/file/:fileId", getFileUrl);

/**
 * @route GET /file/metadata/:fileId
 * @description Retrieve file metadata
 */
router.get("/file/metadata/:fileId", getFileMetadata);

/**
 * @route DELETE /file/:fileId
 * @description Delete a file from Appwrite
 */
router.delete("/file/:fileId", deleteFile);

export default router;
