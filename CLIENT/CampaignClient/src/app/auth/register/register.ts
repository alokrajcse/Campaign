import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

   username = '';
  email = '';
  password = '';

  constructor(private auth: AuthService)
  {


  }
  register(){
    this.auth.signup({username: this.username, email:this.email, password:this.password})
    .subscribe({
      next: () => alert('RESISTER SCCESS'),
      error: e=> alert("Error: "+ e.message)
    });

  }
}
