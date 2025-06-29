const fs = require('fs');
const path = require('path');
const db = require('../config/database');

async function runMigration() {
  try {
    console.log('Running student_comments table migration...');
    
    const migrationPath = path.join(__dirname, 'migrations', 'create_student_comments.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    await db.query(sql);
    
    console.log('✅ Successfully created student_comments table');
    console.log('Migration completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();