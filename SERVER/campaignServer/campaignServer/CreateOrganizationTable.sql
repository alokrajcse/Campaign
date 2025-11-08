-- Create Organization table
CREATE TABLE Organizations (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add OrganizationId to Users table
ALTER TABLE Users ADD COLUMN OrganizationId INT;
ALTER TABLE Users ADD FOREIGN KEY (OrganizationId) REFERENCES Organizations(Id);

-- Add OrganizationId to Campaigns table
ALTER TABLE Campaigns ADD COLUMN OrganizationId INT;
ALTER TABLE Campaigns ADD FOREIGN KEY (OrganizationId) REFERENCES Organizations(Id);

-- Add OrganizationId to Leads table
ALTER TABLE Leads ADD COLUMN OrganizationId INT;
ALTER TABLE Leads ADD FOREIGN KEY (OrganizationId) REFERENCES Organizations(Id);

-- Insert some sample organizations
INSERT INTO Organizations (Name) VALUES 
('Acme Corporation'),
('Tech Solutions Inc'),
('Marketing Pro Ltd'),
('Digital Agency Co');