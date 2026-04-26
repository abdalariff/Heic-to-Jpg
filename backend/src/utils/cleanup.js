const cron = require('node-cron');
const { UPLOADS_DIR, CONVERTED_DIR, CLEANUP_INTERVAL_MIN, FILE_TTL_MIN } = require('../config');
const { cleanupDirectory } = require('./fileHelpers');

const setupCleanupJob = () => {
  // Run every X minutes
  cron.schedule(`*/${CLEANUP_INTERVAL_MIN} * * * *`, async () => {
    console.log('Running cleanup job...');
    await cleanupDirectory(UPLOADS_DIR, FILE_TTL_MIN);
    await cleanupDirectory(CONVERTED_DIR, FILE_TTL_MIN);
    console.log('Cleanup job complete.');
  });
};

module.exports = {
  setupCleanupJob,
};
