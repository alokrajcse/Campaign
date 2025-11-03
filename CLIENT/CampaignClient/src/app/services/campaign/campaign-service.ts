import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaign } from '../../core/models/campaign';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private baseUrl='https://localhost:44392/api';

  constructor(private http: HttpClient){}


  addCampaign(addCampaignFormm: any):  Observable<Campaign>
  {

   return this.http.post<Campaign>(`${this.baseUrl}/Campaigns`,addCampaignFormm)

  }

  
  
}
