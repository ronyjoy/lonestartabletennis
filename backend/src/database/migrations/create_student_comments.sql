-- Create student_comments table for general coach feedback
CREATE TABLE IF NOT EXISTS student_comments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    coach_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure one comment per coach per student
    UNIQUE(student_id, coach_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_student_comments_student_id ON student_comments(student_id);
CREATE INDEX IF NOT EXISTS idx_student_comments_coach_id ON student_comments(coach_id);

-- Add comments to describe the table
COMMENT ON TABLE student_comments IS 'General comments from coaches about students overall progress';
COMMENT ON COLUMN student_comments.student_id IS 'References the student being commented on';
COMMENT ON COLUMN student_comments.coach_id IS 'References the coach making the comment';
COMMENT ON COLUMN student_comments.comment IS 'General feedback about student progress, attitude, etc';