import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Persona } from '../domain/persona';
import { RestClientService } from '../services/rest-client.service';
import { Constants } from '../domain/constants';
import { AmbientaUsuario } from '../domain/ambienta-usuario';
import { FlujoAmbientacion } from '../domain/flujo-ambientacion';
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript"
import { NotifierService } from 'angular-notifier';
import { Cliente } from '../domain/cliente';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import * as bootstrap from "bootstrap";
import * as jquery from "jquery";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { OauthService } from '../shared/oauth/oauth.service';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  response = new AmbientaUsuario();
  SpinnerVisible : boolean = false;
  downloadJsonHref : SafeUrl;
  currentUser: string;
  nombre_usuario : string;
  clienteReambientacion = new Cliente();
  mytable;

  constructor(
    private dashboardService : DashboardService, 
    private restService : RestClientService,
    private notifierService: NotifierService,
    private chRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private auth: AuthenticateServiceService,
    private http: HttpClient,
    private oAuthService: OauthService,
    private router:Router
    ) { 
      
      this.currentUser = this.auth.getUser("currentUser")
      this.nombre_usuario = this.auth.getUser("nombre")

    }

  dtOptions: DataTables.Settings = {};

  personas = this.dashboardService.getData();
  
  addElement() 
  {
    this.dashboardService.addElement();
  }

  ngOnInit() 
  {
  // this.getHeadersNAM();

      //this.getHeaders() 
      this.listaClientes = []
      //this.chRef.detectChanges();
      //this.loadClientes()
      this.data(this.currentUser)
      
  }

  // getHeadersNAM(){
  //   $(document).ready(function() {


  //     var req = new XMLHttpRequest();
  //     req.open('GET', 'https://10.51.58.238:4080/abc/home', false);
  //     req.send(null);
  //     var headers = req.getAllResponseHeaders().toLowerCase();
  //     console.log("Headers => ",headers);

  //   });
  // }

  downloadJson(data)
  {
    console.log(data)
      var element = document.getElementById(data._id);
      element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(data));
      element.setAttribute('download', "usuario-ambientado.json");
      
  }
 
  data(currentUser:string)
  {
    var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.OBTENER_CLIENTES_AMBIENTADOS_POR_USUARIO+currentUser;
    let me = this;
    var table = $('#listClientes').DataTable( {
      columnDefs:[
      ],
      "language": { "url" :"abc/assets/DataTableSpanish.json"},
      "ajax": {
          url: endpoint,
          async: false,
          dataType: 'json',
          dataSrc: "infoClientes",
          responsive: true,
          processing: true,
          error: function(jqXHR, textStatus, errorThrown){me.notifierService.notify( 'error', 'El servicio de clientes ambientados no respondió correctamente. '+errorThrown);}
      },
        columns: [

          { render: function(data,type, full,row) { return full.nombre ? full.nombre : "" }},
          { render: function(data,type, full,row) { return full.apellidoP+" "+full.apellidoM }},
          { render: function(data,type, full,row) { return full.numCel ? full.numCel : "" }},
          { render: function(data,type, full,row) { return full.icu ? full.icu : "" }},
          { render: function(data,type, full,row) { return full.fechaNac ? full.fechaNac : "" }},
          { render: function(data,type, full,row) { return full.ocr ? full.ocr : "" }},
          { render: function(data,type, full,row) { return full.usuario ? full.usuario : "" }}, 
          { render: function(data,type, full,row) { return full.descFlujo ? full.descFlujo : "" }}, 
         
          
       

          
          {
            render : function(data,type, full,row)
            {
              if(full.estatusCliente)
              {
                return '<button data-toggle="tooltip" title="Descargar" class="btn btn-default"><a class="btnDescargar" id="'+full._id+'"><span class="glyphicon glyphicon-download"></span></a></button> <button data-toggle="tooltip" title="Eliminar"  class="btn btn-danger"><a class="btnEliminar" id="'+full._id+'"><span class="glyphicon glyphicon-trash"></span></a></button>'
                        
              }
              else
              {
                return '<button data-toggle="modal" data-target="#modalConfirmation" (click)="selectClienteReAmbientacion(item)" title="Re-ambientar" class="btn btn-default"><a class="btnAmbientar" id="'+full._id+'"><span class="glyphicon glyphicon-dashboard"></span></a></button>'
              }
            }
           },

 
       ]
      });

      $('#listClientes tbody').on( 'click', 'button', function () {

        
        var data = table.row( $(this).parents('tr') ).data();
        var btnDescargar = this.getElementsByClassName("btnDescargar")
        var btnEliminar = this.getElementsByClassName("btnEliminar");

   

        var that = this;

  

        if(btnDescargar.length)
        {
          btnDescargar[0].setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(JSON.stringify(data)));
          btnDescargar[0].setAttribute('download', "usuario-ambientado.json");
        }
        else if (btnEliminar.length){

          var confirmIt = function (e, id) {
            var result = confirm("Estas seguro que quieres eliminar este cliente ?");

            if (result) {
              // Eliminar el cliente
              console.log("Eliminar el cliente");
   

              me.oAuthService.eliminarCliente(data._id).subscribe(
                res => {
                  // console.log(res)
                 console.log(res)


                 var row = table
                 .row( $(that).parents('tr') )
                 .remove()
                 .draw();
                  //  me.update()

               
                  return;
                },
                err => {
                  console.log("Incidencia al conectarse con el servidor OAUTH", err);
                }
              );
           
            }
          };

          // add button confirm event
            if(data._id != null || data._id != undefined){
              btnEliminar[0].addEventListener('click', confirmIt(event, data._id));
            }

        }
        else
        {
          me.selectClienteReAmbientacion(data)
        } 
    } 
    
    
    
    );

    
    $(document).ready(function() {
      var table = $('#listClientes').DataTable();    
  
      $('#listClientes tbody').on( 'click', 'tr', function () {

        var row = table.row( $(this).parents('tr') );
        me.clientesCheckboxRows(row);

        var btnDescargar = this.getElementsByClassName("btnDescargar");


        me.clientesCheckbox(btnDescargar[0].id)
         $(this).toggleClass('selected');

      } );
   
  } );

  };

  getHeaders() 
  {
    var req = new XMLHttpRequest();
    req.open('GET', document.location+"", false);
    req.send(null);
    
    // associate array to store all values
    var data = new Object();
    
    // get all headers in one call and parse each item
    
    var headers = req.getAllResponseHeaders().toLowerCase();
    
    var aHeaders = headers.split('\n');
    var i =0;
    for (i= 0; i < aHeaders.length; i++) {
        var thisItem = aHeaders[i];
        var key = thisItem.substring(0, thisItem.indexOf(':'));
        var value = thisItem.substring(thisItem.indexOf(':')+1);
        data[key] = value;
    }	    
    
    // get referer
    var referer = document.referrer;
    data["Referer"] = referer;
    
    //get useragent
    var useragent = navigator.userAgent;
    data["UserAgent"] = useragent;
    
    
    //extra code to display the values in html
    var display = "";
    for(var key in data) {
        if (key != "")
      display += "<b>" + key + "</b> : " + data[key] + "<br>";
    }

    alert("Header contents: "+display);  
  }

  listaClientes;
  
  loadClientes()
  {
    return new Promise((resolve, reject) => {
      var usuario = this.currentUser
      var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.OBTENER_CLIENTES_AMBIENTADOS_POR_USUARIO+usuario;
      this.restService.get(endpoint).subscribe((data: {}) => {
        
          var codigoResp = data["codigo"].split(".")[0]
          if(codigoResp == 200)
          {
            this.listaClientes = data["infoClientes"];
            this.SpinnerVisible = false;
            //this.data(this.listaClientes)
          }
          else
          {
            this.notifierService.notify( 'error', 'El servicio no respondió correctamente' );
            this.SpinnerVisible = false;
          }
        }, (err) => 
        {
          this.notifierService.notify( 'error', err.error.mensaje );
          this.SpinnerVisible = false;
        }
      );
      resolve();
    });
  }

  selectClienteReAmbientacion(cliente)
  {
    this.clienteReambientacion = cliente
  }

  Reambientar()
  {
    var req = {"id":this.clienteReambientacion._id}

    var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.AMBIENTAR_USUARIOS_URL;
    this.restService.put(endpoint,req).subscribe((data: {}) => 
    {
      this.SpinnerVisible = true;
        if(data)
        {
          var codigoResp = data["codigo"].split(".")[0]
          if(codigoResp == 200)
          {
            this.notifierService.notify( 'success', 'Se Re-ambientó correctamente.');
            this.loadClientes()
            this.SpinnerVisible = false;
          }
          else
          {
            this.notifierService.notify( 'error', 'El servicio no respondió correctamente');
            this.SpinnerVisible = false;
          }
        }
        else
        {
          this.notifierService.notify( 'error', 'Error en la respuesta del servicio ambienta usuarios');
          this.SpinnerVisible = false;
        }
        }, (err) => 
        {
          this.notifierService.notify( 'error', err.error.mensaje);
          this.SpinnerVisible = false;
        }
      
    );
  }



