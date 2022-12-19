import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoDto } from '../dtos/empleado.dto';
import { EmpleadosService } from '../services/empleados.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-empleado-save',
  templateUrl: './empleado-save.page.html',
  styleUrls: ['./empleado-save.page.scss'],
})
export class EmpleadoSavePage implements OnInit {

  empleadoForm: FormGroup = new FormGroup<any>({});

  constructor(private fb: FormBuilder, public empleadoService: EmpleadosService, private router: Router) { }

  ngOnInit() {
    this.initEmpleadoForm();
  }

  initEmpleadoForm() {
    this.empleadoForm = this.fb.group({
      id: [null],
      nombre: [null],
      apellidopaterno: [null],
      apellidomaterno: [null],
      telefono: [null],
      email: [null],
      dni: [null],
      estado: [null],
      rol: [null],
      contraseña: [null]
    });
    if(this.empleadoService.empleadoSelected){
      this.empleadoForm.patchValue(this.empleadoService.empleadoSelected);
     }
  }

  registrarEmpleado() {
    const empleado: EmpleadoDto = this.empleadoForm.value;
    /**empleado.id = uuid.v4();**/
    this.empleadoService.registrar(empleado).subscribe(res => {
      console.log('Respuesta: ', res);
      this.router.navigate(['empleados'])
    })
  }

  updateEmpleado(){
    console.log('Datos empleado:', this.empleadoForm.value);
    this.empleadoService.update(this.empleadoForm.value).subscribe(res =>{
      console.log('Se actualizo correctamente: ', res);
      this.empleadoForm.reset();
      this.navegateEmpleado();
    })
  }

  

  ngOnDestroy(){
    this.empleadoService.empleadoSelected = undefined;
  }

  navegateEmpleado(){
    this.router.navigate(['empleados']);
  }
  
  saveEmpleado(){
    if(this.empleadoService.empleadoSelected){
      //Actualizar 
      this.updateEmpleado();
    }else{
      // Crear
      this.registrarEmpleado();
    }
  }

}
