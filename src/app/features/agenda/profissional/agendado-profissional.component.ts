import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulingService } from '../../../core/services/scheduling.service';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-agendado-profissional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./agendado-profissional.component.scss'],
  templateUrl: './agendado-profissional.component.html',
})
export class AgendadoProfissionalComponent implements OnInit {
  profissionais: any[] = [];
  profissionalSelecionado: any = null;
  servicoSelecionado: string | null = null;
  agendamentos: any[] = [];
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

  constructor(private userService: UserService,
    private schedulingService: SchedulingService,
  ) {}

    ngOnInit(): void {
      //const emailLogado = localStorage.getItem('username');

      // this.userService.getProfessionals().subscribe({
      //   next: (data) => {
      //     // Remove o usuário logado da lista de profissionais
      //     this.profissionais = data.filter((profissional: any) => profissional.email !== emailLogado);
      //   },
      //   error: (err) => {
      //     alert('Erro ao carregar profissionais: ' + (err.error?.message || 'Erro desconhecido'));
      //     console.error(err);
      //   },
      // });

    this.buscarAgendamentos();
  }

    buscarAgendamentos(): void {
      const emailUserLogin = localStorage.getItem('username');
      if (!emailUserLogin) {
        alert('Usuário não autenticado.');
        return;
      }

      this.loading = true;

      this.schedulingService.getAgendamentosByProfessioanl().subscribe({
        next: (res) => {
          this.agendamentos = res;
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

}
