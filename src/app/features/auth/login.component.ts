import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const payload = {
      username: this.email,
      password: this.senha,
    };
    this.authService.login(payload).subscribe({
    next: (res) => {
      alert('Login realizado com sucesso!');
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      alert(err.error?.message || 'Erro ao fazer login');
    },
  });
}
  
  // login() {
  //   const payload = {
  //     username: this.email,
  //     password: this.senha,
  //   };
  //   const success = this.authService.login(payload);
  //   if (success) {
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     alert('E-mail ou senha inválidos');
  //   }
  // }
}
