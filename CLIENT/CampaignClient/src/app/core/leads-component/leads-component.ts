import { Component } from '@angular/core';
import { Lead } from '../models/lead';
import { LeadsService } from '../../services/leads/leads-service';

@Component({
  selector: 'app-leads-component',
  imports: [],
  templateUrl: './leads-component.html',
  styleUrl: './leads-component.css',
})
export class LeadsComponent {

   leads: Lead[] = [];

  constructor(private leadService: LeadsService) {}

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.leadService.getLeads().subscribe({
      next: (data) => this.leads = data,
      error: (err) => console.error('Error loading leads:', err)
    });
  }

  downloadCsv() {
    this.leadService.exportLeads('csv').subscribe((blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'leads.csv';
      link.click();
    });
  }

}
