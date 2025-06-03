import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { DashboardComponent } from './features/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

import { CadastroComponent as AgendaCadastroComponent } from './features/agenda/cadastro/cadastro.component';
import { ConsultaComponent as AgendaConsultaComponent } from './features/agenda/consulta/consulta.component';

import { CadastroComponent as ClienteCadastroComponent } from './features/cliente/cadastro/cadastro.component';
import { ConsultaComponent as ClienteConsultaComponent } from './features/cliente/consulta/consulta.component';

import { CadastroComponent as ServicoCadastroComponent } from './features/servicos/cadastro/cadastro.component';
import { ConsultaComponent as ServicoConsultaComponent } from './features/servicos/consulta/consulta.component';
import { HomeComponent } from './features/home/home.component';
import { LayoutComponent } from './features/agenda/layout/layout.component';
import { ServicoLayoutComponent } from './features/servicos/servico-layout/servico-layout.component';
import { AgendaRealizadoComponent } from './features/agenda/realizado/agenda-realizado.component';
import { AgendadoProfissionalComponent } from './features/agenda/profissional/agendado-profissional.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'agenda',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'cadastro', component: AgendaCadastroComponent },
      { path: 'consulta', component: AgendaConsultaComponent },
      { path: 'agendados', component: AgendaRealizadoComponent },
      { path: 'clientesAgendados', component: AgendadoProfissionalComponent },
      { path: '', redirectTo: 'consulta', pathMatch: 'full' }
    ]
  },
    {
    path: 'servico',
    component: ServicoLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'cadastro', component: ServicoCadastroComponent },
      { path: 'consulta', component: ServicoConsultaComponent },
      { path: '', redirectTo: 'consulta', pathMatch: 'full' }
    ]
  }
    
    // children: [
    //   {
    //     path: 'agenda/cadastro',
    //     component: AgendaCadastroComponent
    //   },
    //   {
    //     path: 'agenda/consulta',
    //     component: AgendaConsultaComponent
    //   },
    //   {
    //     path: 'cliente/cadastro',
    //     component: ClienteCadastroComponent
    //   },
    //   {
    //     path: 'cliente/consulta',
    //     component: ClienteConsultaComponent
    //   },
    //   {
    //     path: 'servico/cadastro',
    //     component: ServicoCadastroComponent
    //   },
    //   {
    //     path: 'servico/consulta',
    //     component: ServicoConsultaComponent
    //   },
    //   { path: '', redirectTo: 'agenda/consulta', pathMatch: 'full' } // Redireciona para uma página padrão
    // ]
  //},
];