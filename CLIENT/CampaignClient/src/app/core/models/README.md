# Models Organization

This directory contains all TypeScript interfaces organized by domain.

## File Structure

```
models/
├── auth.ts           # Authentication related models
├── campaign.ts       # Campaign entity model
├── lead.ts          # Lead entity model
├── bulk-upload.ts   # Bulk upload related models
├── search.ts        # Search related models
├── user.ts          # Legacy file (redirects to auth.ts)
└── index.ts         # Re-exports all models
```

## Models by File

### auth.ts
- `User` - User entity
- `LoginRequest` - Login credentials
- `LoginResponse` - Login response with token
- `RegisterRequest` - Registration data

### campaign.ts
- `Campaign` - Campaign entity with all properties

### lead.ts
- `Lead` - Lead entity with engagement metrics

### bulk-upload.ts
- `BulkUploadResult` - Result of bulk upload operations

### search.ts
- `SearchResult` - Search results for leads

## Usage

Import models from the index file or directly from specific files:

```typescript
// Import all models
import { Campaign, Lead, User } from '../models';

// Import specific models
import { Campaign } from '../models/campaign';
import { LoginRequest, LoginResponse } from '../models/auth';
```

## Changes Made

1. **Separated models into individual files** - Each domain has its own file
2. **Removed duplicates** - Consolidated duplicate Campaign and Lead interfaces
3. **Updated Campaign model** - Added missing `clickRate` and `revenue` properties
4. **Organized auth models** - Moved all auth-related interfaces to auth.ts
5. **Maintained backward compatibility** - index.ts re-exports all models
6. **Updated imports** - AuthService now imports from auth.ts instead of user.ts

## Server Alignment

All models now match the server-side DTOs and entities:
- Campaign matches `CampaignServer.Core.Entities.Campaign`
- Lead matches `CampaignServer.Core.Entities.Lead`
- Auth models match `CampaignServer.Core.DTOs.AuthDtos`