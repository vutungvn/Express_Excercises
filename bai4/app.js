import express from "express";
import employeeRoutes from "./routes/employeeRoutes.js";
import AppError from "./utils/AppError.js";

const app = express();
const PORT = 3000;

// Middleware Parse Body
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

app.use((req, res, next) => {
  next(
    new AppError(
      `Không tìm thấy đường dẫn ${req.originalUrl} trên server`,
      404,
    ),
  );
});

// Global Error Handling Middleware
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

export default app;
