import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest } from '../core/models/user';
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
    return !!localStorage.getItem('token');
  }

  getUser() {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}


  
}
