import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());

// Nơi lưu trữ file + tên file không trùng nhau
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Validate MIME type
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error("Chỉ chấp nhận file ảnh JPEG/PNG/WEBP");
    error.code = "INVALID_FILE_TYPE";
    cb(error, false);
  }
};

// Khởi tạo multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("avatar");

// Route POST /upload/avatar
app.post("/upload/avatar", (req, res) => {
  upload(req, res, (err) => {
    console.log("err", err);

    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File vượt quá dung lượng cho phép (2MB)",
        });
      }

      if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({
          message: err.message,
        });
      }

      return res.status(400).json({
        message: err.message || "Lỗi khi upload file",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Vui lòng chọn file avatar để upload",
      });
    }

    return res.status(200).json({
      message: "Upload thành công",
      filename: req.file.filename,
      size: req.file.size,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
