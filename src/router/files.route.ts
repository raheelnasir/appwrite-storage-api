import express from "express";
import { 
  uploadFile, 
  getFileUrl, 
  getFileMetadata, 
  deleteFile,
  getFileUrlByName 
} from "@/controller";
import { upload } from "@/config";

const router = express.Router();

/**
 * @route POST /upload
 * @description Upload a file to Appwrite storage. Requires a file in the request using multipart/form-data.
 * @access Public
 * @returns {Object} Message confirming upload and the file ID
 */
router.post("/upload", upload.single("file"), uploadFile);

/**
 * @route GET /file/:fileId
 * @description Retrieve and stream a file by its ID from Appwrite storage.
 * @access Public
 * @param {string} fileId - The unique identifier of the file in Appwrite
 * @returns {Stream} File content with appropriate content-type headers
 */
router.get("/file/:fileId", getFileUrl);

/**
 * @route GET /file/byname/:fileName
 * @description Retrieve and stream a file by its name from Appwrite storage.
 * @access Public
 * @param {string} fileName - The name of the file to retrieve
 * @returns {Stream} File content with appropriate content-type headers
 */
router.get("/file/byname/:fileName", getFileUrlByName);

/**
 * @route GET /file/metadata/:fileId
 * @description Retrieve file metadata such as size, type, and creation date.
 * @access Public
 * @param {string} fileId - The unique identifier of the file in Appwrite
 * @returns {Object} File metadata object including size, MIME type, creation date, etc.
 */
router.get("/file/metadata/:fileId", getFileMetadata);

/**
 * @route DELETE /file/:fileId
 * @description Delete a file from Appwrite storage.
 * @access Public
 * @param {string} fileId - The unique identifier of the file to delete
 * @returns {Object} Message confirming successful deletion
 */
router.delete("/file/:fileId", deleteFile);

export { router as fileRoutes };