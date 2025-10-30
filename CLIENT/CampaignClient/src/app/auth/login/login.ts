import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router){

  }

  // login(){
  //   this.auth.login({email: this.email, password:this.password}).subscribe({
  //     next: () => this.router.navigate(['/dashboard']),
  //       error: err => alert('Invalid login')
  //   })

  login(){
      this.auth.login({email: this.email, password:this.password}).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          // localStorage.setItem('user', JSON.stringify(response.user)); // optional
          this.router.navigate(['/dashboard']);
        },
        error: () => alert('Invalid credentials')
      });

    
  }
  




  }



