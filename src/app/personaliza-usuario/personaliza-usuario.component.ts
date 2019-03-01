import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Cliente } from '../domain/cliente';
import { AmbientacionComponent } from '../ambientacion/ambientacion.component';
import { DataClientesService } from '../services/data-clientes.service';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personaliza-usuario',
  templateUrl: './personaliza-usuario.component.html',
  styleUrls: ['./personaliza-usuario.component.css']
})


export class PersonalizaUsuarioComponent implements OnInit {

  cliente : Cliente
  @Input() numeroUsuarios: number;
  clienteGroupValidations : FormGroup;
  model: NgbDateStruct;
  date: {year: number, month: number};
  cte : Cliente;
  private calendar: NgbCalendar
  

  constructor(private dataClienteService : DataClientesService) 
  {
    this.cliente = new Cliente();
  }

  

  selectToday() 
  {
    this.model = this.calendar.getToday();
  }

  changeCantidad(cantidad: number,cliente : any)
  {
    this.cte  = JSON.parse(cliente)
    this.removeItem(this.cte);
    this.cte.cantidad = Number(cantidad);
    this.dataClienteService.addElement(this.cte)
    this.listaClientes = this.dataClienteService.getClientes();
  }

  cleanListClient()
  {
    this.listaClientes = this.dataClienteService.clean();
  }

  listaClientes = this.dataClienteService.getClientes();

  ngOnInit() 
  {
    
    this.clienteGroupValidations = new FormGroup({

      Nombre : new FormControl('Nombre', [ Validators.required ]),
      ApellidoP : new FormControl('ApellidoP', [ Validators.required ]),
      ApellidoM : new FormControl('ApellidoM', [ Validators.required ]),
      Genero : new FormControl('Genero', [ Validators.required ]),
      Telefono : new FormControl('Telefono', [ Validators.required ]),
      Celular : new FormControl('Celular', [ Validators.required ]),
      Correo : new FormControl('Correo', [ Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      RFC : new FormControl('RFC', [ Validators.required ,Validators.min(12), Validators.max(13)]),
      FechaNac : new FormControl('FechaNac', [  ]),
      Curp : new FormControl('Curp', [ Validators.required ,Validators.min(18), Validators.max(18)]),
      TipoID : new FormControl('TipoID', [ Validators.required ]),
      OCR : new FormControl('OCR', [ Validators.required ]),
      Calle : new FormControl('Calle', [ Validators.required ]),
      NumExt : new FormControl('NumExt', [ Validators.required ]),
      CodigoP : new FormControl('CodigoP', [ Validators.required ]),
      Colonia : new FormControl('Colonia', [ Validators.required ]),
      Delegacion : new FormControl('Delegacion', [ Validators.required ]),
      Estado : new FormControl('Estado', [ Validators.required ])
    })
  }

  onSubmit()
  {
    alert(this.date)
  }

  addCliente()
  {
    if(this.clienteGroupValidations.valid)
    {
      this.cliente.cantidad = Number(this.numeroUsuarios);
      this.cliente.fechaNac = this.getFechaNac();
      this.dataClienteService.addElement(this.cliente)
      this.cliente = new Cliente();
    }
  }

  removeItem(cliente: Cliente)
  {
    this.dataClienteService.deleteElement(cliente)
  }
  

  deleteItem(cliente : Cliente)
  {
    this.dataClienteService.removeElement(cliente)
    this.cleanListClient()
  }

  editItem(cliente : Cliente)
  {
    this.removeItem(cliente);
    this.cleanListClient()
    this.cliente = cliente
  }

  getFechaNac()
  {
    var fechastr = "";
    var dia = this.model.day;
    var mes = this.model.month;
    var anio = this.model.year;

    if(dia <= 9)
      fechastr += "0"+dia;
    else
      fechastr += ""+dia;

    if(mes <= 9)
      fechastr += "/0"+mes
    else
      fechastr += "/"+mes

      fechastr += "/"+anio

      return fechastr;
  }

  get Nombre() { return this.clienteGroupValidations.get('Nombre'); }
  get ApellidoP() { return this.clienteGroupValidations.get('ApellidoP'); }
  get ApellidoM() { return this.clienteGroupValidations.get('ApellidoM'); }
  get Genero() { return this.clienteGroupValidations.get('Genero'); }
  get Telefono() { return this.clienteGroupValidations.get('Telefono'); }
  get Celular() { return this.clienteGroupValidations.get('Celular'); }
  get Correo() { return this.clienteGroupValidations.get('Correo'); }
  get RFC() { return this.clienteGroupValidations.get('RFC'); }
  get FechaNac() { return this.clienteGroupValidations.get('FechaNac'); }
  get Curp() { return this.clienteGroupValidations.get('Curp'); }
  get TipoID() { return this.clienteGroupValidations.get('TipoID'); }
  get OCR() { return this.clienteGroupValidations.get('OCR'); }
  get Calle() { return this.clienteGroupValidations.get('Calle'); }
  get NumExt() { return this.clienteGroupValidations.get('NumExt'); }
  get CodigoP() { return this.clienteGroupValidations.get('CodigoP'); }
  get Colonia() { return this.clienteGroupValidations.get('Colonia'); }
  get Delegacion() { return this.clienteGroupValidations.get('Delegacion'); }
  get Estado() { return this.clienteGroupValidations.get('Estado'); }



}


