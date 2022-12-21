import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  static datoscliente: any;

  constructor(private http: HttpClient) { }

  registrarVenta(datos: any){
    return this.http.post(`${environment.apiURL}/venta`, datos)
  }

}
