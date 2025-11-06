-- Add Buyer and Brand columns to Campaigns table if they don't exist

-- Check if Buyer column exists, if not add it
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Campaigns' AND COLUMN_NAME = 'Buyer')
BEGIN
    ALTER TABLE Campaigns ADD Buyer VARCHAR(255) NULL;
END

-- Check if Brand column exists, if not add it
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Campaigns' AND COLUMN_NAME = 'Brand')
BEGIN
    ALTER TABLE Campaigns ADD Brand VARCHAR(255) NULL;
END

-- Verify the columns were added
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Campaigns' 
AND COLUMN_NAME IN ('Buyer', 'Brand');