import express from "express";
import AppError from "../utils/AppError.js";

const router = express.Router();

let users = [
  { id: 1, name: "Vũ Văn Thanh Tùng", email: "tung@example.com" },
  { id: 2, name: "Nguyễn Văn A", email: "ana@example.com" },
];

// GET /users/:id
router.get("/:id", (req, res, next) => {
  const userId = +req.params.id;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return next(new AppError("Không tìm thấy user", 404));
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

// POST /users
router.post("/", (req, res, next) => {
  const { name, email } = req.body;

  if (!email) {
    return next(new AppError("Thiếu trường email", 400));
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  return res.status(200).json({
    success: true,
    data: newUser,
  });
});

// GET /users/secret
router.get("/secret/data", (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Chưa xác thực", 401));
  }

  return res.status(200).json({
    success: true,
    data: "Dữ liệu bảo mật cao",
  });
});

export default router;
