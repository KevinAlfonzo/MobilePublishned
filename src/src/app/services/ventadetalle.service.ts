import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tablatemporal } from '../dtos/servicio.dto';
import { VentaDetalleDto } from '../dtos/ventadetalle.dto';

@Injectable({
  providedIn: 'root'
})
export class VentadetalleService {

  static temporal: any[] = [];

  constructor(private http: HttpClient) { }

  añadirTabla(datos: Tablatemporal){
    VentadetalleService.temporal.push(datos);
  }

  registrarVentaDeatlle(ventadetalle:VentaDetalleDto){
    return this.http.post<VentaDetalleDto>(`${environment.apiURL}/ventadetalle`, ventadetalle);
  }

  ultimaVenta(){
    return this.http.get(`${environment.apiURL}/venta/ultimaventa`);
  }

}
