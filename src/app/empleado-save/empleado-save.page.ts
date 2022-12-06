import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private empleadoService: EmpleadosService) { }

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
  }

  registrarEmpleado() {
    const empleado: EmpleadoDto = this.empleadoForm.value;
    /**empleado.id = uuid.v4();**/
    this.empleadoService.registrar(empleado).subscribe(res => {
      console.log('Respuesta: ', res);
    })
  }
}
