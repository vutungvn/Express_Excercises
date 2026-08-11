import multer from "multer";
import path from "path";
import AppError from "../utils/AppError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `thumb-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Chỉ chấp nhận file ảnh (image/*)", 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

export const uploadThumbnailMiddleware = (req, res, next) => {
  const singleUpload = upload.single("thumbnail");

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(
          new AppError("File vượt quá dung lượng cho phép (2MB)", 400),
        );
      }
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(err);
    }
    next();
  });
};
