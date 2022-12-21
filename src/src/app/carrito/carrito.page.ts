import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../services/venta.service';
import { VentadetalleService } from '../services/ventadetalle.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  public temporal: any;

  nroVenta: any;

  constructor(private ventaService: VentaService, private ventadetalleService: VentadetalleService, private route: Router) { }

  ngOnInit() {
    this.listarCarrito();
  }

  listarCarrito () {
    this.temporal = VentadetalleService.temporal
  }

  registrarVenta () {
    let datos = VentaService.datoscliente
    this.ventaService.registrarVenta(datos).subscribe(res =>{
      console.log(res);
    })
    this.ultimo();
  }

  registrarVentaDetalle() {
    setTimeout(() => {
      // this.ventadetalleForm.controls['idventa'].setValue(this.nroVenta[0].NROVENTA + 1);
      // this.ventadetalleForm.controls['idservicio'].setValue(this.servicio.id);
      // this.ventadetalleForm.controls['subtotal'].setValue(this.total);
      for (let i = 0; i <= VentadetalleService.temporal.length - 1; i++) {
        let ventadetalle = {
          idventa: this.nroVenta[0].NROVENTA,
          idservicio: VentadetalleService.temporal[i].idservicio,
          cantidad: VentadetalleService.temporal[i].cantidad,
          subtotal: VentadetalleService.temporal[i].precio,
          estado: 'A',
          notas: VentadetalleService.temporal[i].notas,
        }
        this.ventadetalleService.registrarVentaDetalle(ventadetalle).subscribe(res => {
          console.log('Servicio vendido: ', res);
        })
      }
      VentadetalleService.temporal =  new Array;
      this.route.navigate(['venta']).then();
    }, 3000);
  }

  ultimo () {
    setTimeout(() => {
      this.ventadetalleService.ultimaVenta().subscribe(res => {
        this.nroVenta = res;
      })
    }, 1000);
    this.registrarVentaDetalle(); 
  }

}
