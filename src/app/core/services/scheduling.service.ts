import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import assert from 'assert';
import { Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SchedulingService {

  private apiUrl = 'http://localhost:8080/glam-pro/scheduling';

  constructor(private router: Router, private http: HttpClient) {}

  registerAgendamentos(data: any[]): Observable<any> {
    const email = localStorage.getItem('username');
    const headers = new HttpHeaders().set('email', email || '');
    return this.http.post(this.apiUrl, data, { headers });
  }

  buscarAgendamentosDisponiveis(emailProfissional: string, nomeServico: string): Observable<any[]> {
    const params = {
    email: emailProfissional,
    nameService: nomeServico
  };
    return this.http.get<any[]>(`${this.apiUrl}`, { params });
  }

  getAgendamentosByAppointmentDone(emailProfissional: string, nomeServico: string): Observable<any[]> {
    const params = {
      emailProfessional: emailProfissional,
      nameService: nomeServico
    };
    const emailLogin = localStorage.getItem('username');
    const headers = new HttpHeaders().set('emailLogin', emailLogin || '');
    return this.http.get<any[]>(`${this.apiUrl+'/appointmentDone'}`, { params, headers });
  }

  confirmarAgendamentos(data: any[]): Observable<any> {
    return this.http.patch(this.apiUrl, data);
  }


}