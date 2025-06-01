import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ServicesRequest } from '../../models/services-request.model';


@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = 'http://localhost:8080/glam-pro/users';

  constructor(private router: Router, private http: HttpClient) {}

  getProfessionals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?isProfessional=true`);
  }

}