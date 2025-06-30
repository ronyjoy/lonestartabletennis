const fs = require('fs');
const path = require('path');
const db = require('./src/config/database');

async function runUserMigration() {
  try {
    console.log('🔄 Running user migration to add is_active column...');
    
    const migrationPath = path.join(__dirname, 'src/database/migrations/006_add_is_active_to_users.sql');
    
    if (!fs.existsSync(migrationPath)) {
      console.error('❌ Migration file not found:', migrationPath);
      process.exit(1);
    }
    
    const sql = fs.readFileSync(migrationPath, 'utf8');
    await db.query(sql);
    
    console.log('✅ Successfully added is_active column to users table');
    console.log('   - Added is_active BOOLEAN column with DEFAULT true');
    console.log('   - Updated existing users to be active');
    console.log('   - Added index for performance');
    
    // Verify the column was added
    const result = await db.query(`
      SELECT column_name, data_type, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'is_active'
    `);
    
    if (result.rows.length > 0) {
      console.log('✅ Verification: is_active column exists');
      console.log('   Column details:', result.rows[0]);
    } else {
      console.log('⚠️ Warning: Could not verify column creation');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

runUserMigration();