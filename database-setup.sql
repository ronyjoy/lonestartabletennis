-- Lone Star Table Tennis Academy Database Setup
-- Run this SQL script after deploying to DigitalOcean

-- First, run your existing schema file (tt-academy-schema.sql)
-- Then run this script to add admin and coach accounts

-- Add Admin and Coach Accounts
-- Password for all accounts: password123

INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@lonestartabletennis.com', '$2a$10$VF2KjpbaGe5SoEYDNXN7UeXcxUKD.SDrIX/cm0A.Yp/4lFVasJFAK', 'Admin', 'User', 'admin'),
('bright@lonestartabletennis.com', '$2a$10$uyb7sg1nw.W7vjZ6MaWxJeqh0PWQwTCwSQLBD9JaOY/0NWIpPviUi', 'Bright', 'Coach', 'coach'),
('eday@lonestartabletennis.com', '$2a$10$uyb7sg1nw.W7vjZ6MaWxJeqh0PWQwTCwSQLBD9JaOY/0NWIpPviUi', 'Eday', 'Coach', 'coach'),
('maba@lonestartabletennis.com', '$2a$10$uyb7sg1nw.W7vjZ6MaWxJeqh0PWQwTCwSQLBD9JaOY/0NWIpPviUi', 'Maba', 'Coach', 'coach');

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