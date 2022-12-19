import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpleadoDto } from '../dtos/empleado.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiURL + 'Verificado';

  constructor(private http: HttpClient) {
  }

  auth(login: LoginDto){
    return this.http.post<EmpleadoDto[]>(`${environment.apiURL}/auth/login`, login);
  }

  setSession(empleado: EmpleadoDto) {
    localStorage.setItem('usuario', JSON.stringify(empleado));
  }

  getSession(): EmpleadoDto {
    const user = localStorage.getItem('usuario');
    return JSON.parse(user ? user: "");
  }

  deleteSession() {
    localStorage.removeItem('usuario');
  }
}
