-- Table Tennis Academy Database Schema

-- Users table (students, coaches, admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('student', 'coach', 'admin')) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    emergency_contact VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student profiles with additional info
CREATE TABLE student_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    playing_level VARCHAR(50),
    dominant_hand VARCHAR(10) CHECK (dominant_hand IN ('left', 'right')),
    blade_type VARCHAR(100),
    rubber_forehand VARCHAR(100),
    rubber_backhand VARCHAR(100),
    goals TEXT,
    medical_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skill categories for tracking
CREATE TABLE skill_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    max_score INTEGER DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student skill assessments
CREATE TABLE skill_assessments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_category_id INTEGER REFERENCES skill_categories(id) ON DELETE CASCADE,
    coach_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    score INTEGER NOT NULL,
    notes TEXT,
    assessment_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coach comments for students
CREATE TABLE coach_comments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    coach_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_category_id INTEGER REFERENCES skill_categories(id) ON DELETE SET NULL,
    comment TEXT NOT NULL,
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leagues
CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_deadline DATE,
    max_participants INTEGER,
    skill_level_min INTEGER DEFAULT 1,
    skill_level_max INTEGER DEFAULT 10,
    entry_fee DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('draft', 'open', 'closed', 'completed')) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- League registrations
CREATE TABLE league_registrations (
    id SERIAL PRIMARY KEY,
    league_id INTEGER REFERENCES leagues(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
    UNIQUE(league_id, student_id)
);

-- Groups within leagues
CREATE TABLE league_groups (
    id SERIAL PRIMARY KEY,
    league_id INTEGER REFERENCES leagues(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group memberships
CREATE TABLE group_memberships (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES league_groups(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(group_id, student_id)
);

-- Matches
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    league_id INTEGER REFERENCES leagues(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES league_groups(id) ON DELETE SET NULL,
    player1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    player2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    scheduled_date TIMESTAMP,
    completed_date TIMESTAMP,
    player1_score INTEGER,
    player2_score INTEGER,
    winner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    match_format VARCHAR(20) DEFAULT 'best_of_5', -- best_of_3, best_of_5, best_of_7
    status VARCHAR(20) CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Match games (individual games within a match)
CREATE TABLE match_games (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
    game_number INTEGER NOT NULL,
    player1_score INTEGER NOT NULL,
    player2_score INTEGER NOT NULL,
    winner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default skill categories
INSERT INTO skill_categories (name, description, max_score) VALUES
('Serve', 'Quality and variety of serves', 10),
('Receive', 'Return of serve quality', 10),
('Block', 'Defensive blocking technique', 10),
('Loop', 'Topspin attack shots', 10),
('Push', 'Backspin control shots', 10),
('Footwork', 'Movement and positioning', 10),
('Attitude', 'Mental approach and sportsmanship', 10),
('Physical Strength', 'Physical conditioning and endurance', 10),
('Mental Strength', 'Focus and pressure handling', 10),
('Game Play', 'Overall tactical understanding', 10),
('Tournament Experience', 'Competitive match experience', 10);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_skill_assessments_student ON skill_assessments(student_id);
CREATE INDEX idx_skill_assessments_date ON skill_assessments(assessment_date);
CREATE INDEX idx_coach_comments_student ON coach_comments(student_id);
CREATE INDEX idx_league_registrations_league ON league_registrations(league_id);
CREATE INDEX idx_matches_league ON matches(league_id);
CREATE INDEX idx_matches_players ON matches(player1_id, player2_id);