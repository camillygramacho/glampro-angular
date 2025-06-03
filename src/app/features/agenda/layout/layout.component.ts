import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isCliente = false;
  constructor(private authService: AuthService) {
    const roles = this.authService.getRoles();
    this.isCliente = roles.includes('ROLE_CLIENT');
  }

}
