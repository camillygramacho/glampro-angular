import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ServicesRequest } from '../../models/services-request.model';


@Injectable({ providedIn: 'root' })
export class ServicesService {

  private apiUrl = 'http://localhost:8080/glam-pro/serviceSalon';

  constructor(private router: Router, private http: HttpClient) {}

  register(data: ServicesRequest): Observable<any> {
    const headers = new HttpHeaders().set('email', data.email || '');
    return this.http.post(this.apiUrl, data, { headers });
  }

  searchByProfessional(emailProfissional: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professional?emailProfessional=${emailProfissional}`);
  }

}
