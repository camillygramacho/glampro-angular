import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isCliente = false;
  constructor(private authService: AuthService,
    private router: Router,
  ) {}

    navegarParaServico() {
    const roles = this.authService.getRoles();
    if (roles.includes('ROLE_CLIENT')) {
      alert('Acesso negado: apenas profissionais podem acessar a área de serviços.');
    } else {
      this.router.navigate(['/servico']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
