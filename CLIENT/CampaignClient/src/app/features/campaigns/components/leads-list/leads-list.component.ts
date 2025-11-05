import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lead } from '../../../../core/models';
import { CampaignService } from '../../services/campaign.service';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationComponent],
  template: `
    <app-navigation></app-navigation>
    <div class="main-content">
      <div class="leads-container">
        <header class="page-header">
          <h2>All Leads</h2>
        </header>

        <div class="filters-section">
          <input [(ngModel)]="filters.campaign" placeholder="Filter by Campaign" (input)="applyFilters()">
          <input [(ngModel)]="filters.segment" placeholder="Filter by Segment" (input)="applyFilters()">
          <input [(ngModel)]="filters.email" placeholder="Filter by Email" (input)="applyFilters()">
          <button (click)="resetFilters()">Reset</button>
        </div>

        <div class="leads-table" *ngIf="!loading">
          <table>
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Campaign</th>
                <th>Segment</th>
                <th>Status</th>
                <th>Created Date</th>
                <th class="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let lead of paginatedLeads">
                <td>{{lead.leadId}}</td>
                <td>{{lead.name}}</td>
                <td>{{lead.email}}</td>
                <td>{{lead.phone}}</td>
                <td>{{lead.campaignId}}</td>
                <td class="segment">{{lead.segment}}</td>
                <td class="status">{{lead.status}}</td>
                <td>{{formatDate(lead.createdDate)}}</td>
                <td class="actions-column">
                  <img src="/icons/edit.svg" class="action-icon" (click)="editLead(lead)" title="Edit">
                  <img src="/icons/delete.svg" class="action-icon" (click)="deleteLead(lead)" title="Delete">
                </td>
              </tr>
              <tr *ngIf="filteredLeads.length === 0">
                <td colspan="9" class="no-data">No leads found</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="loading" *ngIf="loading">Loading leads...</div>

        <div class="pagination" *ngIf="totalPages > 1">
          <button (click)="changePage(currentPage - 1)" [disabled]="currentPage === 1">Previous</button>
          <span>Page {{currentPage}} of {{totalPages}}</span>
          <button (click)="changePage(currentPage + 1)" [disabled]="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-content {
      margin-left: 240px;
      padding: 2rem;
      min-height: 100vh;
      background: #f8f9fa;
    }

    .leads-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h2 {
      color: #333;
      margin: 0;
    }

    .filters-section {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filters-section input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 200px;
    }

    .filters-section button {
      padding: 0.5rem 1rem;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .leads-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
    }

    .segment {
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .status {
      font-weight: 500;
    }

    .no-data {
      text-align: center;
      color: #666;
      font-style: italic;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 2rem;
    }

    .pagination button {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .pagination button:hover:not(:disabled) {
      background: #f8f9fa;
    }

    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination span {
      font-size: 14px;
      color: #666;
    }



    .action-icon {
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin: 0 3px;
      transition: opacity 0.2s ease;
    }

    .action-icon:hover {
      opacity: 0.7;
    }

    .actions-column {
      width: 100px;
      min-width: 100px;
    }
  `]
})
export class LeadsListComponent implements OnInit {
  leads: Lead[] = [];
  filteredLeads: Lead[] = [];
  paginatedLeads: Lead[] = [];
  loading = false;
  Math = Math;

  filters = {
    campaign: '',
    segment: '',
    email: ''
  };

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.loading = true;
    this.campaignService.getLeads().subscribe({
      next: (leads) => {
        this.leads = leads;
        this.filteredLeads = leads;
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load leads:', err);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredLeads = this.leads.filter(lead => {
      return (!this.filters.campaign || lead.campaignId?.toLowerCase().includes(this.filters.campaign.toLowerCase())) &&
             (!this.filters.segment || lead.segment?.toLowerCase().includes(this.filters.segment.toLowerCase())) &&
             (!this.filters.email || lead.email?.toLowerCase().includes(this.filters.email.toLowerCase()));
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  resetFilters() {
    this.filters = { campaign: '', segment: '', email: '' };
    this.filteredLeads = this.leads;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalItems = this.filteredLeads.length;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLeads = this.filteredLeads.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }



  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  formatDate(date: string | undefined): string {
    return date ? new Date(date).toLocaleDateString() : '';
  }



  editLead(lead: Lead) {
    const newName = prompt('Edit Lead Name:', lead.name);
    const newEmail = prompt('Edit Lead Email:', lead.email);
    const newPhone = prompt('Edit Lead Phone:', lead.phone);
    
    if (newName && newEmail && newPhone) {
      const updatedLead = { ...lead, name: newName, email: newEmail, phone: newPhone };
      this.campaignService.updateLead(lead.leadId, updatedLead).subscribe({
        next: () => {
          lead.name = newName;
          lead.email = newEmail;
          lead.phone = newPhone;
          console.log('Lead updated:', lead.leadId);
        },
        error: (err) => {
          console.error('Failed to update lead:', err);
        }
      });
    }
  }

  deleteLead(lead: Lead) {
    if (confirm(`Are you sure you want to delete lead "${lead.name}"?`)) {
      this.campaignService.deleteLead(lead.leadId).subscribe({
        next: () => {
          this.leads = this.leads.filter(l => l.leadId !== lead.leadId);
          this.applyFilters();
          console.log('Lead deleted:', lead.leadId);
        },
        error: (err) => {
          console.error('Failed to delete lead:', err);
        }
      });
    }
  }
}