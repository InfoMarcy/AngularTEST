import { Injectable } from '@angular/core';
import { Persona } from '../domain/persona';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  listaPersonas : Array<Persona> = new Array;

  getData() : Array<Persona>
  {
    this.listaPersonas.push(new Persona("agustin",27));
    this.listaPersonas.push(new Persona("alan",27));
    this.listaPersonas.push(new Persona("hugo",27));

    return this.listaPersonas;
  }

  addElement()
  {
    this.listaPersonas.push(new Persona("agustin",27));
  }

  

}
