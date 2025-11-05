# Marketing Campaign Planner

A comprehensive Angular application for managing marketing campaigns, leads, and performance analytics.

## Features

- **Authentication**: JWT-based login system
- **Campaign Dashboard**: View and filter campaigns with metrics
- **Lead Management**: Add single leads with automatic segment assignment
- **Bulk Upload**: Import leads from Excel/CSV with validation and segment mapping
- **Multi-Lead Search**: Search multiple leads and export results
- **Analytics Export**: Export campaign data to Excel/CSV
- **Responsive Design**: Works on desktop and tablet devices

## Tech Stack

- **Frontend**: Angular 20.3.x
- **UI Components**: Angular Material
- **File Processing**: XLSX library for Excel operations
- **HTTP Client**: Angular HttpClient with JWT interceptor
- **Styling**: CSS with responsive design

## Project Structure

```
src/app/
├── auth/                    # Authentication components
├── core/
│   ├── models/             # Data models and interfaces
│   └── interceptors/       # HTTP interceptors
├── features/
│   └── campaigns/          # Campaign feature module
│       ├── components/     # Campaign-related components
│       └── services/       # Campaign and segment services
├── guards/                 # Route guards
├── services/               # Shared services
└── shared/                 # Shared components
```

## Segment Mapping Rules

The system automatically assigns leads to segments based on:

### Campaign-Based Rules
- Summer Sale 2025 → Seasonal
- Corporate Offer → Corporate  
- New Product Launch → Early Adopters

### Email Domain Rules
- @company.com → Corporate Leads
- @edu.org → Student/Academic
- @gmail.com, @yahoo.com → General Public

### Phone Number Rules
- +1 (US) → US Leads
- +91 (India) → India Leads
- Default → General

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v20.3.x)
- ASP.NET Core backend (for API)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Navigate to `http://localhost:4200/`

### Backend Configuration

Update the API URL in `src/app/features/campaigns/services/campaign.service.ts`:
```typescript
private apiUrl = 'https://localhost:7000/api';
```

## Usage

### Login
- Use valid credentials to access the dashboard
- JWT token is stored in localStorage

### Dashboard
- View all campaigns with metrics
- Filter by name, date range, agency, buyer, brand
- Access all major features from action buttons

### Add Lead
- Fill required fields: Lead ID, Name, Email, Phone, Campaign
- Segment is auto-assigned based on mapping rules
- Form validation ensures data quality

### Bulk Upload
- Download sample file for format reference
- Upload Excel/CSV with lead data
- Preview shows validation errors and assigned segments
- Summary displays processed, updated, and rejected counts

### Multi-Lead Search
- Enter Lead IDs or emails (one per line)
- View found leads with full details
- Export search results to Excel
- Missing leads are highlighted

## Sample Data

Use `sample-leads.csv` for testing bulk upload functionality.

## Building for Production

```bash
ng build --configuration production
```

## Testing

```bash
ng test
```

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [XLSX Library](https://docs.sheetjs.com)
