import express from "express";
import { deleteFile, getFileMetadata, getFileUrl, uploadFile } from "../controller";
import { upload } from "../config";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:fileId", getFileUrl);
router.get("/file/metadata/:fileId", getFileMetadata);
router.delete("/file/:fileId", deleteFile);

export default router;
