# Campaign Management System

A full-stack web application for managing marketing campaigns and leads.

## Architecture

### Frontend (Angular)
- **Framework**: Angular 20.3.0
- **Location**: `CLIENT/CampaignClient/`
- **UI Library**: Angular Material
- **Charts**: Chart.js
- **Styling**: CSS with responsive design

### Backend (ASP.NET Core)
- **Framework**: .NET 8.0
- **Location**: `SERVER/campaignServer/`
- **API**: RESTful Web API
- **Authentication**: JWT Bearer tokens
- **Password Hashing**: BCrypt

### Database
- **Type**: MySQL
- **ORM**: Entity Framework Core
- **Provider**: Pomelo MySQL
- **Connection**: localhost:3306

## Project Structure

```
Campaign/
├── CLIENT/CampaignClient/          # Angular frontend
│   ├── src/app/
│   │   ├── auth/                   # Login/Register components
│   │   ├── core/                   # Services, models, guards
│   │   ├── features/campaigns/     # Campaign management
│   │   └── shared/                 # Shared components
│   └── package.json
├── SERVER/campaignServer/          # .NET backend
│   ├── Controllers/                # API controllers
│   ├── Models/                     # Data models
│   ├── Services/                   # Business logic
│   └── Data/                       # Database context
└── README.md
```

## Features

- User authentication and registration
- Campaign creation and management
- Lead management with bulk upload
- Campaign analytics and reporting
- Multi-lead search functionality
- Responsive design for mobile devices

## Installation Setup

### Prerequisites

- Node.js (v18 or higher)
- .NET 8.0 SDK
- MySQL Server
- Angular CLI

### Database Setup

1. Install MySQL Server
2. Create database named `Campaign`
3. Update connection string in `SERVER/campaignServer/campaignServer/appsettings.json`

### Backend Setup

1. Navigate to server directory:
```
cd SERVER/campaignServer/campaignServer
```

2. Restore packages:
```
dotnet restore
```

3. Run database migrations:
```
dotnet ef database update
```

4. Start the server:
```
dotnet run
```

Server runs on: http://localhost:5000

### Frontend Setup

1. Navigate to client directory:
```
cd CLIENT/CampaignClient
```

2. Install dependencies:
```
npm install
```

3. Start development server:
```
npm start
```

Frontend runs on: http://localhost:4200

## Packages Used

### Frontend Dependencies
- @angular/core: ^20.3.0
- @angular/material: ^20.2.10
- @angular/cdk: ^20.2.10
- chart.js: ^4.5.1
- papaparse: ^5.5.3
- rxjs: ~7.8.0

### Backend Dependencies
- Microsoft.EntityFrameworkCore: 8.0.13
- Pomelo.EntityFrameworkCore.MySql: 8.0.3
- Microsoft.AspNetCore.Authentication.JwtBearer: 8.0.21
- BCrypt.Net-Next: 4.0.3
- Swashbuckle.AspNetCore: 6.6.2

## Default Configuration

- **Database**: MySQL on localhost:3306
- **Database Name**: Campaign
- **JWT Secret**: Configured in appsettings.json
- **API Base URL**: http://localhost:5000
- **Frontend URL**: http://localhost:4200

## Usage

1. Start MySQL server
2. Run backend server
3. Run frontend application
4. Navigate to http://localhost:4200
5. Register new account or login
6. Create campaigns and manage leads