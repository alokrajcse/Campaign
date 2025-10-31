import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { Campaign } from '../core/models/campaign';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard-service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DarshboardDialogContent } from '../darshboard-dialog-content/darshboard-dialog-content';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{


  constructor(private campaignService: DashboardService, private router: Router, private auth: AuthService, private dialog: MatDialog){
  }

 

  summary = {
    totalCampaigns: 3,
    totalLeads: 850,
    avgOpenRate: 45,
    avgConversionRate: 20
  };

  // Filter data
  filters = {
    name: '',
    startDate: '',
    endDate: '',
    agency: '',
    buyer: '',
    brand: ''
  };

  
  agencies = ['Agency A', 'Agency B', 'Agency C'];
  buyers = ['Buyer X', 'Buyer Y', 'Buyer Z'];
  brands = ['Brand One', 'Brand Two', 'Brand Three'];

  campaigns: Campaign[] = [
    // { id: 1, name: 'Summer Sale 2025', startDate: '2025-05-01', endDate: '2025-06-30', totalLeads: 300, openRate: 40, conversionRate: 15, status: 'Active', agency: 'Agency A', buyer: 'Buyer X', brand: 'Brand One' },
    // { id: 2, name: 'Corporate Offer', startDate: '2025-02-01', endDate: '2025-04-30', totalLeads: 250, openRate: 50, conversionRate: 25, status: 'Completed', agency: 'Agency B', buyer: 'Buyer Y', brand: 'Brand Two' },
    // { id: 3, name: 'New Product Launch', startDate: '2025-08-01', endDate: '2025-09-30', totalLeads: 300, openRate: 45, conversionRate: 20, status: 'Draft', agency: 'Agency C', buyer: 'Buyer Z', brand: 'Brand Three' }
  ];


  filteredCampaigns: Campaign[] = [];

  // ngOnInit() {

  //   this.campaignService.getCampaigns().subscribe(response => {
  //   this.campaigns = response;

  //   this.filteredCampaigns=this.campaigns
  //   // this.totalCampaigns = response.total;
  // });   }



   ngOnInit() {
  this.campaignService.getCampaigns().subscribe((response: Campaign[]) => {
    console.log('API response:', response);
    this.campaigns = response;
    this.filteredCampaigns = response;
  });
}


  applyFilters() {
    this.filteredCampaigns = this.campaigns.filter(c => {
      const matchesName = c.name.toLowerCase().includes(this.filters.name.toLowerCase());
      const matchesDate =
        (!this.filters.startDate || c.startDate >= this.filters.startDate) &&
        (!this.filters.endDate || c.endDate <= this.filters.endDate);
      return matchesName && matchesDate;
    });
  }

  resetFilters() {
    this.filters = { name: '', startDate: '', endDate: '', agency: '', buyer: '', brand: '' };
    this.filteredCampaigns = this.campaigns;
  }

  addCampaign() {
    alert('Add New Campaign clicked!');
  }

  uploadLeads() {
    alert('Bulk Upload Leads clicked!');
  }

  multiLeadSearch() {
    alert('Multi-Lead Search clicked!');
  }

  exportData() {
    alert('Export Campaign Analytics clicked!');
  }



  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);

  }

  openModal(): void{
    this.dialog.open(DarshboardDialogContent, {
      width: '400px',
      data:{title: "Hello dashboard"}
    })
  }

 

}
