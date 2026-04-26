const fs = require('fs').promises;
const path = require('path');
const { UPLOADS_DIR, CONVERTED_DIR } = require('../config');

const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

const cleanupDirectory = async (dirPath, ttlMin) => {
  try {
    const files = await fs.readdir(dirPath);
    const now = Date.now();
    const ttlMs = ttlMin * 60 * 1000;

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      
      if (now - stats.mtimeMs > ttlMs) {
        await fs.rm(filePath, { recursive: true, force: true });
      }
    }
  } catch (error) {
    console.error(`Error cleaning up directory ${dirPath}:`, error);
  }
};

module.exports = {
  ensureDir,
  cleanupDirectory,
};
