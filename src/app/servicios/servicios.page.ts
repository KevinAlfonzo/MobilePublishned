import { Component, OnInit } from '@angular/core';
import { ServicioDto } from '../dtos/servicio.dto';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  servicios: ServicioDto[] = [];

  constructor(private servicioService: ServiciosService) { }

  ngOnInit() {
    this.getServicios();
  }

  getServicios() {
    this.servicioService.findAll().subscribe(res => {
      this.servicios = res;
    })
  }
}
