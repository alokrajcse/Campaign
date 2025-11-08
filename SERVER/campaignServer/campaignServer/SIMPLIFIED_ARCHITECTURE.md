# Simplified Server Architecture

## Overview
The server has been simplified to remove repository pattern complexity and make it more beginner-friendly.

## Architecture Pattern
**Controller → Service → Service Interface**

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and data operations
- **Service Interfaces**: Define contracts for services
- **No Repositories**: Services work directly with DbContext

## Services

### 1. Campaign Service
- **Interface**: `ICampaignService`
- **Implementation**: `CampaignService`
- **Purpose**: Manage campaigns (CRUD operations + analytics)

**Methods:**
- `GetAllAsync()` - Get all campaigns
- `GetByIdAsync(id)` - Get campaign by ID
- `AddAsync(campaign)` - Create new campaign
- `UpdateAsync(campaign)` - Update existing campaign
- `DeleteAsync(id)` - Delete campaign
- `GetFilteredAsync(...)` - Filter campaigns by criteria
- `GetCampaignAnalyticsAsync(id)` - Get campaign analytics

### 2. Lead Service
- **Interface**: `ILeadService`
- **Implementation**: `LeadService`
- **Purpose**: Manage leads (CRUD operations)

**Methods:**
- `GetAllAsync()` - Get all leads
- `GetByIdAsync(leadId)` - Get lead by ID
- `AddAsync(lead)` - Create new lead
- `UpdateAsync(lead)` - Update existing lead
- `DeleteAsync(leadId)` - Delete lead
- `GetByFilterAsync(...)` - Filter leads by criteria
- `AddBulkAsync(leads)` - Add multiple leads

### 3. User Service
- **Interface**: `IUserService`
- **Implementation**: `UserService`
- **Purpose**: Handle authentication

**Methods:**
- `RegisterAsync(request)` - Register new user
- `LoginAsync(request)` - Login user and return JWT token

## Controllers

### 1. CampaignsController
- **Route**: `/api/campaigns`
- **Purpose**: Campaign management endpoints

### 2. LeadsController
- **Route**: `/api/leads`
- **Purpose**: Lead management endpoints

### 3. AuthController
- **Route**: `/api/auth`
- **Purpose**: Authentication endpoints

## Key Simplifications Made

1. **Removed Repository Pattern**: Services now work directly with `AppDbContext`
2. **Simplified Logic**: Basic CRUD operations without complex business rules
3. **Direct Database Access**: No abstraction layers between service and database
4. **Beginner-Friendly**: Easy to understand and modify
5. **Minimal Dependencies**: Each service only depends on DbContext and its interface

## Benefits

- **Easier to Understand**: Clear flow from controller to service to database
- **Less Code**: Fewer files and interfaces to maintain
- **Faster Development**: Direct approach without over-engineering
- **Better for Learning**: Shows basic patterns without complexity
- **Maintainable**: Simple structure is easier to debug and modify

## Usage Example

```csharp
// In Controller
public class CampaignsController : ControllerBase
{
    private readonly ICampaignService _service;
    
    public CampaignsController(ICampaignService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var campaigns = await _service.GetAllAsync();
        return Ok(campaigns);
    }
}

// In Service
public class CampaignService : ICampaignService
{
    private readonly AppDbContext _context;
    
    public CampaignService(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<Campaign>> GetAllAsync()
    {
        return await _context.Campaigns.ToListAsync();
    }
}
```

This architecture is perfect for beginners learning web API development with .NET Core!