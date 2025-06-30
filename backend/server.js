require('dotenv').config();

const app = require('./src/app');
const { runCriticalMigrations } = require('./src/utils/autoMigrate');

const PORT = process.env.PORT || 3001;

// Auto-run critical migrations on startup
async function startServer() {
  try {
    // Run auto-migrations first
    await runCriticalMigrations();
    
    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🏓 Table Tennis Academy API running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Server listening on 0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();