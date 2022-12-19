import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { ServicioDto } from '../dtos/servicio.dto';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  servicios: ServicioDto[] = [];
  searchControl: FormControl = new FormControl<any>('');

  constructor(private servicioService: ServiciosService) { }

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
