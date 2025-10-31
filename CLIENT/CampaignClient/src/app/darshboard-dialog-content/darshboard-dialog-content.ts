import { JsonPipe } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CampaignService } from '../services/campaign/campaign-service';
import { Campaign } from '../core/models/campaign';

@Component({
  selector: 'app-darshboard-dialog-content',
  imports: [FormsModule, JsonPipe],
  templateUrl: './darshboard-dialog-content.html',
  styleUrl: './darshboard-dialog-content.css',
})
export class DarshboardDialogContent {

  singleLead={
    leadId:'',
    name:'',
    email:'',
    phoneNumber:'',
    campaignAssignment:'',
    segement:''
  }

  campaign:Campaign={
    name: '',
startDate: '', 
endDate: '',
// totalLeads?: '',
// openRate?: '',
// conversionRate?: '',
status: 'Active',
agency: '',
buyer: '',
brand: ''

  }

 

  constructor(public dialogRef: MatDialogRef<DarshboardDialogContent>,private campaignservice: CampaignService){
    
    
  }

  addLead(form: any, ){
    if (form.valid) {
      
      console.log('Form submitted:', this.singleLead);
      alert(`Thank you, ${this.singleLead.name}!`);
      this.dialogRef.close();
    }
  }


  createCampaign(form: any){

    if(form.valid){

      this.campaignservice.addCampaign(this.campaign).subscribe({

        next: (res)=>{
          console.log(res);
          
        },
        error: e=>{
          console.log(e);
          
        }
      })

      // console.log('fom submit success', this.campaign);
      // alert(`thank you', ${this.campaign.name}`);
      // this.dialogRef.close();
      
    }

  }

  close(){
    this.dialogRef.close();
  }

}
