import { Injectable } from '@angular/core';
import { Lead } from '../../../core/models/lead';

@Injectable({
  providedIn: 'root'
})
export class SegmentMappingService {

  assignSegment(lead: Lead): string {
    const campaignId = lead.campaignId || '';
    const email = lead.email || '';
    const phone = String(lead.phone || '');

    // Campaign-based rules (highest priority)
    const campaign = campaignId.toLowerCase();
    
    // Seasonal keywords
    if (campaign.includes('summer') || campaign.includes('winter') || 
        campaign.includes('fall') || campaign.includes('spring') || 
        campaign.includes('seasonal') || campaign.includes('holiday')) return 'Seasonal';
    
    // Corporate keywords
    if (campaign.includes('corporate') || campaign.includes('business') || 
        campaign.includes('enterprise') || campaign.includes('b2b') || 
        campaign.includes('company')) return 'Corporate';
    
    // Early Adopters keywords
    if (campaign.includes('launch') || campaign.includes('new') || 
        campaign.includes('beta') || campaign.includes('preview') || 
        campaign.includes('early') || campaign.includes('first')) return 'Early Adopters';

    // Email domain rules (second priority)
    if (email.toLowerCase().endsWith('@company.com')) return 'Corporate Leads';
    if (email.toLowerCase().endsWith('@edu.org')) return 'Student/Academic';
    if (email.toLowerCase().endsWith('@gmail.com') || 
        email.toLowerCase().endsWith('@yahoo.com')) return 'General Public';

    // Phone number rules (third priority)
    if (phone.startsWith('+1')) return 'US Leads';
    if (phone.startsWith('+91')) return 'India Leads';

    // Default segment
    return 'General';
  }

  processBulkLeads(leads: Lead[]): Lead[] {
    return leads.map(lead => ({
      ...lead,
      segment: this.assignSegment(lead)
    }));
  }
}