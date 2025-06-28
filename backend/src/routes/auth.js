const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register (students only)
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const role = 'student'; // Force all registrations to be students

    // Check if user exists
    const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: {
          code: 'USER_EXISTS',
          message: 'User already exists with this email'
        }
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await db.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role',
      [email, hashedPassword, firstName, lastName, role]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: {
        code: 'REGISTRATION_FAILED',
        message: 'Registration failed'
      }
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await db.query(
      'SELECT id, email, password_hash, first_name, last_name, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: {
        code: 'LOGIN_FAILED',
        message: 'Login failed'
      }
    });
  }
});

// Get dashboard statistics
router.get('/dashboard-stats', authenticateToken, async (req, res) => {
  try {
    const { userId, role } = req.user;
    
    let stats = {};
    
    if (role === 'admin') {
      // Admin stats: total students, coaches, leagues, registrations
      const studentsQuery = 'SELECT COUNT(*) as count FROM users WHERE role = $1';
      const coachesQuery = 'SELECT COUNT(*) as count FROM users WHERE role = $1';
      const leaguesQuery = 'SELECT COUNT(*) as count FROM league_templates WHERE is_active = true';
      const registrationsQuery = 'SELECT COUNT(*) as count FROM public_league_registrations';
      const weeklyRegistrationsQuery = `
        SELECT COUNT(*) as count FROM public_league_registrations 
        WHERE registration_date >= date_trunc('week', CURRENT_DATE)
      `;
      
      const [students, coaches, leagues, registrations, weeklyRegs] = await Promise.all([
        db.query(studentsQuery, ['student']),
        db.query(coachesQuery, ['coach']),
        db.query(leaguesQuery),
        db.query(registrationsQuery),
        db.query(weeklyRegistrationsQuery)
      ]);
      
      stats = {
        totalStudents: parseInt(students.rows[0].count),
        totalCoaches: parseInt(coaches.rows[0].count),
        activeLeagues: parseInt(leagues.rows[0].count),
        totalRegistrations: parseInt(registrations.rows[0].count),
        weeklyRegistrations: parseInt(weeklyRegs.rows[0].count)
      };
      
    } else if (role === 'coach') {
      // Coach stats: total students, skills assigned, average skill ratings
      const studentsQuery = 'SELECT COUNT(DISTINCT user_id) as count FROM skills WHERE created_by = $1';
      const skillsQuery = 'SELECT COUNT(*) as count FROM skills WHERE created_by = $1';
      const avgRatingQuery = 'SELECT AVG(rating) as avg FROM skills WHERE created_by = $1';
      
      const [students, skills, avgRating] = await Promise.all([
        db.query(studentsQuery, [userId]),
        db.query(skillsQuery, [userId]),
        db.query(avgRatingQuery, [userId])
      ]);
      
      stats = {
        studentsCoached: parseInt(students.rows[0].count),
        skillsAssigned: parseInt(skills.rows[0].count),
        averageSkillRating: parseFloat(avgRating.rows[0].avg || 0).toFixed(1)
      };
      
    } else if (role === 'student') {
      // Student stats: skills tracked, average rating, league registrations
      const skillsQuery = 'SELECT COUNT(*) as count, AVG(rating) as avg FROM skills WHERE user_id = $1';
      const registrationsQuery = 'SELECT COUNT(*) as count FROM public_league_registrations WHERE email = $2';
      
      const userEmail = req.user.email;
      const [skills, registrations] = await Promise.all([
        db.query(skillsQuery, [userId]),
        db.query(registrationsQuery, [userId, userEmail])
      ]);
      
      stats = {
        skillsTracked: parseInt(skills.rows[0].count),
        averageRating: parseFloat(skills.rows[0].avg || 0).toFixed(1),
        leagueRegistrations: parseInt(registrations.rows[0].count)
      };
    }
    
    res.json({ stats });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

module.exports = router;