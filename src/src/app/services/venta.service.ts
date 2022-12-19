import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  registrarVenta(venta:any){
    return this.http.post(`${environment.apiURL}/venta`,venta)
  }

}
