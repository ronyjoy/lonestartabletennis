const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = require('./src/app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3001;

// Ensure server binds to all interfaces in container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏓 Table Tennis Academy API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});