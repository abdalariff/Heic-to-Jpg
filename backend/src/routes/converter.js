const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const converterController = require('../controllers/converterController');

router.post('/convert', upload.array('files'), converterController.convertFiles);
router.get('/download/:batchId/:filename', converterController.downloadFile);
router.get('/zip/:batchId', converterController.downloadZip);
router.get('/preview/:batchId/:filename', converterController.previewFile);

module.exports = router;
