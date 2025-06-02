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
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  loading = false;
  nome = '';
  email = '';
  cpf = '';
  city = '';
  senha = '';

  // Substitui os três booleans
  selectedRole: 'cliente' | 'profissional' | 'empresa' | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  selectRole(role: 'cliente' | 'profissional' | 'empresa') {
    // Alterna a seleção: se clicar no mesmo já selecionado, desmarca
    this.selectedRole = this.selectedRole === role ? null : role;
  }

  cadastrar() {
    if (!this.selectedRole) {
      alert('Selecione o tipo de cadastro (Cliente, Profissional ou Empresa).');
      return;
    }

    this.loading = true;

    const payload = {
      name: this.nome,
      email: this.email,
      cpf: this.cpf,
      city: this.city,
      password: this.senha,
      isClient: this.selectedRole === 'cliente',
      isProfessional: this.selectedRole === 'profissional',
      isCompany: this.selectedRole === 'empresa',
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
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
