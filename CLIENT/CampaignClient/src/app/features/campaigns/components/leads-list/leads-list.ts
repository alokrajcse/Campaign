import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lead } from '../../../../core/models';
import { CampaignService } from '../../services/campaign.service';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './leads-list.html',
  styleUrls: ['./leads-list.css']
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