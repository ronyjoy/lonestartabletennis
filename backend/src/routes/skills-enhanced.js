const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get skills with ratings history based on user role
router.get('/', auth, async (req, res) => {
  try {
    const { studentId, skillId, showHistory } = req.query;
    
    if (req.user.role === 'student') {
      // Students see their own skills with cumulative average ratings from all coaches
      const query = `
        SELECT 
          s.id as skill_id,
          s.skill_name,
          u.first_name as student_first_name,
          u.last_name as student_last_name,
          ROUND(AVG(sr.rating)::numeric, 1) as rating,
          STRING_AGG(DISTINCT sr.notes, ' | ') FILTER (WHERE sr.notes IS NOT NULL AND sr.notes != '') as notes,
          MAX(sr.created_at) as rating_created_at,
          COUNT(DISTINCT sr.coach_id) as coach_count
        FROM skills s
        JOIN users u ON s.user_id = u.id
        JOIN skill_ratings sr ON s.id = sr.skill_id
        WHERE s.user_id = $1 
        GROUP BY s.id, s.skill_name, u.first_name, u.last_name
        ORDER BY s.skill_name
      `;
      
      const result = await db.query(query, [req.user.userId]);
      return res.json({ skills: result.rows });
    }
    
    if (studentId && skillId) {
      // Get detailed history for a specific student's skill
      const query = `
        SELECT * FROM skill_rating_history 
        WHERE user_id = $1 AND skill_id = $2 
        ORDER BY coach_first_name, created_at DESC
      `;
      
      const result = await db.query(query, [studentId, skillId]);
      return res.json({ skillHistory: result.rows });
    }
    
    if (studentId) {
      // Get skills for a specific student (coaches/admins viewing student)
      let query = `
        SELECT 
          skill_id,
          skill_name,
          student_first_name,
          student_last_name,
          coach_id,
          coach_first_name,
          coach_last_name,
          rating,
          notes,
          rating_created_at,
          rating_rank
        FROM current_skill_ratings 
        WHERE user_id = $1 
        ${showHistory === 'true' ? '' : 'AND rating_rank = 1'}
      `;
      
      let queryParams = [studentId];
      
      // If user is a coach, only show their own ratings
      if (req.user.role === 'coach') {
        query += ' AND coach_id = $2';
        queryParams.push(req.user.userId);
      }
      
      query += ' ORDER BY skill_name, coach_first_name, rating_created_at DESC';
      
      const result = await db.query(query, queryParams);
      return res.json({ skills: result.rows });
    }
    
    // Default: Get all skills overview (coaches/admins)
    let query = `
      SELECT 
        skill_id,
        skill_name,
        student_first_name,
        student_last_name,
        coach_id,
        coach_first_name,
        coach_last_name,
        rating,
        notes,
        rating_created_at,
        rating_rank,
        -- Add summary stats
        (SELECT COUNT(*) FROM skill_ratings sr2 WHERE sr2.skill_id = current_skill_ratings.skill_id) as total_ratings,
        (SELECT AVG(rating) FROM skill_ratings sr3 WHERE sr3.skill_id = current_skill_ratings.skill_id) as avg_rating
      FROM current_skill_ratings 
      WHERE rating_rank = 1
    `;
    
    let queryParams = [];
    
    // If user is a coach, only show their own ratings
    if (req.user.role === 'coach') {
      query += ' AND coach_id = $1';
      queryParams.push(req.user.userId);
    }
    
    query += ' ORDER BY student_first_name, student_last_name, skill_name, coach_first_name';
    
    const result = await db.query(query, queryParams);
    res.json({ skills: result.rows });
    
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

// Get skill history for graphing (students see cumulative averages over time)
router.get('/history', auth, async (req, res) => {
  try {
    const { studentId } = req.query;
    
    // Determine which student to get history for
    const targetStudentId = req.user.role === 'student' ? req.user.userId : studentId;
    
    if (!targetStudentId) {
      return res.status(400).json({
        error: {
          code: 'MISSING_STUDENT_ID',
          message: 'Student ID is required'
        }
      });
    }
    
    if (req.user.role === 'student') {
      // Students see their cumulative average progress over time
      const query = `
        WITH skill_timeline AS (
          SELECT 
            sr.created_at::date as rating_date,
            s.skill_name,
            AVG(sr.rating) as avg_rating
          FROM skill_ratings sr
          JOIN skills s ON sr.skill_id = s.id
          WHERE s.user_id = $1
          GROUP BY sr.created_at::date, s.skill_name
          ORDER BY rating_date
        ),
        cumulative_averages AS (
          SELECT 
            rating_date,
            AVG(avg_rating) as overall_avg
          FROM skill_timeline
          GROUP BY rating_date
          ORDER BY rating_date
        )
        SELECT 
          rating_date,
          ROUND(overall_avg::numeric, 1) as overall_average
        FROM cumulative_averages
        ORDER BY rating_date
      `;
      
      const result = await db.query(query, [targetStudentId]);
      return res.json({ history: result.rows });
    } else {
      // Coaches/admins see detailed history
      let query = `
        WITH daily_averages AS (
          SELECT 
            sr.created_at::date as rating_date,
            s.skill_name,
            AVG(sr.rating) as avg_rating,
            COUNT(*) as rating_count
          FROM skill_ratings sr
          JOIN skills s ON sr.skill_id = s.id
          WHERE s.user_id = $1
      `;
      
      let queryParams = [targetStudentId];
      
      // If user is a coach, only show their own ratings
      if (req.user.role === 'coach') {
        query += ' AND sr.coach_id = $2';
        queryParams.push(req.user.userId);
      }
      
      query += `
          GROUP BY sr.created_at::date, s.skill_name
        ),
        overall_daily AS (
          SELECT 
            rating_date,
            AVG(avg_rating) as overall_avg,
            SUM(rating_count) as total_ratings
          FROM daily_averages
          GROUP BY rating_date
          ORDER BY rating_date
        )
        SELECT 
          rating_date,
          ROUND(overall_avg::numeric, 1) as overall_average,
          total_ratings
        FROM overall_daily
        ORDER BY rating_date
      `;
      
      const result = await db.query(query, queryParams);
      return res.json({ history: result.rows });
    }
    
  } catch (error) {
    console.error('Get skill history error:', error);
    res.status(500).json({
      error: {
        code: 'GET_HISTORY_FAILED',
        message: 'Failed to fetch skill history'
      }
    });
  }
});

// Get skill statistics for dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    const { studentId } = req.query;
    
    let query, params;
    
    if (req.user.role === 'student') {
      // Student stats
      query = `
        SELECT 
          COUNT(DISTINCT skill_id) as total_skills,
          ROUND(AVG(rating)::numeric, 1) as avg_rating,
          COUNT(DISTINCT coach_id) as coaches_count,
          MAX(rating_created_at) as last_assessment
        FROM current_skill_ratings 
        WHERE user_id = $1 AND rating_rank = 1
      `;
      params = [req.user.userId];
    } else if (studentId) {
      // Specific student stats (for coaches/admins)
      query = `
        SELECT 
          COUNT(DISTINCT skill_id) as total_skills,
          ROUND(AVG(rating)::numeric, 1) as avg_rating,
          COUNT(DISTINCT coach_id) as coaches_count,
          MAX(rating_created_at) as last_assessment
        FROM current_skill_ratings 
        WHERE user_id = $1 AND rating_rank = 1
      `;
      params = [studentId];
      
      // If user is a coach, only show their own ratings for this student
      if (req.user.role === 'coach') {
        query = query.replace('WHERE user_id = $1 AND rating_rank = 1', 'WHERE user_id = $1 AND rating_rank = 1 AND coach_id = $2');
        params.push(req.user.userId);
      }
    } else {
      // Overall stats (admins or coaches viewing their overall stats)
      if (req.user.role === 'coach') {
        // Coach stats - only their ratings
        query = `
          SELECT 
            COUNT(DISTINCT skill_id) as total_skills,
            COUNT(DISTINCT user_id) as total_students,
            1 as total_coaches,
            ROUND(AVG(rating)::numeric, 1) as avg_rating
          FROM current_skill_ratings 
          WHERE rating_rank = 1 AND coach_id = $1
        `;
        params = [req.user.userId];
      } else {
        // Admin stats - all ratings
        query = `
          SELECT 
            COUNT(DISTINCT skill_id) as total_skills,
            COUNT(DISTINCT user_id) as total_students,
            COUNT(DISTINCT coach_id) as total_coaches,
            ROUND(AVG(rating)::numeric, 1) as avg_rating
          FROM current_skill_ratings 
          WHERE rating_rank = 1
        `;
        params = [];
      }
    }
    
    const result = await db.query(query, params);
    res.json({ stats: result.rows[0] });
    
  } catch (error) {
    console.error('Get skill stats error:', error);
    res.status(500).json({
      error: {
        code: 'GET_STATS_FAILED',
        message: 'Failed to fetch skill statistics'
      }
    });
  }
});

