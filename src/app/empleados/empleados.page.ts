import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { EmpleadoDto } from '../dtos/empleado.dto';
import { AuthService } from '../services/auth.service';
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: EmpleadoDto[] = [];
  nombreUsuario = '';
  searchControl: FormControl = new FormControl<any>('');

  constructor(private empleadoService: EmpleadosService, private authService: AuthService, private router: Router) {
    this.nombreUsuario = this.authService.getSession().nombre;
  }

  ngOnInit() {
    this.getEmpleados();
    this.searchEmpleado();
  }

  getEmpleados() {
    this.empleadoService.findAll().subscribe(res => {
      this.empleados = res;
    })
  }

  logout() {
    this.authService.deleteSession();
    this.router.navigate(['login']).then();
    console.log('A cerrado sesión: ', this.nombreUsuario)
  }

  newEmpleado() {
    this.router.navigate(['empleado-save']).then();
  }

  searchEmpleado() {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(1000),
      switchMap(search =>{
        if(search) {
          return this.empleadoService.finByName(search);
        }
        return this.empleadoService.findAll();
      })
    ).subscribe(res => {
      this.empleados = res;
      console.log('Search: ', res);
    })
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.empleadoService.findAll().subscribe(res => {
        this.empleados = res;
        console.log('Reload: ', res);
      })
      event.target.complete();
    }, 2000);
  };

}
