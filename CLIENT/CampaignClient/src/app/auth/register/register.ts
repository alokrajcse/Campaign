import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  username = '';
  email = '';
  password = '';
  errors: any = {};

  constructor(private auth: AuthService) {}

  validateForm(): boolean {
    this.errors = {};
    
    if (!this.username.trim()) {
      this.errors.username = 'Username is required';
    }
    
    if (!this.email.trim()) {
      this.errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors.email = 'Invalid email format';
    }
    
    if (!this.password) {
      this.errors.password = 'Password is required';
    } else if (this.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
    }
    
    return Object.keys(this.errors).length === 0;
  }

  register() {
    if (!this.validateForm()) {
      return;
    }
    
    this.auth.signup({username: this.username, email: this.email, password: this.password})
    .subscribe({
      next: () => alert('Registration successful!'),
      error: (e: any) => {
        if (e.status === 400) {
          alert('This email is already used, try another');
        } else {
          alert('Registration failed');
        }
      }
    });
  }
}
