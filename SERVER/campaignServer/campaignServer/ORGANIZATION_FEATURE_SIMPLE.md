# Organization Feature - Simple Guide

## What is Organization Feature?
This feature allows multiple companies to use the same application while keeping their data separate.

## How It Works

### 1. Database Setup
- Each user belongs to an organization
- Each campaign belongs to an organization  
- Each lead belongs to an organization
- Users can only see data from their own organization

### 2. User Registration
```csharp
// User selects organization during signup
public class RegisterRequest
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int OrganizationId { get; set; }  // NEW: Organization selection
}
```

### 3. JWT Token
When user logs in, their organization ID is stored in the JWT token:
```csharp
// JWT contains user's organization
new Claim("OrganizationId", user.OrganizationId.ToString())
```

### 4. Data Filtering
All services filter data by organization:
```csharp
// Only get campaigns from user's organization
public async Task<List<Campaign>> GetByOrganizationAsync(int organizationId)
{
    return await _context.Campaigns
        .Where(c => c.OrganizationId == organizationId)  // Filter by organization
        .ToListAsync();
}
```

### 5. Controllers
Controllers get user's organization from JWT and pass it to services:
```csharp
[HttpGet]
public async Task<IActionResult> GetAll()
{
    var organizationId = GetUserOrganizationId();  // Get from JWT
    var campaigns = await _service.GetByOrganizationAsync(organizationId);
    return Ok(campaigns);
}
```

## Key Files Changed

### Backend Models
- `User.cs` - Added `OrganizationId`
- `Campaign.cs` - Added `OrganizationId`
- `Lead.cs` - Added `OrganizationId`
- `Organization.cs` - New model

### Backend Services
- `CampaignService.cs` - Filters by organization
- `LeadService.cs` - Filters by organization
- `OrganizationService.cs` - Manages organizations
- `UserService.cs` - Handles organization in registration

### Backend Controllers
- `BaseController.cs` - Gets organization from JWT
- `CampaignsController.cs` - Uses organization filtering
- `LeadsController.cs` - Uses organization filtering
- `OrganizationsController.cs` - Provides organization list

### Frontend
- `auth.ts` - Added organization models and API calls
- `register.ts` - Added organization selection
- `register.html` - Added organization dropdown

## Simple Flow

1. **User registers** → Selects organization from dropdown
2. **User logs in** → JWT contains organization ID
3. **User makes API call** → Organization ID extracted from JWT
4. **Service filters data** → Only returns data from user's organization
5. **User sees results** → Only their organization's data

## Benefits
- **Data Security**: Users cannot see other organizations' data
- **Multi-Tenant**: Multiple companies can use same application
- **Simple Setup**: Just add organization ID to models and filter queries
- **Automatic**: No manual filtering needed in frontend

This keeps the code simple while providing complete data isolation between organizations!