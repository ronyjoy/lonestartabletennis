const fs = require('fs');
const path = require('path');
const db = require('../config/database');

async function runMigration() {
  try {
    console.log('Running database migrations...');
    
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = [
      'create_student_comments.sql',
      '005_create_league_events.sql',
      '006_add_is_active_to_users.sql'
    ];
    
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const migrationPath = path.join(migrationsDir, file);
      
      if (fs.existsSync(migrationPath)) {
        const sql = fs.readFileSync(migrationPath, 'utf8');
        await db.query(sql);
        console.log(`✅ Successfully ran ${file}`);
      } else {
        console.log(`⚠️ Migration file not found: ${file}`);
      }
    }
    
    console.log('All migrations completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();