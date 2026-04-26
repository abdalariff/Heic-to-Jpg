const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { UPLOADS_DIR, MAX_FILE_SIZE } = require('../config');
const { ensureDir } = require('../utils/fileHelpers');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const batchId = req.body.batchId || uuidv4();
    req.batchId = batchId;
    const dest = path.join(UPLOADS_DIR, batchId);
    
    // Using synchronous mkdir here because multer's destination doesn't support async/await easily
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.heic', '.heif'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('INVALID_FILE_TYPE'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

module.exports = upload;
