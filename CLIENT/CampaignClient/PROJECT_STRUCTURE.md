# Campaign X - Project Structure

## Overview
This Angular project follows a feature-based architecture with clear separation of concerns.

## Folder Structure

```
src/app/
├── core/                           # Core functionality (singleton services, guards, etc.)
│   ├── constants/                  # Application constants
│   │   └── app.constants.ts       # API URLs, app settings, enums
│   ├── guards/                     # Route guards
│   │   └── login-guard.ts         # Authentication guard
│   ├── interceptors/              # HTTP interceptors
│   │   └── token-interceptor.ts   # JWT token interceptor
│   ├── models/                    # Data models and interfaces
│   │   ├── index.ts              # Model exports
│   │   ├── campaign.ts           # Campaign model
│   │   ├── lead.ts               # Lead model
│   │   └── user.ts               # User model
│   ├── services/                  # Core services
│   │   └── auth.ts               # Authentication service
│   ├── utils/                     # Utility functions
│   │   ├── date.utils.ts         # Date manipulation utilities
│   │   └── validation.utils.ts   # Validation helpers
│   └── index.ts                   # Core module exports
│
├── features/                      # Feature modules
│   └── campaigns/                 # Campaign management feature
│       ├── components/            # Feature-specific components
│       │   ├── add-lead/         # Add single lead
│       │   ├── bulk-upload/      # Bulk lead upload
│       │   ├── campaign-analytics/ # Campaign analytics modal
│       │   ├── campaign-dashboard/ # Main dashboard
│       │   ├── create-campaign/  # Create campaign modal
│       │   ├── edit-campaign/    # Edit campaign modal
│       │   ├── leads-list/       # View all leads
│       │   └── multi-lead-search/ # Multi-lead search
│       ├── services/             # Feature-specific services
│       │   ├── campaign.service.ts # Campaign CRUD operations
│       │   └── segment-mapping.service.ts # Lead segment assignment
│       └── campaigns.routes.ts   # Feature routing
│
├── auth/                         # Authentication feature
│   ├── login/                    # Login component
│   └── register/                 # Registration component
│
├── shared/                       # Shared components, pipes, directives
│   ├── components/               # Reusable components
│   │   ├── loading/             # Loading spinner
│   │   ├── navigation/          # Sidebar navigation
│   │   └── navbar/              # Top navigation (if needed)
│   ├── pipes/                   # Custom pipes
│   ├── directives/              # Custom directives
│   └── index.ts                 # Shared module exports
│
├── app.config.ts                # App configuration
├── app.routes.ts                # Main routing
└── app.ts                       # Root component
```

## Architecture Principles

### 1. Feature-Based Structure
- Each major feature has its own module
- Components, services, and routes are co-located within features
- Promotes maintainability and scalability

### 2. Core Module
- Contains singleton services, guards, and interceptors
- Shared across the entire application
- Imported only once in the root module

### 3. Shared Module
- Reusable components, pipes, and directives
- Can be imported by any feature module
- No business logic, only presentation components

### 4. Constants and Utils
- Centralized configuration and utility functions
- Promotes consistency and reduces code duplication
- Easy to maintain and update

## Import Guidelines

### Use Barrel Exports
```typescript
// Good
import { Campaign, Lead } from '@core/models';
import { AuthService } from '@core/services';

// Avoid
import { Campaign } from '../../../core/models/campaign';
import { Lead } from '../../../core/models/lead';
```

### Path Aliases (Recommended)
Configure path aliases in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"]
    }
  }
}
```

## Best Practices

1. **Single Responsibility**: Each component/service has one clear purpose
2. **Dependency Injection**: Use Angular's DI system properly
3. **Lazy Loading**: Feature modules should be lazy-loaded when possible
4. **Type Safety**: Use TypeScript interfaces and strong typing
5. **Error Handling**: Consistent error handling across the application
6. **Testing**: Each component/service should have corresponding tests

## File Naming Conventions

- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Models: `model-name.model.ts` or `model-name.ts`
- Constants: `feature.constants.ts`
- Utils: `utility-name.utils.ts`

This structure provides a solid foundation for scaling the Campaign X application while maintaining code quality and developer productivity.