// Get students list for coaches/admins
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
      `SELECT 
        id, 
        first_name, 
        last_name, 
        email,
        (SELECT COUNT(DISTINCT skill_id) FROM current_skill_ratings WHERE user_id = users.id) as skills_count,
        (SELECT ROUND(AVG(rating)::numeric, 1) FROM current_skill_ratings WHERE user_id = users.id AND rating_rank = 1) as avg_rating
      FROM users 
      WHERE role = $1 
      ORDER BY first_name, last_name`,
      ['student']
    );
    
    res.json({ students: result.rows });
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

// Add new skill rating
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'coach' && req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Only coaches and admins can add skill ratings'
        }
      });
    }

    const { skillName, rating, notes, studentId } = req.body;

    // Validation
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

    // Verify student exists
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

    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');

      // Get or create skill
      let skillResult = await client.query(
        'SELECT id FROM skills WHERE user_id = $1 AND skill_name = $2',
        [studentId, skillName]
      );

      let skillId;
      if (skillResult.rows.length === 0) {
        // Create new skill
        const newSkill = await client.query(
          'INSERT INTO skills (user_id, skill_name) VALUES ($1, $2) RETURNING id',
          [studentId, skillName]
        );
        skillId = newSkill.rows[0].id;
      } else {
        skillId = skillResult.rows[0].id;
      }

      // Add new rating
      const ratingResult = await client.query(
        `INSERT INTO skill_ratings (skill_id, coach_id, rating, notes) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, created_at`,
        [skillId, req.user.userId, rating, notes || '']
      );

      // Update skill updated_at timestamp
      await client.query(
        'UPDATE skills SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [skillId]
      );

      await client.query('COMMIT');

      // Get the complete rating info for response
      const newRating = await db.query(
        `SELECT 
          sr.id, sr.rating, sr.notes, sr.created_at,
          s.skill_name, s.user_id,
          u_student.first_name as student_first_name,
          u_student.last_name as student_last_name,
          u_coach.first_name as coach_first_name,
          u_coach.last_name as coach_last_name
        FROM skill_ratings sr
        JOIN skills s ON sr.skill_id = s.id
        JOIN users u_student ON s.user_id = u_student.id
        JOIN users u_coach ON sr.coach_id = u_coach.id
        WHERE sr.id = $1`,
        [ratingResult.rows[0].id]
      );

      res.status(201).json({
        message: 'Skill rating added successfully',
        rating: newRating.rows[0]
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Add skill rating error:', error);
    res.status(500).json({
      error: {
        code: 'ADD_RATING_FAILED',
        message: 'Failed to add skill rating'
      }
    });
  }
});

