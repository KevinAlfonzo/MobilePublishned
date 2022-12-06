import { Component, OnInit } from '@angular/core';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: ClienteDto[] = [];

  constructor(private clienteService: ClientesService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.findAll().subscribe(res =>{
      this.clientes = res;
    })
  }

}
