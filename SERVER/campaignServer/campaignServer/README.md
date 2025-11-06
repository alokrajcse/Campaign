# Campaign Server - .NET Core Web API

A professional .NET Core Web API for managing marketing campaigns and leads.

## Architecture

This solution follows Clean Architecture principles with clear separation of concerns:

### Project Structure

```
src/
├── CampaignServer.API/          # Presentation Layer
│   ├── Controllers/             # API Controllers
│   ├── Middleware/              # Custom middleware
│   ├── Extensions/              # Service extensions
│   ├── Configuration/           # Configuration files
│   └── Filters/                 # Action filters
├── CampaignServer.Core/         # Domain Layer
│   ├── Entities/                # Domain entities
│   ├── Interfaces/              # Repository interfaces
│   ├── DTOs/                    # Data transfer objects
│   ├── Services/                # Domain services
│   ├── Enums/                   # Enumerations
│   └── Exceptions/              # Custom exceptions
└── CampaignServer.Infrastructure/ # Infrastructure Layer
    ├── Data/                    # Database context
    ├── Repositories/            # Repository implementations
    ├── Services/                # Infrastructure services
    ├── Helpers/                 # Utility classes
    └── Migrations/              # Database migrations

tests/                           # Unit and integration tests
docs/                           # Documentation
scripts/                        # Database scripts
```

## Getting Started

1. Update connection string in `appsettings.json`
2. Run database migrations
3. Start the application: `dotnet run`

## API Endpoints

- `/api/auth` - Authentication
- `/api/campaigns` - Campaign management
- `/api/leads` - Lead management

## Technologies

- .NET 8.0
- Entity Framework Core
- MySQL
- JWT Authentication
- Swagger/OpenAPI