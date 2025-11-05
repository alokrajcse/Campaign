# Marketing Campaign Planner - Workflows

## Authentication Flow

1. User enters credentials on login page
2. System validates with backend API
3. JWT token stored in localStorage
4. User redirected to campaign dashboard
5. Token interceptor adds authorization header to API calls

## Campaign Dashboard Workflow

1. Load campaigns from API
2. Display in paginated, sortable table
3. Apply filters (name, date range, dropdowns)
4. Show campaign metrics (leads, open rate, conversion rate)
5. Provide navigation to other features

## Add Single Lead Workflow

1. User fills lead form with validation
2. System validates required fields and email format
3. Auto-assign segment based on mapping rules
4. Submit to backend API
5. Display success/error message
6. Reset form on success

## Bulk Upload Workflow

1. User selects Excel/CSV file
2. Frontend parses file using XLSX library
3. Validate data format and required fields
4. Apply segment mapping rules to each lead
5. Display preview with validation errors
6. User confirms upload
7. Submit processed leads to backend
8. Display summary (processed, updated, rejected)

## Multi-Lead Search Workflow

1. User enters Lead IDs or emails (multi-line)
2. Parse input and create search array
3. Send search request to backend
4. Display results in two sections:
   - Found leads with full details
   - Not found identifiers highlighted
5. Allow export of complete results to Excel

## Segment Assignment Logic

```
For each lead:
  1. Check campaign name
     - Summer Sale 2025 → Seasonal
     - Corporate Offer → Corporate
     - New Product Launch → Early Adopters
  
  2. If no campaign match, check email domain
     - @company.com → Corporate Leads
     - @edu.org → Student/Academic
     - @gmail.com, @yahoo.com → General Public
  
  3. If no email match, check phone number
     - +1 → US Leads
     - +91 → India Leads
  
  4. Default → General
```

## Export Functionality

### Campaign Analytics Export
- Exports filtered campaign data
- Includes metrics and lead counts
- Downloads as Excel file

### Search Results Export
- Exports both found and not found leads
- Includes status column
- Downloads as Excel file

## Error Handling

- Form validation with real-time feedback
- API error messages displayed to user
- File upload validation with detailed errors
- Network error handling with user notifications

## Security Features

- JWT token authentication
- Route guards protect authenticated pages
- Token interceptor for API authorization
- Automatic logout on token expiration