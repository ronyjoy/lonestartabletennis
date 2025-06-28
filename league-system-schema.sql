-- Enhanced League System Schema

-- League templates (weekly recurring)
CREATE TABLE league_templates (
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
CREATE TABLE league_instances (
    id SERIAL PRIMARY KEY,
    template_id INTEGER REFERENCES league_templates(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL, -- Monday of the week
    registration_deadline TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('open', 'full', 'closed', 'completed')) DEFAULT 'open',
    actual_participants INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Public league registrations (no login required)
CREATE TABLE public_league_registrations (
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

-- Sample data
INSERT INTO league_templates (name, description, day_of_week, start_time, end_time, max_participants) VALUES
('Monday Night League', 'Competitive league for intermediate players', 1, '19:00', '21:00', 16),
('Wednesday Social League', 'Fun league for all skill levels', 3, '18:30', '20:30', 12),
('Friday Masters', 'Advanced players league', 5, '17:00', '19:00', 8),
('Saturday Morning League', 'Weekend casual league', 6, '10:00', '12:00', 20);

-- Create indexes
CREATE INDEX idx_league_instances_template ON league_instances(template_id);
CREATE INDEX idx_league_instances_week ON league_instances(week_start_date);
CREATE INDEX idx_public_registrations_instance ON public_league_registrations(league_instance_id);
CREATE INDEX idx_public_registrations_email ON public_league_registrations(email);