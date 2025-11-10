
Campaign Management System
Complete Documentation

Table of Contents
Project Overview


System Architecture


Technologies Used


Features


Installation Guide


User Guide


API Documentation


Security Features


Troubleshooting



Project Overview
The Campaign Management System is a full-stack web application designed to help businesses efficiently manage their marketing campaigns and leads. It provides a comprehensive solution for creating campaigns, managing leads, tracking performance, and analyzing results.
What This System Does
Campaign Management: Create, edit, and track marketing campaigns.


Lead Management: Add individual leads or upload thousands at once.


Analytics: View detailed performance metrics and reports.


Search: Quickly find specific leads across all campaigns.


User Management: Secure login and authentication.


Mobile Support: Fully responsive for phones, tablets, and computers.


Who Can Use This
Marketing teams


Sales organizations


Digital agencies


Small to large businesses


Anyone managing customer data and campaigns



System Architecture
The system follows a three-tier architecture:
Frontend (Angular) ↔ Backend (ASP.NET Core) ↔ Database (MySQL)
Architecture Components
Frontend Layer: User interface built with Angular.


Backend Layer: API server developed using ASP.NET Core.


Database Layer: MySQL database for data storage.


Authentication: JWT tokens for secure access.



Technologies Used
Frontend Technologies
Angular Framework (v20.3.0)
Modern web framework for building responsive UIs.


Component-based architecture with two-way data binding.


Angular Material (v20.2.10)
UI component library for consistent and elegant design.


Components used: buttons, forms, tables, modals, navigation.


Chart.js (v4.5.1)
JavaScript library for interactive charts and graphs.


Used for displaying analytics and performance metrics.


PapaParse (v5.5.3)
CSV parsing library used for bulk lead uploads.


Supports fast parsing, error handling, and data validation.


RxJS (v7.8.0)
Library for managing asynchronous data streams.


Handles HTTP requests, real-time updates, and event streams.



Backend Technologies
ASP.NET Core (v8.0)
Microsoft’s web framework for building APIs.


Provides RESTful APIs, dependency injection, and middleware support.


Entity Framework Core (v8.0.13)
ORM framework simplifying database operations.


Supports code-first migrations and LINQ queries.


Pomelo MySQL Provider (v8.0.3)
Connects .NET applications to MySQL databases.


Offers full MySQL feature support and high performance.


JWT Bearer Authentication (v8.0.21)
Implements secure, token-based user authentication.


Enables stateless sessions and role-based access.


BCrypt.Net (v4.0.3)
Handles secure password hashing and verification.


Supports salt generation for added protection.


Swagger / OpenAPI (v6.6.2)
Generates interactive API documentation and testing interfaces.



Database Technology
MySQL
Reliable relational database system.


ACID-compliant, fast, and widely supported.


Supports indexing, relationships, and transactions.



Features
1. User Authentication System
Registration:
Users can create new accounts.


Passwords encrypted using BCrypt.


Accounts saved to the database for immediate login.


Login:
Validates user credentials.


Generates a JWT token for secure access.


Token used for all authenticated API requests.


Security Features:
BCrypt password encryption.


JWT-based authentication.


Automatic session management.


Secure and protected endpoints.



2. Campaign Management
Campaign Dashboard:
Displays all campaigns with performance metrics.


Shows total campaigns, leads, open rates, and conversions.


Campaign Creation:
Set name, dates, agency, buyer, brand, and description.


Campaign Editing:
Modify campaign details, status, and associated leads.


Filtering and Sorting:
Filter by campaign name, date range, agency, buyer, or brand.


Sort campaigns by name, date, performance, or leads.



3. Lead Management
Individual Lead Entry:
Add details like Lead ID, Name, Email, Phone, and Campaign.


Bulk Upload System:
Download CSV template.


Fill in lead data.


Upload the CSV file.


Validate and preview data.


Complete the bulk import.


CSV Template Example:
Lead ID,Name,Email,Phone,Campaign
L001,John Smith,john@email.com,+1234567890,Campaign A
L002,Jane Doe,jane@email.com,+0987654321,Campaign A

Data Validation:
Validates email format.


Detects duplicates.


Ensures required fields are present.


Confirms valid campaign assignments.



4. Advanced Search Features
Multi-Lead Search:
Search by multiple Lead IDs, names, or emails.


Displays found and not found lists.


Includes performance metrics.


Supports exporting results to Excel.



5. Analytics and Reporting
Campaign Analytics:
Tracks leads, open rates, clicks, conversions, and revenue.


Segment Analysis:
Shows lead distribution and performance by segment.


Includes percentage breakdowns.


Export Options:
Export analytics, reports, and results in CSV format.



6. Responsive Design
Fully optimized for all devices: desktops, tablets, and mobile phones.



Installation Guide
Prerequisites
Node.js (v18 or higher) – Required for Angular frontend.
 Download: https://nodejs.org/


.NET 8.0 SDK – Required for backend API.
 Download: https://dotnet.microsoft.com/


MySQL Server – For database storage.
 Download: https://dev.mysql.com/downloads/


Angular CLI – Install globally with:

 npm install -g @angular/cli



Step-by-Step Installation
1. Backend Setup
cd SERVER/campaignServer/campaignServer
dotnet restore

Update appsettings.json with:

 "DefaultConnection": "server=localhost;database=Campaign;user=root;password=your_password"


Run migrations and start the server:

 dotnet ef database update
dotnet run


2. Frontend Setup
cd CLIENT/CampaignClient
npm install
npm start

3. Access the Application
Frontend: http://localhost:4200


Backend API: http://localhost:5000


API Docs (Swagger): http://localhost:5000/swagger



User Guide
Getting Started
1. Create an Account:
Visit http://localhost:4200


Click “Sign Up”


Fill in the form and register


Proceed to login


2. Login:
Enter credentials and click “Login”


Dashboard will display your data overview



Dashboard Overview
Summary Cards:
Total Campaigns


Total Leads


Average Open Rate


Average Conversion Rate


Filtering Campaigns:
Search by name or date range.


Filter by agency, buyer, or brand.


Click “Reset” to clear filters.



Creating Campaigns
Click “Create Campaign”.


Fill in campaign details (name, dates, agency, buyer, brand).


Click “Save”.


Campaign will appear in dashboard.



Managing Leads
Add Individual Leads:
Click “Add Lead” → fill in Lead ID, Name, Email, Phone, Campaign → click “Save”.


Bulk Upload Leads:
Click “Bulk Upload”.


Download and fill the CSV template.


Upload and validate the data.


Fix errors and complete the upload.


Review import summary.



Search Features
Multi-Lead Search:
Enter multiple Lead IDs, names, or emails (one per line).


View found and not found lists.


Export search results if required.



Viewing Analytics
Campaign Performance:
Click the analytics icon next to any campaign.


View metrics such as leads, open rate, click rate, and conversions.


Export analytics reports as needed.



Conclusion
The Campaign Management System provides a complete solution for marketing teams to manage campaigns and leads effectively.
 It is:
Easy to Use: Intuitive interface with clear navigation.


Secure: Implements JWT and BCrypt for protection.


Responsive: Works on all screen sizes.


Scalable: Built using modern frameworks and clean architecture.

