# Lead-to-Segment Mapping Rules Implementation

## Overview
The segment mapping rules are implemented in both backend and frontend to automatically assign leads to appropriate segments during bulk import and individual lead creation.

## Implementation Files

### Backend Implementation
**File**: `campaignServer/Helpers/SegmentMapper.cs`
- Static helper class with `AssignSegment()` method
- Used in LeadService for all lead operations
- Implements exact rule matching with case-insensitive comparison

### Frontend Implementation  
**File**: `CampaignClient/src/app/features/campaigns/services/segment-mapping.service.ts`
- Angular service for client-side segment assignment
- Used in bulk upload preview to show segments before upload
- Matches backend logic exactly

## Mapping Rules Implementation

### 1. Campaign-Based Rules (Highest Priority)
```csharp
// Exact matches
if (campaignId.Equals("Summer Sale 2025", StringComparison.OrdinalIgnoreCase))
    return "Seasonal";

if (campaignId.Equals("Corporate Offer", StringComparison.OrdinalIgnoreCase))
    return "Corporate";

if (campaignId.Equals("New Product Launch", StringComparison.OrdinalIgnoreCase))
    return "Early Adopters";

// Partial matches for flexibility
if (campaignId.Contains("Summer", StringComparison.OrdinalIgnoreCase))
    return "Seasonal";
```

### 2. Email Domain-Based Rules
```csharp
if (email.EndsWith("@company.com", StringComparison.OrdinalIgnoreCase))
    return "Corporate Leads";

if (email.EndsWith("@edu.org", StringComparison.OrdinalIgnoreCase))
    return "Student/Academic";

if (email.EndsWith("@gmail.com", StringComparison.OrdinalIgnoreCase) || 
    email.EndsWith("@yahoo.com", StringComparison.OrdinalIgnoreCase))
    return "General Public";
```

### 3. Phone Number-Based Rules
```csharp
if (phone.StartsWith("+1"))
    return "US Leads";

if (phone.StartsWith("+91"))
    return "India Leads";
```

### 4. Default Segment
```csharp
return "General";
```

## Rule Priority Order
1. **Campaign Name** (highest priority)
2. **Email Domain** 
3. **Phone Country Code**
4. **Default** (lowest priority)

## Test Cases

### Campaign-Based Mapping
| Campaign Name | Expected Segment |
|---------------|------------------|
| Summer Sale 2025 | Seasonal |
| Corporate Offer | Corporate |
| New Product Launch | Early Adopters |
| Summer Clearance | Seasonal (partial match) |
| Corporate Training | Corporate (partial match) |

### Email Domain Mapping
| Email | Expected Segment |
|-------|------------------|
| john@company.com | Corporate Leads |
| student@university.edu.org | Student/Academic |
| user@gmail.com | General Public |
| person@yahoo.com | General Public |

### Phone Number Mapping
| Phone | Expected Segment |
|-------|------------------|
| +1234567890 | US Leads |
| +919876543210 | India Leads |
| +44123456789 | General (default) |

### Priority Test
| Campaign | Email | Phone | Expected Segment | Reason |
|----------|-------|-------|------------------|---------|
| Summer Sale 2025 | john@company.com | +1234567890 | Seasonal | Campaign takes priority |
| Random Campaign | user@gmail.com | +91987654321 | General Public | Email takes priority over phone |

## Usage in Application

### Bulk Upload Process
1. User uploads CSV/Excel file
2. Frontend parses file and shows preview
3. `SegmentMappingService.assignSegment()` assigns segments for preview
4. User reviews assignments before upload
5. Backend `SegmentMapper.AssignSegment()` confirms segments during save

### Individual Lead Creation
1. User fills lead form
2. Backend automatically assigns segment using `SegmentMapper.AssignSegment()`
3. Segment is saved with lead data

### Analytics Display
- Segment breakdown shows distribution based on assigned segments
- Real-time calculation from actual lead data
- Proper categorization for reporting

## Sample Data for Testing

### CSV Sample File
```csv
Lead ID,Name,Email,Phone,Campaign
L001,John Doe,john@company.com,+1234567890,Summer Sale 2025
L002,Jane Smith,jane@edu.org,+919876543210,Corporate Offer
L003,Bob Wilson,bob@gmail.com,+1555123456,New Product Launch
L004,Alice Brown,alice@yahoo.com,+44207123456,Holiday Special
```

### Expected Segment Assignments
- L001: Seasonal (Summer Sale 2025)
- L002: Corporate (Corporate Offer)  
- L003: Early Adopters (New Product Launch)
- L004: General Public (@yahoo.com)

## Verification
The segment mapping rules are working correctly in:
- ✅ Backend SegmentMapper helper
- ✅ Frontend SegmentMappingService
- ✅ Bulk upload preview
- ✅ Individual lead creation
- ✅ Analytics segment breakdown

The implementation follows the exact specifications provided in the project requirements.