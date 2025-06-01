import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from '../../../core/services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';

@Component({
  standalone: true,
  selector: 'app-consulta',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent {
  form: FormGroup;
  resultados: any[] = [];
  profissionais: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      profissional: [''],
    });
  }

  ngOnInit(): void {
    this.userService.getProfessionals().subscribe({
      next: (data) => {
        this.profissionais = data;
      },
      error: (err) => {
        alert('Erro ao carregar profissionais: ' + (err.error?.message || 'Erro desconhecido'));
        console.error(err);
      },
    });
  }

  consultar() {
    this.loading = true;
    const emailProfissional = this.form.value.profissional;

    this.servicesService.searchByProfessional(emailProfissional).subscribe({
      next: (data) => {
        this.resultados = data;
      },
      error: (err) => {
        alert('Erro ao consultar serviços: ' + (err.error?.message || 'Erro desconhecido'));
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
