import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cliente-save',
  templateUrl: './cliente-save.page.html',
  styleUrls: ['./cliente-save.page.scss'],
})
export class ClienteSavePage implements OnInit {

  clienteForm: FormGroup = new FormGroup<any>({});

  constructor(private fb: FormBuilder, private clienteService: ClientesService) { }

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
  }

  registrarCliente() {
    const cliente: ClienteDto = this.clienteForm.value;
    /**empleado.id = uuid.v4();**/
    this.clienteService.registrar(cliente).subscribe(res => {
      console.log('Respuesta: ', res);
    })
  }

}
