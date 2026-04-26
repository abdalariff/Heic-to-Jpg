const express = require('express');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { PORT, FRONTEND_URL, UPLOADS_DIR, CONVERTED_DIR } = require('./config');
const converterRoutes = require('./routes/converter');
const errorHandler = require('./middleware/errorHandler');
const { setupCleanupJob } = require('./utils/cleanup');
const { ensureDir } = require('./utils/fileHelpers');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE'],
}));
app.use(compression());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/converter', converterRoutes);

// Error handling
app.use(errorHandler);

// Initialize server
const startServer = async () => {
  try {
    // Ensure directories exist
    await ensureDir(UPLOADS_DIR);
    await ensureDir(CONVERTED_DIR);

    // Setup cleanup job
    setupCleanupJob();

    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
