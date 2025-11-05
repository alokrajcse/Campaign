# Database Update Instructions

## Adding Buyer and Brand Fields to Campaigns Table

To ensure the Buyer and Brand fields work properly in the application, run the following SQL script on your database:

### Option 1: Run SQL Script
Execute the `UpdateCampaignSchema.sql` file in your database management tool.

### Option 2: Manual SQL Commands
```sql
-- Add Buyer column if it doesn't exist
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Campaigns' AND COLUMN_NAME = 'Buyer')
BEGIN
    ALTER TABLE Campaigns ADD Buyer NVARCHAR(255) NULL;
END

-- Add Brand column if it doesn't exist  
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Campaigns' AND COLUMN_NAME = 'Brand')
BEGIN
    ALTER TABLE Campaigns ADD Brand NVARCHAR(255) NULL;
END
```

### Option 3: Entity Framework Migration (if using EF migrations)
```bash
# In the campaignServer directory
dotnet ef migrations add AddBuyerBrandToCampaigns
dotnet ef database update
```

## Verification
After running the update, verify the columns exist:
```sql
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Campaigns' 
AND COLUMN_NAME IN ('Buyer', 'Brand');
```

## Backend Changes Made
1. ✅ Added `/api/Campaigns/dropdown-data` endpoint
2. ✅ Campaign model already has Buyer and Brand properties
3. ✅ CampaignService handles buyer/brand filtering
4. ✅ Controller accepts buyer/brand parameters

## Frontend Changes Made
1. ✅ Added buyer/brand fields to create campaign form
2. ✅ Added buyer/brand fields to edit campaign form  
3. ✅ Updated service to fetch dropdown data from backend
4. ✅ Added buyer/brand filters to dashboard

The buyer and brand functionality should now work properly once the database is updated.