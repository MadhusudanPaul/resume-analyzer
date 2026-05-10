// ============================================================
// utils/upload.js — Multer config for PDF uploads
// ============================================================
import multer from "multer";

// Store file in memory so we can parse it without saving to disk
const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept PDF files only
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;
