import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Campaign } from '../core/models/campaign';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

private baseUrl = 'https://localhost:44392/api'; // <- change to your API


constructor(private http: HttpClient) {}


getCampaigns(page = 1, pageSize = 10, filters: any = {}): Observable<Campaign[]> {
  // Build query params for real API
  let params = new HttpParams()
    .set('page', String(page))
    .set('pageSize', String(pageSize));

  Object.keys(filters).forEach((k) => {
    if (filters[k] !== null && filters[k] !== undefined && filters[k] !== '') {
      params = params.set(k, filters[k]);
    }
  });

  // ✅ Actual API call (your backend returns an array)
  return this.http.get<Campaign[]>(`${this.baseUrl}/Campaigns`, { params });

  // ---------- MOCK DATA (for demo only) ----------
  /*
  const mock: Campaign[] = Array.from({ length: 23 }).map((_, i) => ({
    id: i + 1,
    name: ['Summer Sale 2025', 'Corporate Offer', 'New Product Launch'][i % 3] + ` #${i + 1}`,
    startDate: new Date(2025, 5 + (i % 3), 1).toISOString(),
    endDate: new Date(2025, 6 + (i % 3), 20).toISOString(),
    totalLeads: 100 + i * 10,
    openRate: Math.round(Math.random() * 100),
    conversionRate: Math.round(Math.random() * 30),
    status: i % 2 === 0 ? 'Active' : 'Completed',
    agency: ['Agency A', 'Agency B', 'Agency C'][i % 3],
    buyer: ['Buyer X', 'Buyer Y'][i % 2],
    brand: ['Brand 1', 'Brand 2', 'Brand 3'][i % 3],
  }));

  const start = (page - 1) * pageSize;
  const pageData = mock.slice(start, start + pageSize);
  return of(pageData);
  */
}



getDropdownValues(): Observable<{ agencies: string[]; buyers: string[]; brands: string[] }> {
// Replace with real endpoints if you have them
return of({ agencies: ['Agency A', 'Agency B', 'Agency C'], buyers: ['Buyer X', 'Buyer Y'], brands: ['Brand 1', 'Brand 2', 'Brand 3'] });
}


exportCampaigns(filters: any = {}): Observable<Blob> {
// Example real API call:
// return this.http.get(`${this.baseUrl}/campaigns/export`, { params: filters, responseType: 'blob' });
const csv = 'Campaign,Start,End,TotalLeads,OpenRate,ConversionRate\nDemo,2025-06-01,2025-06-20,120,45,10';
const blob = new Blob([csv], { type: 'text/csv' });
return of(blob);
}

  
}
