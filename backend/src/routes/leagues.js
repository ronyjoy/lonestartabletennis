const express = require('express');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Get all league templates (Admin only)
router.get('/', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const query = `
      SELECT 
        lt.*,
        COUNT(DISTINCT li.id) as total_instances,
        COUNT(DISTINCT plr.id) as total_registrations
      FROM league_templates lt
      LEFT JOIN league_instances li ON lt.id = li.template_id
      LEFT JOIN public_league_registrations plr ON li.id = plr.league_instance_id
      GROUP BY lt.id
      ORDER BY lt.day_of_week, lt.start_time
    `;
    
    const result = await db.query(query);
    res.json({ leagues: result.rows });
  } catch (error) {
    console.error('Error fetching league templates:', error);
    res.status(500).json({ message: 'Error fetching league templates' });
  }
});

// Create new league template (Admin only)
router.post('/', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Debug: Log received data
    console.log('Received league data:', req.body);

    const { 
      name, 
      description, 
      day_of_week, 
      start_time, 
      end_time, 
      max_participants, 
      skill_level_min, 
      skill_level_max, 
      entry_fee 
    } = req.body;

    // Validate required fields
    if (!name || day_of_week === undefined || day_of_week === null || !start_time || !end_time) {
      return res.status(400).json({ message: 'Name, day of week, start time, and end time are required' });
    }

    // Validate day_of_week (0-6, Sunday-Saturday)
    const dayOfWeekNum = parseInt(day_of_week);
    if (isNaN(dayOfWeekNum) || dayOfWeekNum < 0 || dayOfWeekNum > 6) {
      return res.status(400).json({ message: 'Day of week must be between 0 (Sunday) and 6 (Saturday)' });
    }

    const query = `
      INSERT INTO league_templates 
      (name, description, day_of_week, start_time, end_time, max_participants, skill_level_min, skill_level_max, entry_fee, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
      RETURNING *
    `;

    const result = await db.query(query, [
      name,
      description || '',
      dayOfWeekNum,
      start_time,
      end_time,
      parseInt(max_participants) || 16,
      parseInt(skill_level_min) || 1,
      parseInt(skill_level_max) || 10,
      parseFloat(entry_fee) || 0
    ]);

    res.status(201).json({ 
      message: 'League template created successfully',
      league: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating league template:', error);
    res.status(500).json({ message: 'Error creating league template' });
  }
});

// Update league template (Admin only)
router.put('/:id', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const { 
      name, 
      description, 
      day_of_week, 
      start_time, 
      end_time, 
      max_participants, 
      skill_level_min, 
      skill_level_max, 
      entry_fee,
      is_active 
    } = req.body;

    const query = `
      UPDATE league_templates 
      SET 
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        day_of_week = COALESCE($3, day_of_week),
        start_time = COALESCE($4, start_time),
        end_time = COALESCE($5, end_time),
        max_participants = COALESCE($6, max_participants),
        skill_level_min = COALESCE($7, skill_level_min),
        skill_level_max = COALESCE($8, skill_level_max),
        entry_fee = COALESCE($9, entry_fee),
        is_active = COALESCE($10, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `;

    const result = await db.query(query, [
      name,
      description,
      day_of_week ? parseInt(day_of_week) : null,
      start_time,
      end_time,
      max_participants ? parseInt(max_participants) : null,
      skill_level_min ? parseInt(skill_level_min) : null,
      skill_level_max ? parseInt(skill_level_max) : null,
      entry_fee ? parseFloat(entry_fee) : null,
      is_active,
      parseInt(id)
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'League template not found' });
    }

    res.json({ 
      message: 'League template updated successfully',
      league: result.rows[0] 
    });
  } catch (error) {
    console.error('Error updating league template:', error);
    res.status(500).json({ message: 'Error updating league template' });
  }
});

// Delete league template (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;

    // Check if there are existing registrations
    const registrationCheck = `
      SELECT COUNT(*) as count 
      FROM public_league_registrations plr
      JOIN league_instances li ON plr.league_instance_id = li.id
      WHERE li.template_id = $1
    `;
    
    const regResult = await db.query(registrationCheck, [parseInt(id)]);
    
    if (parseInt(regResult.rows[0].count) > 0) {
      // Don't delete, just deactivate if there are registrations
      const deactivateQuery = `
        UPDATE league_templates 
        SET is_active = false, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `;
      
      const result = await db.query(deactivateQuery, [parseInt(id)]);
      
      return res.json({ 
        message: 'League template deactivated (has existing registrations)',
        league: result.rows[0] 
      });
    }

    // Safe to delete if no registrations
    const deleteQuery = `DELETE FROM league_templates WHERE id = $1 RETURNING *`;
    const result = await db.query(deleteQuery, [parseInt(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'League template not found' });
    }

    res.json({ 
      message: 'League template deleted successfully',
      league: result.rows[0] 
    });
  } catch (error) {
    console.error('Error deleting league template:', error);
    res.status(500).json({ message: 'Error deleting league template' });
  }
});

// Get league registrations for a specific template (Admin only)
router.get('/:id/registrations', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    
    const query = `
      SELECT 
        plr.*,
        li.week_start_date,
        li.status as instance_status,
        lt.name as league_name
      FROM public_league_registrations plr
      JOIN league_instances li ON plr.league_instance_id = li.id
      JOIN league_templates lt ON li.template_id = lt.id
      WHERE lt.id = $1
      ORDER BY li.week_start_date DESC, plr.registration_date ASC
    `;
    
    const result = await db.query(query, [parseInt(id)]);
    res.json({ registrations: result.rows });
  } catch (error) {
    console.error('Error fetching league registrations:', error);
    res.status(500).json({ message: 'Error fetching league registrations' });
  }
});

module.exports = router;