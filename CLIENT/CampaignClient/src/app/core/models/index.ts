export interface Campaign {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  totalLeads?: number;
  openRate?: number;
  clickRate?: number;
  conversionRate?: number;
  revenue?: number;
  status?: 'Active' | 'Completed' | 'Draft';
  agency?: string;
  buyer?: string;
  brand?: string;
}

export interface Lead {
  id?: number;
  leadId: string;
  name: string;
  email: string;
  phone: string;
  campaignId: string;
  segment?: string;
  status?: string;
  createdDate?: string;
  updatedDate?: string;
  openRate?: number;
  clickRate?: number;
  conversions?: number;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface BulkUploadResult {
  processed: number;
  updated: number;
  rejected: number;
  errors: string[];
}

export interface SearchResult {
  found: Lead[];
  notFound: string[];
}