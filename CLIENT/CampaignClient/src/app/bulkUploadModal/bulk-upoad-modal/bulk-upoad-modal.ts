import { N } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { CampaignService } from '../../services/campaign/campaign-service';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-bulk-upoad-modal',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './bulk-upoad-modal.html',
  styleUrl: './bulk-upoad-modal.css',
})
export class BulkUpoadModal {

  fileName: string='';
  file: File|null=null;
  parsedLeads: any[] = [];

   constructor(public dialogRef: MatDialogRef<BulkUpoadModal>, private campaignService: CampaignService) {}

   onFileSelected(event: any){
    const file= event.target.files[0];
    if (!file) return;

    const allowed=['csv','xlsx','xls'];
    const ext=file.name.split('.').pop().toLowerCase();

    if(!allowed.includes(ext)){
        alert('Please upload a valid CSV or Excel file.');
    }
    this.file = file;
    this.fileName = file.name;
   }

   parseFile(){

     if (!this.file) {
  alert('Please select a file first.');
  return;
}

const ext = this.file.name.split('.').pop()?.toLowerCase();
if (!ext) {
  alert('Invalid file name.');
  return;
}


    if (ext === 'csv') {
      this.parseCSV(this.file);
    } else {
      this.parseExcel(this.file);
    }
    }



     parseCSV(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        this.parsedLeads = result.data;
        console.log('Parsed CSV:', this.parsedLeads);
      },
      error: (error) => console.error('CSV Parse Error:', error)
    });
  }

  parseExcel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      this.parsedLeads = json;
      console.log('Parsed Excel:', this.parsedLeads);
    };
    reader.readAsArrayBuffer(file);
  }


  uploadLeads() {
    if (this.parsedLeads.length === 0) {
      alert('No leads to upload!');
      return;
    }

    // this.campaignService.bulkUploadLeads(this.parsedLeads).subscribe({
    //   next: (res) => {
    //     alert('Leads uploaded successfully!');
    //     console.log('Upload response:', res);
    //   },
    //   error: (err) => {
    //     console.error('Upload failed:', err);
    //     alert('Error uploading leads.');
    //   }
    // }
  };





}
