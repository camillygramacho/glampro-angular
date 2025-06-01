import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';


@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  loading = false;
  nome = '';
  email = '';
  cpf = '';
  senha = '';
  isClient = false;
  isProfessional = false;

  constructor(private authService: AuthService, private router: Router) {}

  cadastrar() {
    this.loading = true;
    const payload = {
      name: this.nome,
      email: this.email,
      cpf: this.cpf,
      password: this.senha,
      isClient: this.isClient,
      isProfessional: this.isProfessional,
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        // res.message vem do backend
        this.loading = false;
        if (confirm(res.message + '\nClique em OK para ir para a tela de login.')) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Erro ao cadastrar: ' + (err.error?.message || 'Erro desconhecido'));
        console.error(err);
      },
    });
  }
}
