import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.page.html',
  styleUrls: ['./user-save.page.scss'],
})
export class UserSavePage implements OnInit {

  userForm: FormGroup = new FormGroup<any>({});

  constructor(private fb: FormBuilder, private clienteService: ClientesService) { }

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.fb.group({
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

  registrarUsuario() {
    const user: ClienteDto = this.userForm.value;
    /**empleado.id = uuid.v4();**/
    this.clienteService.registrar(user).subscribe(res => {
      console.log('Respuesta: ', res);
    })
  }

}
