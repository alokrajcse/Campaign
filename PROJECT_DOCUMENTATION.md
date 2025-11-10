# Campaign Management System - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technologies Used](#technologies-used)
4. [Features](#features)
5. [Installation Guide](#installation-guide)
6. [User Guide](#user-guide)
7. [API Documentation](#api-documentation)
8. [Database Structure](#database-structure)
9. [Security Features](#security-features)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

The Campaign Management System is a full-stack web application designed to help businesses manage their marketing campaigns and leads efficiently. It provides a complete solution for creating campaigns, managing leads, tracking performance, and analyzing results.

### What This System Does:
- **Campaign Management**: Create, edit, and track marketing campaigns
- **Lead Management**: Add individual leads or upload thousands at once
- **Analytics**: View detailed performance metrics and reports
- **Search**: Find specific leads quickly across all campaigns
- **User Management**: Secure login and user authentication
- **Mobile Support**: Works on all devices (phones, tablets, computers)

### Who Can Use This:
- Marketing teams
- Sales organizations
- Digital agencies
- Small to large businesses
- Anyone managing customer data and campaigns

---

## System Architecture

The system is built using modern web technologies with a three-tier architecture:

```
Frontend (Angular) ↔ Backend (ASP.NET Core) ↔ Database (MySQL)
```

### Architecture Components:

1. **Frontend Layer**: User interface built with Angular
2. **Backend Layer**: API server built with ASP.NET Core
3. **Database Layer**: MySQL database for data storage
4. **Authentication**: JWT tokens for secure access

---

## Technologies Used

### Frontend Technologies

#### Angular Framework (Version 20.3.0)
- **What it is**: A modern web framework for building user interfaces
- **Why we use it**: Creates fast, responsive web applications
- **Key features**: Component-based architecture, two-way data binding

#### Angular Material (Version 20.2.10)
- **What it is**: UI component library for Angular
- **Why we use it**: Provides beautiful, consistent design components
- **Components used**: Buttons, forms, tables, modals, navigation

#### Chart.js (Version 4.5.1)
- **What it is**: JavaScript library for creating charts and graphs
- **Why we use it**: Displays campaign analytics visually
- **Used for**: Performance charts, segment breakdowns, trend analysis

#### PapaParse (Version 5.5.3)
- **What it is**: CSV file parsing library
- **Why we use it**: Handles bulk lead uploads from CSV files
- **Features**: Fast parsing, error handling, data validation

#### RxJS (Version 7.8.0)
- **What it is**: Library for handling asynchronous operations
- **Why we use it**: Manages API calls and data streams
- **Used for**: HTTP requests, real-time updates, event handling

### Backend Technologies

#### ASP.NET Core (Version 8.0)
- **What it is**: Microsoft's web framework for building APIs
- **Why we use it**: Fast, secure, and scalable server applications
- **Features**: RESTful APIs, dependency injection, middleware

#### Entity Framework Core (Version 8.0.13)
- **What it is**: Object-relational mapping (ORM) framework
- **Why we use it**: Simplifies database operations
- **Features**: Code-first approach, migrations, LINQ queries

#### Pomelo MySQL Provider (Version 8.0.3)
- **What it is**: MySQL database provider for Entity Framework
- **Why we use it**: Connects .NET applications to MySQL database
- **Features**: High performance, full MySQL feature support

#### JWT Bearer Authentication (Version 8.0.21)
- **What it is**: JSON Web Token authentication system
- **Why we use it**: Secure, stateless user authentication
- **Features**: Token-based auth, role management, secure sessions

#### BCrypt.Net (Version 4.0.3)
- **What it is**: Password hashing library
- **Why we use it**: Securely stores user passwords
- **Features**: Salt generation, hash verification, security

#### Swagger/OpenAPI (Version 6.6.2)
- **What it is**: API documentation and testing tool
- **Why we use it**: Documents all API endpoints automatically
- **Features**: Interactive API testing, endpoint documentation

### Database Technology

#### MySQL
- **What it is**: Popular relational database management system
- **Why we use it**: Reliable, fast, and widely supported
- **Features**: ACID compliance, indexing, relationships

---

## Features

### 1. User Authentication System

#### Registration
- **What it does**: Creates new user accounts
- **How it works**: 
  - User fills registration form
  - Password is encrypted using BCrypt
  - Account is saved to database
  - User can immediately log in

#### Login
- **What it does**: Authenticates existing users
- **How it works**:
  - User enters email and password
  - System verifies credentials
  - JWT token is generated
  - Token is used for all future requests

#### Security Features
- Password encryption with BCrypt
- JWT token authentication
- Automatic session management
- Secure API endpoints

### 2. Campaign Management

#### Campaign Dashboard
- **What it shows**: Overview of all campaigns
- **Key metrics displayed**:
  - Total number of campaigns
  - Total leads across all campaigns
  - Average open rate
  - Average conversion rate

#### Campaign Creation
- **What you can set**:
  - Campaign name
  - Start and end dates
  - Agency assignment
  - Buyer assignment
  - Brand assignment
  - Description

#### Campaign Editing
- **What you can modify**:
  - All campaign details
  - Status updates
  - Performance metrics
  - Associated leads

#### Filtering and Sorting
- **Filter by**:
  - Campaign name
  - Date range
  - Agency
  - Buyer
  - Brand
- **Sort by**: Any column (name, date, leads, performance)

### 3. Lead Management

#### Individual Lead Entry
- **What you can add**:
  - Lead ID
  - Full name
  - Email address
  - Phone number
  - Campaign assignment
  - Segment classification

#### Bulk Upload System
- **What it does**: Uploads hundreds of leads at once
- **How it works**:
  1. Download CSV template
  2. Fill template with lead data
  3. Upload CSV file
  4. System validates all data
  5. Preview leads before importing
  6. Complete bulk import
  7. View success/failure statistics

#### CSV Template Format
```csv
Lead ID,Name,Email,Phone,Campaign
L001,John Smith,john@email.com,+1234567890,Campaign Name
L002,Jane Doe,jane@email.com,+0987654321,Campaign Name
```

#### Data Validation
- **Email format checking**: Ensures valid email addresses
- **Duplicate detection**: Prevents duplicate leads
- **Required field validation**: Ensures all necessary data is present
- **Campaign verification**: Checks if campaigns exist

### 4. Advanced Search Features

#### Multi-Lead Search
- **What it does**: Searches for multiple leads simultaneously
- **Search methods**:
  - Lead IDs
  - Email addresses
  - Names
- **Results show**:
  - Found leads with full details
  - Not found items list
  - Performance metrics for each lead
- **Export capability**: Download results to Excel

### 5. Analytics and Reporting

#### Campaign Analytics
- **Performance Metrics**:
  - Total leads in campaign
  - Email open rate percentage
  - Link click rate percentage
  - Conversion rate percentage
  - Revenue generated
  - Campaign status

#### Segment Analysis
- **What it shows**:
  - Lead distribution by segment
  - Performance by segment
  - Percentage breakdowns

#### Export Features
- **What you can export**:
  - Campaign analytics
  - Lead search results
  - Performance reports
- **Export format**:  CSV

### 6. Responsive Design

## Installation Guide

### Prerequisites

Before installing, make sure you have:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Used for: Running Angular frontend

2. **.NET 8.0 SDK**
   - Download from: https://dotnet.microsoft.com/
   - Used for: Running ASP.NET Core backend

3. **MySQL Server**
   - Download from: https://dev.mysql.com/downloads/
   - Used for: Database storage

4. **Angular CLI**
   - Install with: `npm install -g @angular/cli`
   - Used for: Angular development

### Step-by-Step Installation

#### 1. Database Setup
```sql
-- Create database
CREATE DATABASE Campaign;

-- Create user (optional)
CREATE USER 'campaign_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON Campaign.* TO 'campaign_user'@'localhost';
```

#### 2. Backend Setup
```bash
# Navigate to server directory
cd SERVER/campaignServer/campaignServer

# Restore NuGet packages
dotnet restore

# Update database connection string in appsettings.json
# Edit: "DefaultConnection": "server=localhost;database=Campaign;user=root;password=your_password"

# Run database migrations
dotnet ef database update

# Start the server
dotnet run
```

#### 3. Frontend Setup
```bash
# Navigate to client directory
cd CLIENT/CampaignClient

# Install npm packages
npm install

# Start development server
npm start
```

#### 4. Access the Application
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/swagger

---

## User Guide

### Getting Started

#### 1. Create Account
1. Open http://localhost:4200
2. Click "Sign up"
3. Fill registration form
4. Click "Register"
5. You'll be redirected to login

#### 2. Login
1. Enter your email and password
2. Click "Login"
3. You'll see the dashboard

### Using the Dashboard

#### Understanding the Summary Cards
- **Total Campaigns**: Shows how many campaigns you have
- **Total Leads**: Shows total leads across all campaigns
- **Avg Open Rate**: Average email open rate percentage
- **Avg Conversion Rate**: Average conversion percentage

#### Filtering Campaigns
1. Use the search box to filter by name
2. Set date ranges using date pickers
3. Use dropdown menus for Agency, Buyer, Brand filters
4. Click "Reset" to clear all filters

### Creating Campaigns

#### Step-by-Step Process
1. Click "Create Campaign" button
2. Fill in campaign details:
   - **Name**: Give your campaign a clear name
   - **Start Date**: When campaign begins
   - **End Date**: When campaign ends
   - **Agency**: Select from dropdown
   - **Buyer**: Select from dropdown
   - **Brand**: Select from dropdown
3. Click "Save"
4. Campaign appears in your dashboard

### Managing Leads

#### Adding Individual Leads
1. Click "Add Lead" button
2. Fill lead information:
   - **Lead ID**: Unique identifier
   - **Name**: Full name
   - **Email**: Valid email address
   - **Phone**: Contact number
   - **Campaign**: Select campaign
3. Click "Save"

#### Bulk Upload Process
1. Click "Bulk Upload" button
2. Download CSV template
3. Open template in Excel or text editor
4. Add your lead data following the format
5. Save as CSV file
6. Upload the file
7. Review validation results
8. Fix any errors shown
9. Click "Upload Leads"
10. View success statistics

### Using Search Features

#### Multi-Lead Search
1. Click "Multi-Lead Search"
2. Enter lead information (one per line):
   - Lead IDs
   - Email addresses
   - Names
3. Click "Search Leads"
4. View results in two sections:
   - **Found**: Leads with full details
   - **Not Found**: Items not in database
5. Export results if needed

### Viewing Analytics

#### Campaign Performance
1. Click the analytics icon next to any campaign
2. View performance metrics:
   - Lead counts
   - Open rates
   - Click rates
   - Conversion rates
3. See segment breakdown
4. Export analytics if needed

---

## Conclusion

This Campaign Management System provides a complete solution for managing marketing campaigns and leads. With its modern architecture, comprehensive features, and security measures, it's suitable for businesses of all sizes.

The system is designed to be:
- **Easy to use**: Intuitive interface for all users
- **Secure**: Protects user data and prevents unauthorized access
- **Responsive**: Works on all devices and screen sizes
