import express from "express";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import AppError from "./utils/AppError.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

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
