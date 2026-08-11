import AppError from "../utils/AppError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Chưa đăng nhập", 401));
  }

  // Mô phỏng lấy role trực tiếp từ header Authorization (ví dụ: Authorization: admin)
  const role = authHeader.toLowerCase().trim();

  req.user = {
    id: 1,
    role: role,
  };

  next();
};

export const authorize = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return next(new AppError("Không đủ quyền truy cập", 403));
    }
    next();
  };
};
