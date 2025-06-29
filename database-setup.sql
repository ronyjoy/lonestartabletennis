-- Lone Star Table Tennis Academy Database Setup
-- Run this SQL script after deploying to DigitalOcean

-- First, run your existing schema file (tt-academy-schema.sql)
-- Then run this script to add admin and coach accounts

-- Add Admin and Coach Accounts
-- Admin password: lonestaradmin@austin
-- Coach accounts password: lonestarcoach@austin

INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@lonestartabletennis.com', '$2a$10$WsN19E1k23U2a29Tm1z5guDjvTuBduoUxjAOKUsddxeol1dDeq9YS', 'Admin', 'User', 'admin'),
('bright@lonestartabletennis.com', '$2a$10$gSAy8Wcze8l1kZiwL3abXeg8dHTZm6TdftRbytawS8xLMEfRjGKa.', 'Bright', 'Coach', 'coach'),
('eday@lonestartabletennis.com', '$2a$10$gSAy8Wcze8l1kZiwL3abXeg8dHTZm6TdftRbytawS8xLMEfRjGKa.', 'Eday', 'Coach', 'coach'),
('maba@lonestartabletennis.com', '$2a$10$gSAy8Wcze8l1kZiwL3abXeg8dHTZm6TdftRbytawS8xLMEfRjGKa.', 'Maba', 'Coach', 'coach');

-- Verify accounts were created
SELECT email, first_name, last_name, role FROM users WHERE role IN ('admin', 'coach');

-- Add some sample skill categories
INSERT INTO skill_categories (name, description, max_score) VALUES
('Forehand Drive', 'Basic forehand drive technique and consistency', 10),
('Backhand Drive', 'Basic backhand drive technique and consistency', 10),
('Forehand Loop', 'Topspin forehand loop against backspin', 10),
('Backhand Loop', 'Topspin backhand loop against backspin', 10),
('Serve', 'Service technique and placement variety', 10),
('Return', 'Return of serve consistency and placement', 10),
('Footwork', 'Court movement and positioning', 10),
('Defense', 'Defensive blocks and chops', 10),
('Spin Recognition', 'Ability to read and respond to spin', 10),
('Mental Game', 'Focus, strategy, and match temperament', 10);

-- Verify skill categories were created
SELECT * FROM skill_categories ORDER BY name;

-- Add League System Tables
-- League templates (weekly recurring)
CREATE TABLE IF NOT EXISTS league_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_participants INTEGER DEFAULT 16,
    skill_level_min INTEGER DEFAULT 1,
    skill_level_max INTEGER DEFAULT 10,
    entry_fee DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Specific league instances (generated from templates)
CREATE TABLE IF NOT EXISTS league_instances (
    id SERIAL PRIMARY KEY,
    template_id INTEGER REFERENCES league_templates(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL, -- Monday of the week
    registration_deadline TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('open', 'full', 'closed', 'completed')) DEFAULT 'open',
    actual_participants INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Public league registrations (no login required)
CREATE TABLE IF NOT EXISTS public_league_registrations (
    id SERIAL PRIMARY KEY,
    league_instance_id INTEGER REFERENCES league_instances(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    skill_level INTEGER DEFAULT 5,
    emergency_contact VARCHAR(255),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending'
);

-- Sample league templates
INSERT INTO league_templates (name, description, day_of_week, start_time, end_time, max_participants, entry_fee) VALUES
('Monday Night League', 'Competitive league for intermediate players', 1, '19:00', '21:00', 16, 15.00),
('Wednesday Social League', 'Fun league for all skill levels', 3, '18:30', '20:30', 12, 10.00),
('Friday Masters', 'Advanced players league', 5, '17:00', '19:00', 8, 20.00),
('Saturday Morning League', 'Weekend casual league', 6, '10:00', '12:00', 20, 12.00)
ON CONFLICT DO NOTHING;

-- League Events (tournament instances)
CREATE TABLE IF NOT EXISTS league_events (
    id SERIAL PRIMARY KEY,
    league_instance_id INTEGER REFERENCES league_instances(id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    event_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active', -- active, completed, cancelled
    grouping_method VARCHAR(20) DEFAULT 'middle', -- middle, snake
    total_groups INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- League Groups (generated groups for each event)
CREATE TABLE IF NOT EXISTS league_event_groups (
    id SERIAL PRIMARY KEY,
    league_event_id INTEGER REFERENCES league_events(id) ON DELETE CASCADE,
    group_number INTEGER NOT NULL,
    group_name VARCHAR(100) NOT NULL,
    group_type VARCHAR(20) DEFAULT 'round_robin', -- round_robin, elimination
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group Members (players assigned to each group)
CREATE TABLE IF NOT EXISTS league_group_members (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES league_event_groups(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES public_league_registrations(id) ON DELETE CASCADE,
    seeding_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, player_id)
);

-- League Matches (individual matches within groups)
CREATE TABLE IF NOT EXISTS league_matches (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES league_event_groups(id) ON DELETE CASCADE,
    player1_id INTEGER REFERENCES public_league_registrations(id) ON DELETE CASCADE,
    player2_id INTEGER REFERENCES public_league_registrations(id) ON DELETE CASCADE,
    player1_score INTEGER DEFAULT 0,
    player2_score INTEGER DEFAULT 0,
    match_type VARCHAR(20) DEFAULT 'group', -- group, semifinal, final, consolation
    match_order INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- League Standings (calculated standings for each group)
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

-- Create indexes for league system
CREATE INDEX IF NOT EXISTS idx_league_instances_template ON league_instances(template_id);
CREATE INDEX IF NOT EXISTS idx_league_instances_week ON league_instances(week_start_date);
CREATE INDEX IF NOT EXISTS idx_public_registrations_instance ON public_league_registrations(league_instance_id);
CREATE INDEX IF NOT EXISTS idx_public_registrations_email ON public_league_registrations(email);

-- Create indexes for new league event system
CREATE INDEX IF NOT EXISTS idx_league_events_instance ON league_events(league_instance_id);
CREATE INDEX IF NOT EXISTS idx_league_event_groups_event ON league_event_groups(league_event_id);
CREATE INDEX IF NOT EXISTS idx_league_group_members_group ON league_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_league_group_members_player ON league_group_members(player_id);
CREATE INDEX IF NOT EXISTS idx_league_matches_group ON league_matches(group_id);
CREATE INDEX IF NOT EXISTS idx_league_matches_players ON league_matches(player1_id, player2_id);
CREATE INDEX IF NOT EXISTS idx_league_standings_group ON league_standings(group_id);
CREATE INDEX IF NOT EXISTS idx_league_standings_player ON league_standings(player_id);