// Delete a skill rating
router.delete('/rating/:ratingId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'coach' && req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Only coaches and admins can delete skill ratings'
        }
      });
    }

    const { ratingId } = req.params;

    const result = await db.query(
      'DELETE FROM skill_ratings WHERE id = $1 RETURNING skill_id',
      [ratingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'RATING_NOT_FOUND',
          message: 'Skill rating not found'
        }
      });
    }

    // Update skill updated_at timestamp
    await db.query(
      'UPDATE skills SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [result.rows[0].skill_id]
    );

    res.json({ message: 'Skill rating deleted successfully' });

  } catch (error) {
    console.error('Delete skill rating error:', error);
    res.status(500).json({
      error: {
        code: 'DELETE_RATING_FAILED',
        message: 'Failed to delete skill rating'
      }
    });
  }
});

// Delete entire skill (removes all ratings for that skill)
router.delete('/skill/:skillId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Only admins can delete entire skills'
        }
      });
    }

    const { skillId } = req.params;

    const result = await db.query(
      'DELETE FROM skills WHERE id = $1 RETURNING skill_name',
      [skillId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: 'SKILL_NOT_FOUND',
          message: 'Skill not found'
        }
      });
    }

    res.json({ 
      message: `Skill "${result.rows[0].skill_name}" and all its ratings deleted successfully` 
    });

  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      error: {
        code: 'DELETE_SKILL_FAILED',
        message: 'Failed to delete skill'
      }
    });
  }
});

module.exports = router;