import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cliente-save',
  templateUrl: './cliente-save.page.html',
  styleUrls: ['./cliente-save.page.scss'],
})
export class ClienteSavePage implements OnInit {

  clienteForm: FormGroup = new FormGroup<any>({});

  constructor(private fb: FormBuilder, public clienteService: ClientesService, private router: Router) { }

  ngOnInit() {
    this.initClienteForm();
  }

  initClienteForm() {
    this.clienteForm = this.fb.group({
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
    if(this.clienteService.clienteSelected){
      this.clienteForm.patchValue(this.clienteService.clienteSelected);
     }
  }

  registrarCliente() {
    const cliente: ClienteDto = this.clienteForm.value;
    /**empleado.id = uuid.v4();**/
    this.clienteService.registrar(cliente).subscribe(res => {
      console.log('Respuesta: ', res);
      this.router.navigate(['clientes'])
    })
  }

  updateCliente(){
    console.log('Datos cliente:', this.clienteForm.value);
    this.clienteService.update(this.clienteForm.value).subscribe(res =>{
      console.log('Se actualizo correctamente: ', res);
      this.clienteForm.reset();
      this.navegateCliente();
      this.router.navigate(['clientes'])
    })
  }

  ngOnDestroy(){
    this.clienteService.clienteSelected = undefined;
  }

  navegateCliente(){
    this.router.navigate(['clientes']);
  }
  
  saveCliente(){
    if(this.clienteService.clienteSelected){
      //Actualizar 
      this.updateCliente();
    }else{
      // Crear
      this.registrarCliente();
    }
  }

}
