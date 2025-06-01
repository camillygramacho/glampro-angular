import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicesService } from '../../../core/services/services.service';

@Component({
  standalone: true,
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  form: FormGroup;
  loading = false;

  // Lista de opções para o campo nameService
  serviceOptions = [
    'Corte Feminino',
    'Corte Masculino',
    'Escova simples',
    'Cílios',
    'Designer Sobrancelhas',
    'Colaração-Tintura',
    'Alisamento/Progressiva',
    'Manicure',
    'Pedicure',
    'Alomgamento de unhas vibra de vidro',
    'Alomgamento de unhas gel',
    'Alomgamento de unhas acrílico',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicesService: ServicesService
  ) {
    this.form = this.fb.group({
      nameService: ['', Validators.required],
      valueService: [null, [Validators.required, Validators.min(0)]],
    });
  }

  cadastrar() {
    if (this.form.invalid) return;
    this.loading = true;
    const email = localStorage.getItem('username'); // Recupera o e-mail armazenado
    const payload = {
      email,
      nameService: this.form.value.nameService,
      valueService: this.form.value.valueService,
    };

    this.servicesService.register(payload).subscribe({
      next: () => {
        alert('Serviço cadastrado com sucesso!');
        this.form.reset(); // Limpa o formulário
        this.router.navigate(['/services']);
      },
      error: (err) => {
        alert('Erro ao cadastrar serviço: ' + (err.error?.message || 'Erro desconhecido'));
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
