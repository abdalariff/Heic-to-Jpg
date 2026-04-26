const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.message === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: 'Only HEIC/HEIF files are supported',
      },
    });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: 'File exceeds the size limit',
      },
    });
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
    },
  });
};

module.exports = errorHandler;
