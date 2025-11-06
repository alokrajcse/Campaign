import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Lead, SearchResult } from '../../../../core/models';
import { CampaignService } from '../../services/campaign.service';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation';

@Component({
  selector: 'app-multi-lead-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './multi-lead-search.html',
  styleUrls: ['./multi-lead-search.css']
})
export class MultiLeadSearchComponent {
  searchInput = '';
  searchResult: SearchResult | null = null;
  isSearching = false;

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  searchLeads() {
    if (!this.searchInput.trim()) return;

    const identifiers = this.searchInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    this.isSearching = true;
    
    // First try backend search
    this.campaignService.searchLeads(identifiers, this.searchInput).subscribe({
      next: (result) => {
        // If backend search doesn't find all, search by name locally
        if (result.notFound && result.notFound.length > 0) {
          this.searchByName(result, identifiers);
        } else {
          this.searchResult = result || { found: [], notFound: identifiers };
          this.isSearching = false;
        }
      },
      error: (err) => {
        console.error('Search error:', err);
        // Fallback to local search
        this.searchByName({ found: [], notFound: identifiers }, identifiers);
      }
    });
  }

  searchByName(initialResult: SearchResult, identifiers: string[]) {
    this.campaignService.getLeads().subscribe({
      next: (allLeads) => {
        const found = [...(initialResult.found || [])];
        const notFound = [];
        
        for (const identifier of identifiers) {
          // Skip if already found by backend
          if (initialResult.found?.some(lead => 
            lead.leadId === identifier || 
            lead.email === identifier
          )) continue;
          
          // Search by name (case insensitive partial match)
          const leadByName = allLeads.find(lead => 
            lead.name?.toLowerCase().includes(identifier.toLowerCase())
          );
          
          if (leadByName) {
            found.push(leadByName);
          } else {
            notFound.push(identifier);
          }
        }
        
        this.searchResult = { found, notFound };
        this.isSearching = false;
      },
      error: () => {
        this.searchResult = initialResult;
        this.isSearching = false;
      }
    });
  }

  exportResults() {
    if (!this.searchResult?.found?.length) {
      return;
    }

    const csvContent = this.generateCSV(this.searchResult.found);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'search-results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateCSV(leads: Lead[]): string {
    const headers = ['Lead ID', 'Name', 'Email', 'Phone', 'Campaign', 'Segment', 'Status', 'Created Date'];
    const rows = leads.map(lead => [
      lead.leadId || '',
      lead.name || '',
      lead.email || '',
      lead.phone || '',
      lead.campaignId || '',
      lead.segment || '',
      lead.status || '',
      lead.createdDate ? new Date(lead.createdDate).toLocaleDateString() : ''
    ]);
    
    return [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
  }

  clearSearch() {
    this.searchInput = '';
    this.searchResult = null;
  }

  goBack() {
    this.router.navigate(['/campaigns']);
  }
}