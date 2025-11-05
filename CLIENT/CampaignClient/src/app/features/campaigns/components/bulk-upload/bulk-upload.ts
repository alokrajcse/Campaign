import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Lead, BulkUploadResult } from '../../../../core/models';
import { CampaignService } from '../../services/campaign.service';
import { SegmentMappingService } from '../../services/segment-mapping.service';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './bulk-upload.html',
  styleUrls: ['./bulk-upload.css']
})
export class BulkUploadComponent {
  selectedFile: File | null = null;
  previewData: Lead[] = [];
  validationErrors: string[] = [];
  uploadResult: BulkUploadResult | null = null;
  isProcessing = false;
  availableCampaigns: string[] = [];
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  paginatedData: Lead[] = [];

  constructor(
    private campaignService: CampaignService,
    private segmentService: SegmentMappingService,
    private router: Router
  ) {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.campaignService.getCampaigns().subscribe({
      next: (campaigns) => {
        this.availableCampaigns = campaigns.map(c => c.name);
      },
      error: () => {
        this.availableCampaigns = ['Summer Sale 2025', 'Corporate Offer', 'New Product Launch'];
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // File size validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      this.validationErrors = ['File size must be less than 5MB'];
      return;
    }

    // File type validation
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (fileExtension !== '.csv') {
      this.validationErrors = ['Only CSV files are allowed'];
      return;
    }

    this.selectedFile = file;
    this.validationErrors = [];
    this.parseFile();
  }

  parseFile() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvText = e.target.result;
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map((h: string) => h.trim());
      
      this.previewData = lines.slice(1)
        .filter((line: string) => line.trim())
        .map((line: string) => {
          const values = line.split(',').map((v: string) => v.trim());
          const row: any = {};
          headers.forEach((header: string, index: number) => {
            row[header] = values[index] || '';
          });
          
          return {
            leadId: String(row['Lead ID'] || row['leadId'] || ''),
            name: String(row['Name'] || row['name'] || ''),
            email: String(row['Email'] || row['email'] || ''),
            phone: String(row['Phone'] || row['phone'] || ''),
            campaignId: String(row['Campaign'] || row['campaignId'] || ''),
            segment: ''
          };
        });

      this.validateData();
      this.assignSegments();
    };
    reader.readAsText(this.selectedFile);
  }

  validateData() {
    this.validationErrors = [];
    const emailSet = new Set<string>();
    
    this.previewData.forEach((lead, index) => {
      if (!lead.leadId) this.validationErrors.push(`Row ${index + 1}: Lead ID is required`);
      if (!lead.name) this.validationErrors.push(`Row ${index + 1}: Name is required`);
      if (!lead.email || !this.isValidEmail(lead.email)) {
        this.validationErrors.push(`Row ${index + 1}: Valid email is required`);
      } else {
        // Check for duplicate emails in upload
        if (emailSet.has(lead.email.toLowerCase())) {
          this.validationErrors.push(`Row ${index + 1}: Duplicate email "${lead.email}" found in upload`);
        } else {
          emailSet.add(lead.email.toLowerCase());
        }
      }
      if (!lead.phone) this.validationErrors.push(`Row ${index + 1}: Phone is required`);
      if (!lead.campaignId) {
        this.validationErrors.push(`Row ${index + 1}: Campaign is required`);
      } else {
        // Validate against available campaigns
        if (this.availableCampaigns.length > 0 && 
            !this.availableCampaigns.some(c => c.toLowerCase() === lead.campaignId.toLowerCase())) {
          this.validationErrors.push(`Row ${index + 1}: Campaign "${lead.campaignId}" not found. Available: ${this.availableCampaigns.join(', ')}`);
        }
      }
    });
  }

  assignSegments() {
    this.previewData = this.segmentService.processBulkLeads(this.previewData);
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.previewData.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.previewData.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  uploadLeads() {
    if (this.validationErrors.length > 0) return;

    this.isProcessing = true;
    this.campaignService.bulkUploadLeads(this.previewData).subscribe({
      next: (result) => {
        this.uploadResult = result;
        this.isProcessing = false;
      },
      error: () => {
        this.isProcessing = false;
      }
    });
  }

  downloadSample() {
    const csvContent = `Lead ID,Name,Email,Phone,Campaign
L001,John Doe,john@company.com,+1234567890,Summer Sale 2025
L002,Jane Smith,jane@edu.org,+919876543210,Corporate Offer
L003,Bob Wilson,bob@gmail.com,+1555123456,New Product Launch
L004,Alice Brown,alice@yahoo.com,+44207123456,Holiday Special
L005,Mike Johnson,mike@company.com,+91987654321,Training Program
L006,Sarah Davis,sarah@university.edu.org,+1444555666,Newsletter
L007,Tom Anderson,tom@outlook.com,+33123456789,General Campaign`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-leads.csv';
    a.click();
  }

  goBack() {
    this.router.navigate(['/campaigns']);
  }
}