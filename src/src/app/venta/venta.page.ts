import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsoleLogger } from 'typedoc/dist/lib/utils';
import { ClienteDto } from '../dtos/cliente.dto';
import { EmpleadoDto } from '../dtos/empleado.dto';
import { ServicioDto, Tablatemporal } from '../dtos/servicio.dto';
import { VentaDetalleDto } from '../dtos/ventadetalle.dto';
import { ClientesService } from '../services/clientes.service';
import { EmpleadosService } from '../services/empleados.service';
import { ServiciosService } from '../services/servicios.service';
import { VentaService } from '../services/venta.service';
import { VentadetalleService } from '../services/ventadetalle.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  empleados: EmpleadoDto[] = [];
  clientes: ClienteDto[] = [];
  servicios: ServicioDto[] = [];
  ventaForm: FormGroup = new FormGroup<any>({});
  ventadetalleForm: FormGroup = new FormGroup<any>({});
  nroVenta: any;
  servicio: any;
  total: any;

  constructor(public empleadoService: EmpleadosService, 
              public clienteService: ClientesService, 
              public servicioService: ServiciosService,
              public ventaService: VentaService,
              public ventadetalleService: VentadetalleService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getEmpleados();
    this.getClientes();
    this.getServicios();
    this.initVentaForm();
    this.initVentaDetalleForm();
  }

  initVentaForm() {
    let Objecfecha = new Date()
    let fechaActual = `${Objecfecha.getDate()}/${Objecfecha.getMonth() + 1}/${Objecfecha.getFullYear()}`
    this.ventaForm = this.fb.group({
      idventa: [null],
      idcliente: [null],
      idempleado: [null],
      fecha: [fechaActual],
      estado: ['A'],
      total: [null]
    });
  }

  initVentaDetalleForm() {
    this.ventadetalleForm = this.fb.group({
      idventa: [null],
      idservicio: [null],
      cantidad: [null],
      subtotal: [null],
      estado: ['A'],
      notas: [null]
    })

  }

  getEmpleados() {
    this.empleadoService.findAll().subscribe(res => {
      this.empleados = res;
    })
  }

  getClientes() {
    this.clienteService.findAll().subscribe(res =>{
      this.clientes = res;
    })
  }

  getServicios() {
    this.servicioService.findAll().subscribe(res => {
      this.servicios = res;
    })
  }

  registrar() {
    this.servicio = this.ventadetalleForm.controls['idservicio'].value
    this.total = this.ventadetalleForm.controls['cantidad'].value * this.servicio.precio
    this.ventaForm.controls['total'].setValue(this.total);
    this.ventaService.registrarVenta(this.ventaForm.value).subscribe(res => {
      console.log('Venta: ', res);
    })
    this.ventadetalleService.ultimaVenta().subscribe(res => {
      this.nroVenta = res;
    })
    this.registrarVentaDetalle();
  }

  registrarVentaDetalle() {
    setTimeout(() => {
      this.ventadetalleForm.controls['idventa'].setValue(this.nroVenta[0].NROVENTA + 1);
      this.ventadetalleForm.controls['idservicio'].setValue(this.servicio.id);
      this.ventadetalleForm.controls['subtotal'].setValue(this.total);
      this.ventadetalleService.registrarVentaDeatlle(this.ventadetalleForm.value).subscribe(res => {
        console.log('Servicio vendido: ', res);
      })
    }, 3000);
  }

}
