require('dotenv').config();
const path = require('path');

module.exports = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 50 * 1024 * 1024,
  MAX_FILES: parseInt(process.env.MAX_FILES) || 20,
  TEMP_DIR: path.resolve(__dirname, '../../temp'),
  UPLOADS_DIR: path.resolve(__dirname, '../../temp/uploads'),
  CONVERTED_DIR: path.resolve(__dirname, '../../temp/converted'),
  CLEANUP_INTERVAL_MIN: parseInt(process.env.CLEANUP_INTERVAL_MIN) || 5,
  FILE_TTL_MIN: parseInt(process.env.FILE_TTL_MIN) || 10,
};
