import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { ServicioDto } from '../dtos/servicio.dto';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  servicios: any;
  searchControl: FormControl = new FormControl<any>('');

  constructor(private servicioService: ServiciosService, private route: Router) { }

  ngOnInit() {
    this.getServicios();
    this.searchServicio();
  }

  getServicios() {
    this.servicioService.findAll().subscribe(res => {
      this.servicios = res;
    })
  }

  searchServicio() {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(1000),
      switchMap(search =>{
        if(search) {
          return this.servicioService.finByName(search);
        }
        return this.servicioService.findAll();
      })
    ).subscribe(res => {
      this.servicios = res;
      console.log('Search: ', res);
    })
  }

}
