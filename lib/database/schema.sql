-- Instagram Automation Database Schema
-- Balkanların Zirveleri Instagram Management System

-- Posts table - Instagram posts management
CREATE TABLE IF NOT EXISTS instagram_posts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (uuid()),
    caption TEXT NOT NULL,
    image_url VARCHAR(500),
    image_path VARCHAR(500),
    hashtags JSON,
    scheduled_for DATETIME,
    status ENUM('draft', 'scheduled', 'posted') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    posted_at TIMESTAMP NULL,
    engagement JSON -- stores likes, comments, shares
);

-- Monitored hashtags table
CREATE TABLE IF NOT EXISTS instagram_hashtags (
    id VARCHAR(36) PRIMARY KEY DEFAULT (uuid()),
    hashtag VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    category ENUM('primary', 'secondary', 'location', 'activity') DEFAULT 'secondary',
    priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
    language ENUM('tr', 'en', 'mixed') DEFAULT 'tr',
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_checked TIMESTAMP NULL,
    posts_found INT DEFAULT 0,
    comments_posted INT DEFAULT 0,
    avg_engagement DECIMAL(5,2) DEFAULT 0.00
);

-- Comments management table
CREATE TABLE IF NOT EXISTS instagram_comments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (uuid()),
    post_url VARCHAR(500) NOT NULL,
    original_post TEXT,
    suggested_comment TEXT NOT NULL,
    hashtag VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected', 'posted') DEFAULT 'pending',
    confidence_score DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    posted_at TIMESTAMP NULL,
    engagement JSON -- response metrics
);

-- Hashtag activity tracking
CREATE TABLE IF NOT EXISTS instagram_activity (
    id VARCHAR(36) PRIMARY KEY DEFAULT (uuid()),
    hashtag VARCHAR(100) NOT NULL,
    post_url VARCHAR(500) NOT NULL,
    action ENUM('found', 'commented', 'liked') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    success BOOLEAN DEFAULT true,
    error_message TEXT NULL
);

-- Scheduling table for automated tasks
CREATE TABLE IF NOT EXISTS instagram_schedule (
    id VARCHAR(36) PRIMARY KEY DEFAULT (uuid()),
    type ENUM('post', 'comment', 'hashtag_check') NOT NULL,
    reference_id VARCHAR(36), -- foreign key to posts/comments table
    scheduled_time DATETIME NOT NULL,
    status ENUM('pending', 'running', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP NULL,
    error_message TEXT NULL
);

-- Settings table for automation configuration
CREATE TABLE IF NOT EXISTS instagram_settings (
    id VARCHAR(36) PRIMARY KEY DEFAULT (uuid()),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value JSON NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Analytics table for performance tracking
CREATE TABLE IF NOT EXISTS instagram_analytics (
    id VARCHAR(36) PRIMARY KEY DEFAULT (uuid()),
    date DATE NOT NULL,
    posts_published INT DEFAULT 0,
    comments_posted INT DEFAULT 0,
    hashtags_monitored INT DEFAULT 0,
    total_engagement INT DEFAULT 0,
    avg_engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_date (date)
);

-- Insert default hashtags for Balkan hiking theme
INSERT INTO instagram_hashtags (hashtag, category, priority, language) VALUES
-- Primary Turkish hashtags
('dağcılık', 'primary', 'high', 'tr'),
('doğayürüyüşü', 'primary', 'high', 'tr'),
('balkanlar', 'primary', 'high', 'tr'),
('türkiyedağcılık', 'primary', 'high', 'tr'),

-- Secondary activity hashtags
('hiking', 'activity', 'medium', 'en'),
('trekking', 'activity', 'medium', 'en'),
('kampçılık', 'activity', 'medium', 'tr'),
('zirvemanzarası', 'activity', 'medium', 'tr'),
('doğafotoğrafçılığı', 'activity', 'medium', 'tr'),

-- Location hashtags
('valbona', 'location', 'high', 'en'),
('theth', 'location', 'high', 'en'),
('prokletije', 'location', 'high', 'en'),
('albania', 'location', 'medium', 'en'),
('montenegro', 'location', 'medium', 'en'),
('kosovo', 'location', 'medium', 'en'),
('peaksofthebalkans', 'location', 'high', 'en'),

-- General nature hashtags
('doğa', 'secondary', 'medium', 'tr'),
('manzara', 'secondary', 'medium', 'tr'),
('adventure', 'secondary', 'medium', 'en'),
('mountains', 'secondary', 'medium', 'en'),
('nature', 'secondary', 'medium', 'en')
ON DUPLICATE KEY UPDATE
    category = VALUES(category),
    priority = VALUES(priority);

-- Insert default settings
INSERT INTO instagram_settings (setting_key, setting_value, description) VALUES
('automation_enabled', 'true', 'Enable/disable Instagram automation'),
('posting_schedule', '["09:00", "18:00"]', 'Optimal posting times'),
('max_posts_per_day', '2', 'Maximum posts per day'),
('max_comments_per_hour', '5', 'Maximum comments per hour to avoid spam'),
('engagement_rate_threshold', '0.03', 'Minimum engagement rate for successful posts'),
('hashtag_check_interval', '300', 'Hashtag monitoring interval in seconds'),
('comment_templates', '["Muhteşem manzara! 🏔️", "İnanılmaz bir deneyim! ⛰️", "Doğanın harikası! 🌲"]', 'Comment templates for engagement')
ON DUPLICATE KEY UPDATE
    setting_value = VALUES(setting_value),
    description = VALUES(description);

-- Create indexes for better performance
CREATE INDEX idx_posts_status ON instagram_posts(status);
CREATE INDEX idx_posts_scheduled ON instagram_posts(scheduled_for);
CREATE INDEX idx_posts_created ON instagram_posts(created_at);

CREATE INDEX idx_hashtags_active ON instagram_hashtags(is_active);
CREATE INDEX idx_hashtags_category ON instagram_hashtags(category);
CREATE INDEX idx_hashtags_priority ON instagram_hashtags(priority);

CREATE INDEX idx_comments_status ON instagram_comments(status);
CREATE INDEX idx_comments_hashtag ON instagram_comments(hashtag);
CREATE INDEX idx_comments_created ON instagram_comments(created_at);

CREATE INDEX idx_activity_hashtag ON instagram_activity(hashtag);
CREATE INDEX idx_activity_timestamp ON instagram_activity(timestamp);

CREATE INDEX idx_schedule_time ON instagram_schedule(scheduled_time);
CREATE INDEX idx_schedule_status ON instagram_schedule(status);

CREATE INDEX idx_analytics_date ON instagram_analytics(date);