// Get the items checked
 deleteClientesArray=[];
  clientesCheckbox(item) {
    if (this.deleteClientesArray.find(x => x == item)) {
      this.deleteClientesArray.splice(this.deleteClientesArray.indexOf(item), 1)
    }
    else {
      this.deleteClientesArray.push(item);
    };
  };


  rowsClientesArray=[];
  clientesCheckboxRows(item) {
    if (this.rowsClientesArray.find(x => x == item)) {
      this.rowsClientesArray.splice(this.rowsClientesArray.indexOf(item), 1)
    }
    else {
      this.rowsClientesArray.push(item);
    }

    // console.log("clientesCheckboxRows =>", this.rowsClientesArray);
  };


  deleteAll() {

    for( var i =0 ; i < this.deleteClientesArray.length; i++){
    this.oAuthService.eliminarCliente(this.deleteClientesArray[i]).subscribe(
      res => {
        // console.log(res)
       console.log(res)

       this.clientesCheckboxRows(this.rowsClientesArray)

       var table = $('#listClientes').DataTable();  
      //  var row = table
      //  .row( $(that).parents('tr') )
      //  .remove()
      //  .draw();
      },
      err => {
        console.log("Incidencia al conectarse con el servidor OAUTH", err);
      }
    );

  };


  $(document).ready(function() {
    var rowsSelected = this.getElementsByClassName("selected");
    console.log("rowsSelected  length => ", rowsSelected.length);

  var myrows = rowsSelected.length; 
  console.log("myrows => ", myrows);


  for( var i = 0 ; i < myrows; i++){

    for( var i = 0 ; i < myrows; i++){

      console.log("rowsSelected => ",  rowsSelected[i]);

      if (rowsSelected[i] != null || rowsSelected[i] != undefined) {
        try {
          rowsSelected[i].remove();
        } catch (ex) {

          console.log("rowsSelected => ", rowsSelected[i]);
          console.log(`Error ${i}`, ex)
        }
      }

    }; // second one

  };//first one

  }); // document
  

  };


}
