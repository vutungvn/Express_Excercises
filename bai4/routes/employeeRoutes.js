import express from "express";
import {
  getEmployees,
  createEmployee,
  getEmployeeById,
  uploadAvatar,
} from "../controllers/employeeController.js";
import { uploadAvatarMiddleware } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployeeById);
router.post("/:id/avatar", uploadAvatarMiddleware, uploadAvatar);

export default router;
