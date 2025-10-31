import { N } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { CampaignService } from '../../services/campaign/campaign-service';

@Component({
  selector: 'app-bulk-upoad-modal',
  imports: [],
  templateUrl: './bulk-upoad-modal.html',
  styleUrl: './bulk-upoad-modal.css',
})
export class BulkUpoadModal {

  fileName: string='';
  file: File|null=null;
  parsedLeads: any[] = [];

   constructor(private campaignService: CampaignService) {}

   onFileSecected(event: any){
    const file= event.target.files[0];
    if (!file) return;

    const allowed=['csv','xlsx','xls'];
    const ext=file.name.split('.').pop.toLowerCase();

   }





}
