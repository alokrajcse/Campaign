import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='https://localhost:44392/api/Auth';

  constructor(private http: HttpClient){

  }

  signup(request: RegisterRequest): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiUrl}/signup`, request);
  }

  login(request: LoginRequest):Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.apiUrl}/signin`, request).pipe(
      tap(response=>{
        localStorage.setItem('token', response.token); // store JWT
      })
    )


  }
  // logout() {
  //   localStorage.removeItem('token');
  // }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  getUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}


  
}
