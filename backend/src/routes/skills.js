const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get skills based on user role
router.get('/', auth, async (req, res) => {
  try {
    const { studentId } = req.query;
    let query, params;

    if (req.user.role === 'student') {
      // Students can only see their own skills
      query = `
        SELECT sa.id, sa.score as rating, sa.notes, sa.created_at as updated_at,
               sc.name as skill_name, u.first_name, u.last_name
        FROM skill_assessments sa 
        JOIN skill_categories sc ON sa.skill_category_id = sc.id
        JOIN users u ON sa.student_id = u.id 
        WHERE sa.student_id = $1 
        ORDER BY sc.name`;
      params = [req.userId];
    } else if (req.user.role === 'coach' && studentId) {
      // Coaches can view specific student's skills
      query = `
        SELECT sa.id, sa.score as rating, sa.notes, sa.created_at as updated_at,
               sc.name as skill_name, u.first_name, u.last_name
        FROM skill_assessments sa 
        JOIN skill_categories sc ON sa.skill_category_id = sc.id
        JOIN users u ON sa.student_id = u.id 
        WHERE sa.student_id = $1 
        ORDER BY sc.name`;
      params = [studentId];
    } else if (req.user.role === 'coach') {
      // Coaches can see all student skills
      query = `
        SELECT sa.id, sa.score as rating, sa.notes, sa.created_at as updated_at,
               sc.name as skill_name, u.first_name, u.last_name
        FROM skill_assessments sa 
        JOIN skill_categories sc ON sa.skill_category_id = sc.id
        JOIN users u ON sa.student_id = u.id 
        WHERE u.role = 'student' 
        ORDER BY u.first_name, sc.name`;
      params = [];
    } else {
      // Admins can see all skills
      query = `
        SELECT sa.id, sa.score as rating, sa.notes, sa.created_at as updated_at,
               sc.name as skill_name, u.first_name, u.last_name
        FROM skill_assessments sa 
        JOIN skill_categories sc ON sa.skill_category_id = sc.id
        JOIN users u ON sa.student_id = u.id 
        ORDER BY u.first_name, sc.name`;
      params = [];
    }
    
    const result = await db.query(query, params);
    
    res.json({
      skills: result.rows
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      error: {
        code: 'GET_SKILLS_FAILED',
        message: 'Failed to fetch skills'
      }
    });
  }
});

// Get all students (for coaches)
router.get('/students', auth, async (req, res) => {
  try {
    if (req.user.role !== 'coach' && req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Only coaches and admins can view students'
        }
      });
    }

    const result = await db.query(
      'SELECT id, first_name, last_name, email FROM users WHERE role = $1 ORDER BY first_name, last_name',
      ['student']
    );
    
    res.json({
      students: result.rows
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      error: {
        code: 'GET_STUDENTS_FAILED',
        message: 'Failed to fetch students'
      }
    });
  }
});

// Add or update a skill (coaches only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'coach' && req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Only coaches and admins can add skills'
        }
      });
    }

    const { skillName, rating, notes, studentId } = req.body;

    if (!skillName || rating === undefined || !studentId) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Skill name, rating, and student ID are required'
        }
      });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Rating must be between 1 and 10'
        }
      });
    }

    // Verify student exists and is a student
    const studentCheck = await db.query(
      'SELECT id FROM users WHERE id = $1 AND role = $2',
      [studentId, 'student']
    );

    if (studentCheck.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'STUDENT_NOT_FOUND',
          message: 'Student not found'
        }
      });
    }

    // Get or create skill category
    let skillCategoryResult = await db.query(
      'SELECT id FROM skill_categories WHERE name = $1',
      [skillName]
    );

    let skillCategoryId;
    if (skillCategoryResult.rows.length === 0) {
      // Create new skill category
      const newCategory = await db.query(
        'INSERT INTO skill_categories (name, max_score) VALUES ($1, 10) RETURNING id',
        [skillName]
      );
      skillCategoryId = newCategory.rows[0].id;
    } else {
      skillCategoryId = skillCategoryResult.rows[0].id;
    }

    // Check if assessment already exists for this student and skill
    const existingAssessment = await db.query(
      'SELECT id FROM skill_assessments WHERE student_id = $1 AND skill_category_id = $2',
      [studentId, skillCategoryId]
    );

    let result;
    if (existingAssessment.rows.length > 0) {
      // Update existing assessment
      result = await db.query(
        'UPDATE skill_assessments SET score = $1, notes = $2, coach_id = $3, assessment_date = CURRENT_DATE WHERE student_id = $4 AND skill_category_id = $5 RETURNING *',
        [rating, notes || '', req.userId, studentId, skillCategoryId]
      );
    } else {
      // Create new assessment
      result = await db.query(
        'INSERT INTO skill_assessments (student_id, skill_category_id, coach_id, score, notes, assessment_date) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) RETURNING *',
        [studentId, skillCategoryId, req.userId, rating, notes || '']
      );
    }

    res.json({
      skill: result.rows[0]
    });
  } catch (error) {
    console.error('Add/Update skill error:', error);
    res.status(500).json({
      error: {
        code: 'SKILL_OPERATION_FAILED',
        message: 'Failed to save skill'
      }
    });
  }
});

// Delete a skill assessment
router.delete('/:skillId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'coach' && req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Only coaches and admins can delete skills'
        }
      });
    }

    const { skillId } = req.params;

    const result = await db.query(
      'DELETE FROM skill_assessments WHERE id = $1 RETURNING *',
      [skillId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'SKILL_NOT_FOUND',
          message: 'Skill assessment not found'
        }
      });
    }

    res.json({
      message: 'Skill assessment deleted successfully'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      error: {
        code: 'DELETE_SKILL_FAILED',
        message: 'Failed to delete skill assessment'
      }
    });
  }
});

module.exports = router;