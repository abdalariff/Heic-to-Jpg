const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const pLimit = require('p-limit');
const { convertHeicToJpg } = require('../services/conversionService');
const { CONVERTED_DIR } = require('../config');

const convertFiles = async (req, res, next) => {
  try {
    const files = req.files;
    const { quality = 90, batchId } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'No files uploaded' },
      });
    }

    const limit = pLimit(5); // Concurrency limit
    const conversionPromises = files.map((file) =>
      limit(() => convertHeicToJpg(file.path, file.originalname, batchId || req.batchId, quality))
    );

    const results = await Promise.all(conversionPromises);

    res.json({
      success: true,
      batchId: batchId || req.batchId,
      results: results.map((r) => ({
        ...r,
        downloadUrl: r.success ? `/api/converter/download/${batchId || req.batchId}/${r.convertedName}` : null,
      })),
    });
  } catch (error) {
    next(error);
  }
};

const downloadFile = (req, res) => {
  const { batchId, filename } = req.params;
  const filePath = path.join(CONVERTED_DIR, batchId, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: { message: 'File not found' },
    });
  }

  res.download(filePath);
};

const downloadZip = (req, res) => {
  const { batchId } = req.params;
  const batchDir = path.join(CONVERTED_DIR, batchId);

  if (!fs.existsSync(batchDir)) {
    return res.status(404).json({
      success: false,
      error: { message: 'Batch not found' },
    });
  }

  const archive = archiver('zip', { zlib: { level: 9 } });
  res.attachment(`converted_images_${batchId}.zip`);

  archive.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });

  archive.pipe(res);
  archive.directory(batchDir, false);
  archive.finalize();
};

const previewFile = (req, res) => {
  const { batchId, filename } = req.params;
  const filePath = path.join(CONVERTED_DIR, batchId, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: { message: 'File not found' },
    });
  }

  res.sendFile(filePath);
};

module.exports = {
  convertFiles,
  downloadFile,
  downloadZip,
  previewFile,
};
