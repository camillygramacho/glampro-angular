import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../../models/register-request.model';
import { Login } from '../../models/login.model';
import { JwtResponse } from '../../models/jwt-response.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:9090/glam-pro/auth';

  constructor(private router: Router, private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(this.apiUrl+'/register', data);
  }

  login(data: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((res: JwtResponse) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('roles', JSON.stringify(res.authorities));
      })
    );
  }

  logout(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles).map((a: any) => a.authority) : [];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
