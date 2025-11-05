import { Routes } from '@angular/router';
import { CampaignDashboardComponent } from './components/campaign-dashboard/campaign-dashboard.component';
import { AddLeadComponent } from './components/add-lead/add-lead.component';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { MultiLeadSearchComponent } from './components/multi-lead-search/multi-lead-search.component';
import { LeadsListComponent } from './components/leads-list/leads-list.component';

export const campaignRoutes: Routes = [
  { path: '', component: CampaignDashboardComponent },
  { path: 'add-lead', component: AddLeadComponent },
  { path: 'bulk-upload', component: BulkUploadComponent },
  { path: 'search', component: MultiLeadSearchComponent },
  { path: 'leads', component: LeadsListComponent }
];