const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get all active leagues for this week (future only)
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        lt.id,
        lt.name,
        lt.description,
        lt.day_of_week,
        lt.start_time,
        lt.end_time,
        lt.max_participants,
        lt.skill_level_min,
        lt.skill_level_max,
        lt.entry_fee,
        COALESCE(li.actual_participants, 0) as actual_participants,
        li.id as instance_id,
        li.status,
        -- Calculate days until league (only future leagues)
        lt.day_of_week - EXTRACT(DOW FROM CURRENT_DATE) as days_until,
        -- Calculate actual date for this week
        DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 day' * lt.day_of_week as league_date
      FROM league_templates lt
      LEFT JOIN league_instances li ON lt.id = li.template_id 
        AND li.week_start_date = DATE_TRUNC('week', CURRENT_DATE)
      WHERE lt.is_active = true
        -- Only show leagues that haven't happened yet this week (today or future)
        AND lt.day_of_week >= EXTRACT(DOW FROM CURRENT_DATE)
      ORDER BY lt.day_of_week, lt.start_time
    `;
    
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ message: 'Error fetching leagues' });
  }
});

// Register for a league
router.post('/:leagueId/register', async (req, res) => {
  try {
    const { leagueId } = req.params;
    const { firstName, lastName, email, phone, skillLevel, emergencyContact } = req.body;

    // Start transaction
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');

      // Get current week's instance or create it
      let instanceQuery = `
        SELECT li.*, lt.max_participants, lt.skill_level_min, lt.skill_level_max
        FROM league_instances li
        JOIN league_templates lt ON li.template_id = lt.id
        WHERE lt.id = $1 AND li.week_start_date = DATE_TRUNC('week', CURRENT_DATE)
      `;
      
      let instanceResult = await client.query(instanceQuery, [leagueId]);
      
      if (instanceResult.rows.length === 0) {
        // Create new instance for this week
        const createInstanceQuery = `
          INSERT INTO league_instances (template_id, week_start_date, registration_deadline)
          VALUES ($1, DATE_TRUNC('week', CURRENT_DATE), CURRENT_DATE + INTERVAL '7 days')
          RETURNING *
        `;
        
        const newInstance = await client.query(createInstanceQuery, [leagueId]);
        
        // Get the complete instance data
        instanceResult = await client.query(instanceQuery, [leagueId]);
      }
      
      const instance = instanceResult.rows[0];
      
      // Check skill level requirement
      if (skillLevel < instance.skill_level_min || skillLevel > instance.skill_level_max) {
        throw new Error(`Skill level must be between ${instance.skill_level_min} and ${instance.skill_level_max}`);
      }
      
      // Check if league is full
      if (instance.actual_participants >= instance.max_participants) {
        throw new Error('League is full');
      }
      
      // Check if email already registered for this week's instance
      const existingQuery = `
        SELECT id FROM public_league_registrations 
        WHERE league_instance_id = $1 AND email = $2
      `;
      
      const existing = await client.query(existingQuery, [instance.id, email]);
      
      if (existing.rows.length > 0) {
        throw new Error('Email already registered for this league');
      }
      
      // Register the user
      const registerQuery = `
        INSERT INTO public_league_registrations 
        (league_instance_id, first_name, last_name, email, phone, skill_level, emergency_contact)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      
      await client.query(registerQuery, [
        instance.id,
        firstName,
        lastName,
        email,
        phone,
        skillLevel,
        emergencyContact
      ]);
      
      // Update participant count
      const updateCountQuery = `
        UPDATE league_instances 
        SET actual_participants = (
          SELECT COUNT(*) FROM public_league_registrations 
          WHERE league_instance_id = $1
        )
        WHERE id = $1
      `;
      
      await client.query(updateCountQuery, [instance.id]);
      
      await client.query('COMMIT');
      
      res.json({ 
        message: 'Registration successful!',
        registrationId: registerQuery.rows?.[0]?.id 
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get registrations for admin (protected route - add auth middleware)
router.get('/:leagueId/registrations', async (req, res) => {
  try {
    const { leagueId } = req.params;
    
    const query = `
      SELECT 
        plr.*,
        lt.name as league_name,
        li.week_start_date
      FROM public_league_registrations plr
      JOIN league_instances li ON plr.league_instance_id = li.id
      JOIN league_templates lt ON li.template_id = lt.id
      WHERE lt.id = $1 AND li.week_start_date >= CURRENT_DATE - INTERVAL '4 weeks'
      ORDER BY li.week_start_date DESC, plr.registration_date ASC
    `;
    
    const result = await db.query(query, [leagueId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});

module.exports = router;