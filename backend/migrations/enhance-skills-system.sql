-- Enhanced Skills System with Coach-specific Rating History
-- Run this migration to upgrade the skills tracking system

-- Create new skills table (replaces the old skill_assessments)
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create skill ratings history table
CREATE TABLE IF NOT EXISTS skill_ratings (
    id SERIAL PRIMARY KEY,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    coach_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_skill_name ON skills(skill_name);
CREATE INDEX IF NOT EXISTS idx_skill_ratings_skill_id ON skill_ratings(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_ratings_coach_id ON skill_ratings(coach_id);
CREATE INDEX IF NOT EXISTS idx_skill_ratings_created_at ON skill_ratings(created_at);

-- Migrate existing data from skill_assessments to new structure (if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'skill_assessments') THEN
        -- Migrate existing skill assessments to new structure
        INSERT INTO skills (user_id, skill_name, created_at, updated_at)
        SELECT DISTINCT 
            sa.student_id as user_id,
            sc.name as skill_name,
            sa.created_at,
            sa.created_at as updated_at
        FROM skill_assessments sa
        JOIN skill_categories sc ON sa.skill_category_id = sc.id
        ON CONFLICT DO NOTHING;
        
        -- Migrate ratings
        INSERT INTO skill_ratings (skill_id, coach_id, rating, notes, created_at)
        SELECT 
            s.id as skill_id,
            sa.coach_id,
            sa.score as rating,
            sa.notes,
            sa.assessment_date as created_at
        FROM skill_assessments sa
        JOIN skill_categories sc ON sa.skill_category_id = sc.id
        JOIN skills s ON s.user_id = sa.student_id AND s.skill_name = sc.name
        WHERE sa.coach_id IS NOT NULL;
        
        RAISE NOTICE 'Migrated existing skill assessments to new structure';
    END IF;
END $$;

-- Create a view for easy querying of current skill ratings
CREATE OR REPLACE VIEW current_skill_ratings AS
SELECT 
    s.id as skill_id,
    s.user_id,
    s.skill_name,
    s.created_at as skill_created_at,
    sr.id as rating_id,
    sr.coach_id,
    sr.rating,
    sr.notes,
    sr.created_at as rating_created_at,
    u_student.first_name as student_first_name,
    u_student.last_name as student_last_name,
    u_coach.first_name as coach_first_name,
    u_coach.last_name as coach_last_name,
    -- Get the latest rating for each skill-coach combination
    ROW_NUMBER() OVER (PARTITION BY s.id, sr.coach_id ORDER BY sr.created_at DESC) as rating_rank
FROM skills s
LEFT JOIN skill_ratings sr ON s.id = sr.skill_id
LEFT JOIN users u_student ON s.user_id = u_student.id
LEFT JOIN users u_coach ON sr.coach_id = u_coach.id
WHERE u_student.role = 'student';

-- Create a view for skill history with progress tracking
CREATE OR REPLACE VIEW skill_rating_history AS
SELECT 
    s.id as skill_id,
    s.user_id,
    s.skill_name,
    sr.id as rating_id,
    sr.coach_id,
    sr.rating,
    sr.notes,
    sr.created_at,
    u_student.first_name as student_first_name,
    u_student.last_name as student_last_name,
    u_coach.first_name as coach_first_name,
    u_coach.last_name as coach_last_name,
    -- Calculate progress indicators
    LAG(sr.rating) OVER (PARTITION BY s.id, sr.coach_id ORDER BY sr.created_at) as previous_rating,
    sr.rating - LAG(sr.rating) OVER (PARTITION BY s.id, sr.coach_id ORDER BY sr.created_at) as rating_change
FROM skills s
JOIN skill_ratings sr ON s.id = sr.skill_id
JOIN users u_student ON s.user_id = u_student.id
JOIN users u_coach ON sr.coach_id = u_coach.id
WHERE u_student.role = 'student'
ORDER BY s.user_id, s.skill_name, sr.coach_id, sr.created_at DESC;