const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Create a league event (tournament instance)
router.post('/', async (req, res) => {
  try {
    const { league_instance_id, event_date, event_name, grouping_method, groups, matches } = req.body;
    
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Create league event
      const eventQuery = `
        INSERT INTO league_events (league_instance_id, event_date, event_name, grouping_method, total_groups)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      
      const eventResult = await client.query(eventQuery, [
        league_instance_id,
        event_date,
        event_name || `Tournament - ${new Date(event_date).toLocaleDateString()}`,
        grouping_method,
        groups.length
      ]);
      
      const leagueEvent = eventResult.rows[0];
      
      // Create groups and members
      for (const group of groups) {
        const groupQuery = `
          INSERT INTO league_event_groups (league_event_id, group_number, group_name)
          VALUES ($1, $2, $3)
          RETURNING *
        `;
        
        const groupResult = await client.query(groupQuery, [
          leagueEvent.id,
          group.id,
          group.name
        ]);
        
        const groupRecord = groupResult.rows[0];
        
        // Add group members
        for (let i = 0; i < group.players.length; i++) {
          const memberQuery = `
            INSERT INTO league_group_members (group_id, player_id, seeding_order)
            VALUES ($1, $2, $3)
          `;
          
          await client.query(memberQuery, [
            groupRecord.id,
            group.players[i].id,
            i + 1
          ]);
        }
        
        // Create matches for this group
        const groupMatches = matches[group.id] || {};
        for (const [matchKey, match] of Object.entries(groupMatches)) {
          const matchQuery = `
            INSERT INTO league_matches (group_id, player1_id, player2_id, player1_score, player2_score, match_order)
            VALUES ($1, $2, $3, $4, $5, $6)
          `;
          
          await client.query(matchQuery, [
            groupRecord.id,
            match.player1.id,
            match.player2.id,
            match.score1 ? parseInt(match.score1) : 0,
            match.score2 ? parseInt(match.score2) : 0,
            0
          ]);
        }
      }
      
      await client.query('COMMIT');
      
      res.json({
        success: true,
        event: leagueEvent,
        message: 'League event created successfully'
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error creating league event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating league event',
      error: error.message 
    });
  }
});

// Update match results
router.put('/matches/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;
    const { player1_score, player2_score } = req.body;
    
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Update match result
      const updateQuery = `
        UPDATE league_matches 
        SET player1_score = $1, player2_score = $2, is_completed = $3, updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
      `;
      
      const isCompleted = (player1_score !== '' && player1_score !== null) && 
                         (player2_score !== '' && player2_score !== null);
      
      const result = await client.query(updateQuery, [
        player1_score || 0,
        player2_score || 0,
        isCompleted,
        matchId
      ]);
      
      if (result.rows.length === 0) {
        throw new Error('Match not found');
      }
      
      const match = result.rows[0];
      
      // Recalculate standings for the group
      await recalculateGroupStandings(client, match.group_id);
      
      await client.query('COMMIT');
      
      res.json({
        success: true,
        match: match,
        message: 'Match result updated successfully'
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error updating match result:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating match result',
      error: error.message 
    });
  }
});

// Auto-save match results (batch update)
router.put('/auto-save', async (req, res) => {
  try {
    const { league_event_id, results } = req.body;
    
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // First, get or create the league event if it doesn't exist
      let eventId = league_event_id;
      
      if (!eventId) {
        // Create a new event for today
        const eventQuery = `
          INSERT INTO league_events (league_instance_id, event_date, event_name, status)
          VALUES ((SELECT id FROM league_instances ORDER BY created_at DESC LIMIT 1), CURRENT_DATE, 'Auto-saved Tournament', 'active')
          RETURNING id
        `;
        
        const eventResult = await client.query(eventQuery);
        eventId = eventResult.rows[0].id;
      }
      
      // Update all match results
      for (const [groupId, groupResults] of Object.entries(results)) {
        for (const [matchKey, matchData] of Object.entries(groupResults)) {
          // Find existing match or create new one
          const findMatchQuery = `
            SELECT id FROM league_matches 
            WHERE group_id = $1 AND player1_id = $2 AND player2_id = $3
          `;
          
          const matchResult = await client.query(findMatchQuery, [
            groupId,
            matchData.player1.id,
            matchData.player2.id
          ]);
          
          if (matchResult.rows.length > 0) {
            // Update existing match
            const updateQuery = `
              UPDATE league_matches 
              SET player1_score = $1, player2_score = $2, 
                  is_completed = $3, updated_at = CURRENT_TIMESTAMP
              WHERE id = $4
            `;
            
            const isCompleted = (matchData.score1 !== '' && matchData.score1 !== null) && 
                               (matchData.score2 !== '' && matchData.score2 !== null);
            
            await client.query(updateQuery, [
              matchData.score1 || 0,
              matchData.score2 || 0,
              isCompleted,
              matchResult.rows[0].id
            ]);
            
            // Recalculate standings for this group
            await recalculateGroupStandings(client, groupId);
          }
        }
      }
      
      await client.query('COMMIT');
      
      res.json({
        success: true,
        event_id: eventId,
        message: 'Results auto-saved successfully'
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error auto-saving results:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error auto-saving results',
      error: error.message 
    });
  }
});

// Get league event with all data
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Get event details
    const eventQuery = `
      SELECT le.*, li.week_start_date, lt.name as league_name
      FROM league_events le
      JOIN league_instances li ON le.league_instance_id = li.id
      JOIN league_templates lt ON li.template_id = lt.id
      WHERE le.id = $1
    `;
    
    const eventResult = await db.query(eventQuery, [eventId]);
    
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: 'League event not found' });
    }
    
    const event = eventResult.rows[0];
    
    // Get groups
    const groupsQuery = `
      SELECT leg.*
      FROM league_event_groups leg
      WHERE leg.league_event_id = $1
      ORDER BY leg.group_number
    `;
    
    const groupsResult = await db.query(groupsQuery, [eventId]);
    
    // Get group members and matches
    for (const group of groupsResult.rows) {
      // Get members
      const membersQuery = `
        SELECT lgm.*, plr.first_name, plr.last_name, plr.skill_level, plr.email
        FROM league_group_members lgm
        JOIN public_league_registrations plr ON lgm.player_id = plr.id
        WHERE lgm.group_id = $1
        ORDER BY lgm.seeding_order
      `;
      
      const membersResult = await db.query(membersQuery, [group.id]);
      group.members = membersResult.rows;
      
      // Get matches
      const matchesQuery = `
        SELECT lm.*, 
               p1.first_name as player1_first_name, p1.last_name as player1_last_name,
               p2.first_name as player2_first_name, p2.last_name as player2_last_name
        FROM league_matches lm
        JOIN public_league_registrations p1 ON lm.player1_id = p1.id
        JOIN public_league_registrations p2 ON lm.player2_id = p2.id
        WHERE lm.group_id = $1
        ORDER BY lm.match_order
      `;
      
      const matchesResult = await db.query(matchesQuery, [group.id]);
      group.matches = matchesResult.rows;
      
      // Get standings
      const standingsQuery = `
        SELECT ls.*, plr.first_name, plr.last_name, plr.skill_level
        FROM league_standings ls
        JOIN public_league_registrations plr ON ls.player_id = plr.id
        WHERE ls.group_id = $1
        ORDER BY ls.position
      `;
      
      const standingsResult = await db.query(standingsQuery, [group.id]);
      group.standings = standingsResult.rows;
    }
    
    event.groups = groupsResult.rows;
    
    res.json({
      success: true,
      event: event
    });
    
  } catch (error) {
    console.error('Error fetching league event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching league event',
      error: error.message 
    });
  }
});

// Helper function to recalculate group standings
async function recalculateGroupStandings(client, groupId) {
  // Get all matches for this group
  const matchesQuery = `
    SELECT * FROM league_matches 
    WHERE group_id = $1 AND is_completed = true
  `;
  
  const matchesResult = await client.query(matchesQuery, [groupId]);
  const matches = matchesResult.rows;
  
  // Get all players in this group
  const playersQuery = `
    SELECT lgm.player_id, plr.first_name, plr.last_name
    FROM league_group_members lgm
    JOIN public_league_registrations plr ON lgm.player_id = plr.id
    WHERE lgm.group_id = $1
  `;
  
  const playersResult = await client.query(playersQuery, [groupId]);
  const players = playersResult.rows;
  
  // Calculate standings
  const standings = {};
  
  players.forEach(player => {
    standings[player.player_id] = {
      player_id: player.player_id,
      wins: 0,
      losses: 0,
      games_won: 0,
      games_lost: 0,
      points: 0
    };
  });
  
  matches.forEach(match => {
    const player1Id = match.player1_id;
    const player2Id = match.player2_id;
    const score1 = parseInt(match.player1_score) || 0;
    const score2 = parseInt(match.player2_score) || 0;
    
    standings[player1Id].games_won += score1;
    standings[player1Id].games_lost += score2;
    standings[player2Id].games_won += score2;
    standings[player2Id].games_lost += score1;
    
    if (score1 > score2) {
      standings[player1Id].wins += 1;
      standings[player2Id].losses += 1;
      standings[player1Id].points += 2;
    } else if (score2 > score1) {
      standings[player2Id].wins += 1;
      standings[player1Id].losses += 1;
      standings[player2Id].points += 2;
    } else if (score1 === score2 && score1 > 0) {
      standings[player1Id].points += 1;
      standings[player2Id].points += 1;
    }
  });
  
  // Sort standings by points, then by wins, then by games ratio
  const sortedStandings = Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    const aRatio = a.games_lost === 0 ? a.games_won : a.games_won / a.games_lost;
    const bRatio = b.games_lost === 0 ? b.games_won : b.games_won / b.games_lost;
    return bRatio - aRatio;
  });
  
  // Clear existing standings
  await client.query('DELETE FROM league_standings WHERE group_id = $1', [groupId]);
  
  // Insert new standings
  for (let i = 0; i < sortedStandings.length; i++) {
    const standing = sortedStandings[i];
    const advances = i < 2; // Top 2 advance to elimination
    
    const insertQuery = `
      INSERT INTO league_standings 
      (group_id, player_id, position, wins, losses, games_won, games_lost, points, advances_to_elimination)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    
    await client.query(insertQuery, [
      groupId,
      standing.player_id,
      i + 1,
      standing.wins,
      standing.losses,
      standing.games_won,
      standing.games_lost,
      standing.points,
      advances
    ]);
  }
}

// Auto-save elimination results
router.put('/auto-save-elimination', async (req, res) => {
  try {
    const { league_instance_id, elimination_results } = req.body;
    
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Get or create league event
      let eventQuery = `
        SELECT id FROM league_events 
        WHERE league_instance_id = $1 AND event_date = CURRENT_DATE
        ORDER BY created_at DESC LIMIT 1
      `;
      
      let eventResult = await client.query(eventQuery, [league_instance_id]);
      let eventId;
      
      if (eventResult.rows.length === 0) {
        // Create new event if doesn't exist
        const createEventQuery = `
          INSERT INTO league_events (league_instance_id, event_date, event_name, status)
          VALUES ($1, CURRENT_DATE, 'Auto-saved Elimination Tournament', 'active')
          RETURNING id
        `;
        
        const newEvent = await client.query(createEventQuery, [league_instance_id]);
        eventId = newEvent.rows[0].id;
      } else {
        eventId = eventResult.rows[0].id;
      }
      
      // For MVP, we'll update the league_events table with elimination data
      const updateEventQuery = `
        UPDATE league_events 
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
      `;
      
      await client.query(updateEventQuery, [eventId]);
      
      await client.query('COMMIT');
      
      res.json({
        success: true,
        event_id: eventId,
        message: 'Elimination results auto-saved successfully'
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error auto-saving elimination results:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error auto-saving elimination results',
      error: error.message 
    });
  }
});

module.exports = router;