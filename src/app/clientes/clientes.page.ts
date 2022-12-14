import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: ClienteDto[] = [];
  searchControl: FormControl = new FormControl<any>('');

  constructor(private clienteService: ClientesService, private router: Router) { }

  ngOnInit() {
    this.getClientes();
    this.searchCliente();
  }

  getClientes() {
    this.clienteService.findAll().subscribe(res =>{
      this.clientes = res;
    })
  }

  newCliente() {
    this.router.navigate(['cliente-save']).then();
  }

  searchCliente() {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(1000),
      switchMap(search =>{
        if(search) {
          return this.clienteService.finByName(search);
        }
        return this.clienteService.findAll();
      })
    ).subscribe(res => {
      this.clientes = res;
      console.log('Search: ', res);
    })
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.clienteService.findAll().subscribe(res => {
        this.clientes = res;
        console.log('Reload: ', res);
      })
      event.target.complete();
    }, 2000);
  };

}
