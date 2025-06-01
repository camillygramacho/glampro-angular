import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../../core/services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { SchedulingService } from '../../../core/services/scheduling.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {
  agendamentos: { idServiceSalon: string; data: string; hora: string }[] = [];
  servicos: any[] = [];
  loading = false;

  constructor(private servicesService: ServicesService,
    private schedulingService: SchedulingService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('username');
    if (email) {
      this.servicesService.searchByProfessional(email).subscribe({
        next: (data) => {
          this.servicos = data;
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

  adicionarAgendamento() {
    this.agendamentos.push({ idServiceSalon: '', data: '', hora: '' });
  }

  removerAgendamento(index: number) {
    this.agendamentos.splice(index, 1);
  }

  todosValidos(): boolean {
    return this.agendamentos.every(
      (a) => a.idServiceSalon && a.data && a.hora
    );
  }

  formatDateTime(date: string, time: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year} ${time}`;
  }

  salvarAgendamentos() {
    if (!this.todosValidos()) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    const agendamentosPayload = this.agendamentos.map((item) => ({
      idServiceSalon: item.idServiceSalon,
      dateTimeAvailable: this.formatDateTime(item.data, item.hora),
    }));

    this.schedulingService.registerAgendamentos(agendamentosPayload).subscribe({
      next: () => {
        alert('Agendamentos salvos com sucesso!');
        this.agendamentos = [];
      },
      error: (err) => {
        alert('Erro ao salvar agendamentos: ' + (err.error?.message || 'Erro desconhecido'));
        console.error(err);
      },
    });
  }
}
