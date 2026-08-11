import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  deletePostById,
} from "../controllers/postController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { uploadThumbnailMiddleware } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authenticate, uploadThumbnailMiddleware, createPost);
router.delete("/:id", authenticate, authorize("admin"), deletePostById);

export default router;
