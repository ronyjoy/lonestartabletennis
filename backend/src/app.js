const express = require('express');
const cors = require('cors');
const path = require('path');
// Simplified without extra dependencies

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const skillRoutes = require('./routes/skills');
const commentRoutes = require('./routes/comments');
const leagueRoutes = require('./routes/leagues');
const matchRoutes = require('./routes/matches');
const publicLeagueRoutes = require('./routes/publicLeagues');

const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/public/leagues', publicLeagueRoutes);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'API route not found'
      }
    });
  } else {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
});

// Global error handler
app.use(errorHandler);

module.exports = app;