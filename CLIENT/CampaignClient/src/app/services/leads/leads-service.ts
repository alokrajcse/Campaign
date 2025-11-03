import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead } from '../../core/models/lead';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {


  private baseUrl = 'https://localhost:44392/api/Leads';

  constructor(private http: HttpClient) {}

  // ✅ Get all leads
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.baseUrl}`);
  }

  // ✅ Get leads with filters (optional)
  getFilteredLeads(campaignId?: string, segment?: string, email?: string): Observable<Lead[]> {
    let params = new HttpParams();
    if (campaignId) params = params.set('campaignId', campaignId);
    if (segment) params = params.set('segment', segment);
    if (email) params = params.set('email', email);
    return this.http.get<Lead[]>(`${this.baseUrl}`, { params });
  }

  // ✅ Add new lead
  addLead(lead: Lead): Observable<any> {
    return this.http.post(`${this.baseUrl}`, lead);
  }

  // ✅ Update existing lead
  updateLead(id: number, lead: Lead): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, lead);
  }

  // ✅ Delete a lead
  deleteLead(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // ✅ Export leads (CSV)
  exportLeads(format: string = 'csv', campaignId?: string, segment?: string): Observable<Blob> {
    let params = new HttpParams().set('format', format);
    if (campaignId) params = params.set('campaignId', campaignId);
    if (segment) params = params.set('segment', segment);

    return this.http.get(`${this.baseUrl}/export`, {
      params,
      responseType: 'blob'
    });
  }
}
