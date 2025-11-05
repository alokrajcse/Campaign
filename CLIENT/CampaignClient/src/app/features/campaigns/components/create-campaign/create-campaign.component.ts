import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Campaign } from '../../../../core/models';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h3>Create New Campaign</h3>
        <form [formGroup]="campaignForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Campaign Name *</label>
            <input formControlName="name" class="form-control" placeholder="Enter campaign name">
          </div>
          <div class="form-group">
            <label>Start Date *</label>
            <input formControlName="startDate" type="date" class="form-control">
          </div>
          <div class="form-group">
            <label>End Date *</label>
            <input formControlName="endDate" type="date" class="form-control">
          </div>
          <div class="form-group">
            <label>Agency</label>
            <select formControlName="agency" class="form-control">
              <option value="">Select Agency</option>
              <option value="Agency A">Agency A</option>
              <option value="Agency B">Agency B</option>
              <option value="Agency C">Agency C</option>
            </select>
          </div>
          <div class="form-group">
            <label>Buyer</label>
            <select formControlName="buyer" class="form-control">
              <option value="">Select Buyer</option>
              <option value="Buyer X">Buyer X</option>
              <option value="Buyer Y">Buyer Y</option>
              <option value="Buyer Z">Buyer Z</option>
            </select>
          </div>
          <div class="form-group">
            <label>Brand</label>
            <select formControlName="brand" class="form-control">
              <option value="">Select Brand</option>
              <option value="Brand One">Brand One</option>
              <option value="Brand Two">Brand Two</option>
              <option value="Brand Three">Brand Three</option>
            </select>
          </div>
          <div class="form-error" *ngIf="getFormError()">{{getFormError()}}</div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="campaignForm.invalid">Create</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      width: 500px;
      max-width: 90vw;
    }
    .modal-actions {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      flex: 1;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .form-error {
      color: #dc3545;
      font-size: 14px;
      margin-top: 10px;
      text-align: center;
    }
  `]
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