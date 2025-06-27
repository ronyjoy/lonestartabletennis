const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = require('./src/app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🏓 Table Tennis Academy API running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});