const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: {
        code: 'FORBIDDEN',
        message: 'Admin access required'
      }
    });
  }
  next();
};

// Get all users (admin only)
router.get('/admin/users', authenticateToken, adminOnly, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, email, first_name, last_name, role, is_active, created_at
      FROM users 
      ORDER BY role, last_name, first_name
    `);

    const users = result.rows.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      is_active: user.is_active,
      created_at: user.created_at
    }));

    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: {
        code: 'FETCH_USERS_FAILED',
        message: 'Failed to fetch users'
      }
    });
  }
});

// Create user (admin only)
router.post('/admin/create-user', authenticateToken, adminOnly, async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'All fields are required'
        }
      });
    }

    if (!['student', 'coach', 'admin'].includes(role)) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid role'
        }
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Password must be at least 6 characters long'
        }
      });
    }

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
      'INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role, is_active',
      [email, hashedPassword, firstName, lastName, role]
    );

    const user = result.rows[0];

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        is_active: user.is_active
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: {
        code: 'CREATE_USER_FAILED',
        message: 'Failed to create user'
      }
    });
  }
});

// Delete user (admin only) - hard delete for students
router.delete('/admin/users/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists and get their role
    const userResult = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    const userRole = userResult.rows[0].role;

    // Prevent deletion of admin users
    if (userRole === 'admin') {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Cannot delete admin users'
        }
      });
    }

    // Only allow hard deletion for students
    if (userRole !== 'student') {
      return res.status(400).json({
        error: {
          code: 'INVALID_OPERATION',
          message: 'Use archive endpoint for coaches'
        }
      });
    }

    // Delete user (this will cascade delete related records)
    await db.query('DELETE FROM users WHERE id = $1', [userId]);

    res.json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      error: {
        code: 'DELETE_USER_FAILED',
        message: 'Failed to delete user'
      }
    });
  }
});

// Archive user (admin only) - soft delete for coaches and students
router.put('/admin/users/:id/archive', authenticateToken, adminOnly, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists
    const userResult = await db.query('SELECT role, is_active FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    const user = userResult.rows[0];

    // Prevent archiving of admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Cannot archive admin users'
        }
      });
    }

    // Archive user (set is_active to false)
    await db.query('UPDATE users SET is_active = false WHERE id = $1', [userId]);

    res.json({
      message: 'User archived successfully'
    });
  } catch (error) {
    console.error('Error archiving user:', error);
    res.status(500).json({
      error: {
        code: 'ARCHIVE_USER_FAILED',
        message: 'Failed to archive user'
      }
    });
  }
});

// Reactivate user (admin only)
router.put('/admin/users/:id/reactivate', authenticateToken, adminOnly, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists
    const userResult = await db.query('SELECT is_active FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    // Reactivate user (set is_active to true)
    await db.query('UPDATE users SET is_active = true WHERE id = $1', [userId]);

    res.json({
      message: 'User reactivated successfully'
    });
  } catch (error) {
    console.error('Error reactivating user:', error);
    res.status(500).json({
      error: {
        code: 'REACTIVATE_USER_FAILED',
        message: 'Failed to reactivate user'
      }
    });
  }
});

module.exports = router;