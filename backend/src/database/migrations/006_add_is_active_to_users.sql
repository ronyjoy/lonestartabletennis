-- Migration: Add is_active column to users table
-- This allows for soft deletion of users (archiving) instead of hard deletion
-- Particularly important for coaches to preserve their ratings and comments

-- Add is_active column if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update any existing users to be active by default
UPDATE users SET is_active = true WHERE is_active IS NULL;

-- Add index for performance when filtering by active users
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

-- Add comment to document the column purpose
COMMENT ON COLUMN users.is_active IS 'Soft delete flag - false means user is archived but data preserved';