import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClienteDto } from '../dtos/cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<ClienteDto[]>(`${environment.apiURL}/clientes`);
  }

  registrar(cliente: ClienteDto) {
    return this.http.post<ClienteDto[]>(`${environment.apiURL}/clientes`, cliente);
  }

  finByName(nombre: string) {
    return this.http.get<ClienteDto[]>(`${environment.apiURL}/clientes/nombre/${nombre}`);
  }

}
