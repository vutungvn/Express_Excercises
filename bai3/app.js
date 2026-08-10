import express from "express";
import userRoutes from "./routes/userRoutes.js";
import AppError from "./utils/AppError.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Gắn routes
app.use("/users", userRoutes);

// Bắt các route không tồn tại (404)
app.use((req, res, next) => {
  next(
    new AppError(
      `Không tìm thấy đường dẫn ${req.originalUrl} trên server`,
      404,
    ),
  );
});

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Lỗi hệ thống";

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
