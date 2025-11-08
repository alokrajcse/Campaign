export const APP_CONSTANTS = {
  API_BASE_URL: 'https://localhost:44392/api',
  APP_NAME: 'Campaign X',
  SESSION_TIMEOUT: 18, // 30 minutes in seconds
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    LEADS_PAGE_SIZE: 10,
    CAMPAIGNS_PAGE_SIZE: 5
  },
  SEGMENTS: {
    SEASONAL: 'Seasonal',
    CORPORATE: 'Corporate',
    EARLY_ADOPTERS: 'Early Adopters',
    CORPORATE_LEADS: 'Corporate Leads',
    STUDENT_ACADEMIC: 'Student/Academic',
    GENERAL_PUBLIC: 'General Public',
    US_LEADS: 'US Leads',
    INDIA_LEADS: 'India Leads',
    GENERAL: 'General'
  }
};

export const CAMPAIGN_STATUS = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  COMPLETED: 'Completed'
} as const;

export const LEAD_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
} as const;