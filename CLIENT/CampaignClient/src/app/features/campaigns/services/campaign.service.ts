import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campaign } from '../../../core/models/campaign';
import { Lead } from '../../../core/models/lead';
import { BulkUploadResult } from '../../../core/models/bulk-upload';
import { SearchResult } from '../../../core/models/search';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = APP_CONSTANTS.API_BASE_URL;

  constructor(private http: HttpClient) {}

  getCampaigns(filters?: any): Observable<Campaign[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.name) params = params.set('name', filters.name);
      if (filters.startDate) params = params.set('startDate', filters.startDate);
      if (filters.endDate) params = params.set('endDate', filters.endDate);
      if (filters.agency) params = params.set('agency', filters.agency);
      if (filters.buyer) params = params.set('buyer', filters.buyer);
      if (filters.brand) params = params.set('brand', filters.brand);
      if (filters.status) params = params.set('status', filters.status);
    }
    return this.http.get<Campaign[]>(`${this.apiUrl}/Campaigns`, { params }).pipe(
      map(campaigns => campaigns.map(campaign => ({
        ...campaign,
        clickRate: campaign.clickRate || Math.floor(Math.random() * 30) + 10,
        revenue: campaign.revenue || Math.floor(Math.random() * 50000) + 10000
      })))
    );
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.apiUrl}/Campaigns`, campaign);
  }

  updateCampaign(id: number, campaign: Campaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.apiUrl}/Campaigns/${id}`, campaign);
  }

  deleteCampaign(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Campaigns/${id}`);
  }

  getCampaign(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/Campaigns/${id}`);
  }

  addLead(lead: Lead): Observable<Lead> {
    console.log('API URL:', `${this.apiUrl}/Leads`);
    console.log('Lead payload:', lead);
    return this.http.post<Lead>(`${this.apiUrl}/Leads`, lead);
  }

  updateLead(leadId: string, lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/Leads/${leadId}`, lead);
  }

  getLead(leadId: string): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/Leads/${leadId}`);
  }

  getLeads(filters?: any): Observable<Lead[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.campaignId) params = params.set('campaignId', filters.campaignId);
      if (filters.segment) params = params.set('segment', filters.segment);
      if (filters.email) params = params.set('email', filters.email);
    }
    return this.http.get<Lead[]>(`${this.apiUrl}/Leads`, { params });
  }

  bulkUploadLeads(leads: Lead[], options = { overwriteExisting: true }): Observable<BulkUploadResult> {
    const payload = { leads, options };
    return this.http.post<BulkUploadResult>(`${this.apiUrl}/Leads/bulk`, payload);
  }

  searchLeads(identifiers: string[], rawInput: string = ''): Observable<SearchResult> {
    const payload = { identifiers, rawInput };
    return this.http.post<SearchResult>(`${this.apiUrl}/Leads/multi-search`, payload);
  }

  exportLeads(format = 'csv', campaignId?: string, segment?: string): Observable<Blob> {
    let params = new HttpParams().set('format', format);
    if (campaignId) params = params.set('campaignId', campaignId);
    if (segment) params = params.set('segment', segment);
    
    return this.http.get(`${this.apiUrl}/Leads/export`, { 
      params, 
      responseType: 'blob' 
    });
  }

  getCampaignAnalytics(campaignId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Campaigns/${campaignId}/analytics`);
  }

  getDropdownData(): Observable<{agencies: string[], buyers: string[], brands: string[]}> {
    return this.http.get<{agencies: string[], buyers: string[], brands: string[]}>(`${this.apiUrl}/Campaigns/dropdown-data`).pipe(
      map(data => data || {
        agencies: ['Agency A', 'Agency B', 'Agency C'],
        buyers: ['Buyer X', 'Buyer Y', 'Buyer Z'],
        brands: ['Brand One', 'Brand Two', 'Brand Three']
      })
    );
  }

  updateLeadCampaign(leadId: string, campaignName: string): Observable<Lead> {
    return this.http.patch<Lead>(`${this.apiUrl}/Leads/${leadId}/campaign`, { campaignName });
  }

  deleteLead(leadId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Leads/${leadId}`);
  }
}