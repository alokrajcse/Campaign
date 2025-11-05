import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Campaign } from '../../../../core/models';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-campaign.html',
  styleUrls: ['./create-campaign.css']
})
export class CreateCampaignComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() success = new EventEmitter<Campaign>();
  
  campaignForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService
  ) {
    this.campaignForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      agency: [''],
      buyer: [''],
      brand: ['']
    }, { validators: this.dateValidator });
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      const campaign: Campaign = {
        ...this.campaignForm.value,
        status: 'Draft' as const,
        totalLeads: 0,
        openRate: 0,
        conversionRate: 0
      };
      
      this.campaignService.createCampaign(campaign).subscribe((created) => {
        this.success.emit(created);
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  dateValidator(form: any) {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;
    
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { dateInvalid: true };
    }
    return null;
  }

  getFormError(): string {
    if (this.campaignForm.errors?.['dateInvalid']) {
      return 'End date must be after start date';
    }
    return '';
  }
}