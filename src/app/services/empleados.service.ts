import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpleadoDto } from '../dtos/empleado.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<EmpleadoDto[]>(`${environment.apiURL}/empleados`);
  }

  registrar(empleado: EmpleadoDto) {
    return this.http.post<EmpleadoDto[]>(`${environment.apiURL}/empleados`, empleado);
  }

  finByName(nombre: string) {
    return this.http.get<EmpleadoDto[]>(`${environment.apiURL}/empleados/nombre/${nombre}`);
  }
}
