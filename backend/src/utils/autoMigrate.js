const fs = require('fs');
const path = require('path');
const db = require('../config/database');

// Auto-run user-related migrations
async function runUserMigrations() {
  try {
    // Check if is_active column exists in users table
    const checkColumnQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
        AND column_name = 'is_active'
      );
    `;
    
    const result = await db.query(checkColumnQuery);
    const columnExists = result.rows[0].exists;
    
    if (!columnExists) {
      console.log('👤 Adding is_active column to users table...');
      
      const migrationPath = path.join(__dirname, '../database/migrations/006_add_is_active_to_users.sql');
      
      if (fs.existsSync(migrationPath)) {
        const sql = fs.readFileSync(migrationPath, 'utf8');
        await db.query(sql);
        console.log('✅ is_active column added to users table');
      } else {
        console.log('⚠️ User migration file not found, creating column manually...');
        
        // Fallback: create column manually
        const createColumnSQL = `
          ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;
          UPDATE users SET is_active = true WHERE is_active IS NULL;
          CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
        `;
        
        await db.query(createColumnSQL);
        console.log('✅ is_active column created via fallback method');
      }
    } else {
      console.log('✅ users.is_active column already exists');
    }
    
  } catch (error) {
    console.error('❌ User migration failed:', error);
    console.log('⚠️ User management features may not work properly.');
  }
}

// Auto-run critical migrations needed for the application
async function runCriticalMigrations() {
  try {
    console.log('🔄 Checking for required database tables...');
    
    // First, ensure is_active column exists for user management
    await runUserMigrations();
    
    // Check if league_events table exists
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'league_events'
      );
    `;
    
    const result = await db.query(checkTableQuery);
    const tableExists = result.rows[0].exists;
    
    if (!tableExists) {
      console.log('📊 Creating league events tables...');
      
      const migrationPath = path.join(__dirname, '../database/migrations/005_create_league_events.sql');
      
      if (fs.existsSync(migrationPath)) {
        const sql = fs.readFileSync(migrationPath, 'utf8');
        await db.query(sql);
        console.log('✅ League events tables created successfully');
      } else {
        console.log('⚠️ League events migration file not found, creating tables manually...');
        
        // Fallback: create tables manually
        const createTablesSQL = `
          -- League Events (tournament instances)
          CREATE TABLE IF NOT EXISTS league_events (
              id SERIAL PRIMARY KEY,
              league_instance_id INTEGER REFERENCES league_instances(id) ON DELETE CASCADE,
              event_date DATE NOT NULL,
              event_name VARCHAR(255),
              status VARCHAR(50) DEFAULT 'active',
              grouping_method VARCHAR(20) DEFAULT 'middle',
              total_groups INTEGER DEFAULT 1,
              matches_data JSONB,
              elimination_matches JSONB,
              elimination_results JSONB,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(league_instance_id, event_date)
          );

          -- League Groups 
          CREATE TABLE IF NOT EXISTS league_event_groups (
              id SERIAL PRIMARY KEY,
              league_event_id INTEGER REFERENCES league_events(id) ON DELETE CASCADE,
              group_number INTEGER NOT NULL,
              group_name VARCHAR(100) NOT NULL,
              group_type VARCHAR(20) DEFAULT 'round_robin',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

          -- Group Members
          CREATE TABLE IF NOT EXISTS league_group_members (
              id SERIAL PRIMARY KEY,
              group_id INTEGER REFERENCES league_event_groups(id) ON DELETE CASCADE,
              player_id INTEGER REFERENCES public_league_registrations(id) ON DELETE CASCADE,
              seeding_order INTEGER,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(group_id, player_id)
          );

          -- League Matches
          CREATE TABLE IF NOT EXISTS league_matches (
              id SERIAL PRIMARY KEY,
              group_id INTEGER REFERENCES league_event_groups(id) ON DELETE CASCADE,
              player1_id INTEGER REFERENCES public_league_registrations(id) ON DELETE CASCADE,
              player2_id INTEGER REFERENCES public_league_registrations(id) ON DELETE CASCADE,
              player1_score INTEGER DEFAULT 0,
              player2_score INTEGER DEFAULT 0,
              match_type VARCHAR(20) DEFAULT 'group',
              match_order INTEGER DEFAULT 0,
              is_completed BOOLEAN DEFAULT FALSE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

          -- League Standings
          CREATE TABLE IF NOT EXISTS league_standings (
              id SERIAL PRIMARY KEY,
              group_id INTEGER REFERENCES league_event_groups(id) ON DELETE CASCADE,
              player_id INTEGER REFERENCES public_league_registrations(id) ON DELETE CASCADE,
              position INTEGER NOT NULL,
              wins INTEGER DEFAULT 0,
              losses INTEGER DEFAULT 0,
              games_won INTEGER DEFAULT 0,
              games_lost INTEGER DEFAULT 0,
              points INTEGER DEFAULT 0,
              advances_to_elimination BOOLEAN DEFAULT FALSE,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(group_id, player_id)
          );

          -- Create indexes
          CREATE INDEX IF NOT EXISTS idx_league_events_instance ON league_events(league_instance_id);
          CREATE INDEX IF NOT EXISTS idx_league_event_groups_event ON league_event_groups(league_event_id);
          CREATE INDEX IF NOT EXISTS idx_league_group_members_group ON league_group_members(group_id);
          CREATE INDEX IF NOT EXISTS idx_league_group_members_player ON league_group_members(player_id);
          CREATE INDEX IF NOT EXISTS idx_league_matches_group ON league_matches(group_id);
          CREATE INDEX IF NOT EXISTS idx_league_matches_players ON league_matches(player1_id, player2_id);
          CREATE INDEX IF NOT EXISTS idx_league_standings_group ON league_standings(group_id);
          CREATE INDEX IF NOT EXISTS idx_league_standings_player ON league_standings(player_id);
        `;
        
        await db.query(createTablesSQL);
        console.log('✅ League events tables created via fallback method');
      }
    } else {
      console.log('✅ League events tables already exist');
    }
    
  } catch (error) {
    console.error('❌ Auto-migration failed:', error);
    console.log('⚠️ Some features may not work properly. Please run migrations manually.');
  }
}

module.exports = { runCriticalMigrations, runLeagueEventMigrations: runCriticalMigrations };