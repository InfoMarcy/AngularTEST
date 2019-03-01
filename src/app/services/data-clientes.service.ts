import { Injectable } from '@angular/core';
import { Cliente } from '../domain/cliente';

@Injectable({
  providedIn: 'root'
})
export class DataClientesService {

  private clientes : Array<Cliente>;

  constructor() 
  { 
    this.clientes = new Array<Cliente>();
  }


  addElement(cliente : Cliente)
  {
    this.clientes.push(cliente)
  }

  getClientes()
  {
    return this.clientes;
  }

  clean()
  {
    this.clientes = new Array<Cliente>();
    return this.clientes;
  }

  removeElement(cliente: Cliente)
  {
    this.clientes = this.clientes.filter( item => item !== cliente)
  }

  deleteElement(cliente: Cliente)
  {
    this.clientes = this.clientes.filter( item => item.uuid != cliente.uuid)
  }


}
