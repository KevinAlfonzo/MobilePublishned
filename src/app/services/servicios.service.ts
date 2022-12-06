import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicioDto } from '../dtos/servicio.dto';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<ServicioDto[]>(`${environment.apiURL}/servicios`);
  }
}
