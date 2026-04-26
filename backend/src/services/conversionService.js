const convert = require('heic-convert');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { CONVERTED_DIR } = require('../config');
const { ensureDir } = require('../utils/fileHelpers');

const convertHeicToJpg = async (inputPath, originalName, batchId, quality = 90) => {
  try {
    const inputBuffer = await fs.readFile(inputPath);
    
    // Convert HEIC to JPEG buffer
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 1, // Use highest quality for initial conversion
    });

    // Use sharp for further compression and final output
    const batchOutputDir = path.join(CONVERTED_DIR, batchId);
    await ensureDir(batchOutputDir);

    const outputFileName = `${path.parse(inputPath).name}.jpg`;
    const outputPath = path.join(batchOutputDir, outputFileName);

    await sharp(outputBuffer)
      .jpeg({ quality: parseInt(quality), mozjpeg: true })
      .toFile(outputPath);

    const stats = await fs.stat(outputPath);

    return {
      success: true,
      originalName,
      convertedName: outputFileName,
      size: stats.size,
      outputPath,
    };
  } catch (error) {
    console.error(`Conversion failed for ${originalName}:`, error);
    return {
      success: false,
      originalName,
      error: error.message,
    };
  }
};

module.exports = {
  convertHeicToJpg,
};
