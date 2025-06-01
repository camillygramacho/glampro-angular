import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../../core/services/services.service';
import { SchedulingService } from '../../../core/services/scheduling.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  standalone: true,
  selector: 'app-consulta',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./consulta.component.scss'],
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit {
  profissionais: any[] = [];
  profissionalSelecionado: any = null;
  servicoSelecionado: string | null = null;
  agendamentos: any[] = [];
  agendamentoSelecionado: boolean[] = [];
  loading = false;
  buscou = false;

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
    private servicesService: ServicesService,
    private schedulingService: SchedulingService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getProfessionals().subscribe({
      next: (data) => {
        this.profissionais = data;
      },
      error: (err) => {
        alert('Erro ao carregar profissionais: ' + (err.error?.message || 'Erro desconhecido'));
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  buscarAgendamentos(): void {
    if (!this.profissionalSelecionado?.email) {
      alert('Selecione um profissional.');
      return;
    }

    if (!this.servicoSelecionado) {
      alert('Selecione um serviço.');
      return;
    }

    this.loading = true;

    this.schedulingService
      .buscarAgendamentosDisponiveis(this.profissionalSelecionado.email, this.servicoSelecionado)
      .subscribe({
        next: (data) => {
          this.agendamentos = data;
          this.agendamentoSelecionado = new Array(data.length).fill(false);
          this.buscou = true;
        },
        error: (err) => {
          alert('Erro ao buscar agendamentos: ' + (err.error?.message || 'Erro desconhecido'));
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  confirmarAgendamento(): void {
    const agendamentosSelecionados = this.agendamentos
      .map((agendamento, index) => (this.agendamentoSelecionado[index] ? agendamento : null))
      .filter((agendamento) => agendamento !== null);

    if (agendamentosSelecionados.length === 0) {
      alert('Selecione pelo menos um agendamento.');
      return;
    }

    const emailUsuario = localStorage.getItem('username');
    if (!emailUsuario) {
      alert('Usuário não autenticado.');
      return;
    }

    const payload = agendamentosSelecionados.map((agendamento) => ({
      emailUsuario,
      idServiceSalon: agendamento.idServiceSalon,
    }));

    this.loading = true;
    this.schedulingService.confirmarAgendamentos(payload).subscribe({
      next: () => {
        alert('Agendamentos confirmados com sucesso!');
        this.agendamentos = [];
        this.agendamentoSelecionado = [];
        this.buscou = false;
      },
      error: (err) => {
        alert('Erro ao confirmar agendamentos: ' + (err.error?.message || 'Erro desconhecido'));
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
