-- Add profile fields to Users table
ALTER TABLE Users ADD COLUMN Phone VARCHAR(20) NULL;
ALTER TABLE Users ADD COLUMN Avatar VARCHAR(255) NULL DEFAULT 'default-avatar.png';

-- Update existing users with default avatar
UPDATE Users SET Avatar = 'default-avatar.png' WHERE Avatar IS NULL;