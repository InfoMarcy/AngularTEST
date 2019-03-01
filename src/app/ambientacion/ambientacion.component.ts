import { Component, OnInit, NgModule, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FlujoAmbientacion } from '../domain/flujo-ambientacion';
import { RestClientService } from '../services/rest-client.service';
import { Constants } from '../domain/constants';
import { NotifierService } from 'angular-notifier';
import { CaracteristicaFlujo } from '../domain/caracteristica-flujo';
import { Cliente } from '../domain/cliente';
import { DataClientesService } from '../services/data-clientes.service';
import { AmbientaUsuario } from '../domain/ambienta-usuario';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import { PersonalizaUsuarioComponent } from '../personaliza-usuario/personaliza-usuario.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ambientacion',
  templateUrl: './ambientacion.component.html',
  styleUrls: ['./ambientacion.component.css']
})

export class AmbientacionComponent implements OnInit {
  private personalizacion: PersonalizaUsuarioComponent


  constructor(
    private restService : RestClientService,
    private notifierService: NotifierService,
    private dataClienteService : DataClientesService ,
    private auth: AuthenticateServiceService,
    private router:Router,
    
  ) 
  {
    //this.cliente = new Cliente();
    this.personalizacion = new PersonalizaUsuarioComponent(this.dataClienteService);
  }

  flujos : Array<FlujoAmbientacion> = []
  caracteristicasBinding : Array<CaracteristicaFlujo> = []
  caracteristicasBD : Array<CaracteristicaFlujo> = []
  selected: number = 0;
  SpinnerFlujosVisible : boolean = true;
  personalizacionActivada : boolean = false;
  personalizacionExtra : boolean = false;
  numeroUsuario : number = 1;
  numeroUsuarioPersonalizacion : number;
  diferenciaExtraPersonalizacion : number = 0;
  clientes : Array<Cliente> = [];
  currentUser: string;
  nombre_usuario: string;

 SpinnerVisible : boolean = false;

  ngOnInit() 
  {
    this.loadFlujos();
    this.loadCaracteristicas();
    this.currentUser = this.auth.getUser("currentUser")
    this.nombre_usuario = this.auth.getUser("nombre")
  }
  
  loadFlujos()
  {

    var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.OBTENER_FLUJOS;
      this.restService.get(endpoint).subscribe((data: {}) => {
        
        var codigoResp = data["codigo"].split(".")[0]
        if(codigoResp == 200)
        {
          this.flujos = this.filtrarFlujos(data["Flujos"]);
          this.SpinnerFlujosVisible = false;
        }
        else
        {
          this.notifierService.notify( 'error', 'El servicio no respondió correctamente' );
          this.SpinnerFlujosVisible = false;
        }
      }, (err) => {
        this.notifierService.notify( 'error', 'Error en el servicio catálogo de flujos' );
        this.SpinnerFlujosVisible = false;
      }
      
      );
      
  }


  filtrarFlujos(flujos : Array<FlujoAmbientacion>)
  {
    return flujos.filter( (item) => item.status == true );
  }



  loadCaracteristicas()
  {
    var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.OBTENER_CARACTERISTICAS;
    this.restService.get(endpoint).subscribe((data: {}) => {
      
        var codigoResp = data["codigo"].split(".")[0]
        if(codigoResp == 200)
        {
          this.caracteristicasBD = data["Caracteristicas"];
          this.caracteristicasBinding = this.filtrarCaracteristicasPorFlujo(this.selected, this.caracteristicasBD)
        }
        else
        {
          this.notifierService.notify( 'error', 'El servicio no respondió correctamente' );
        }
      }, (err) => 
      {
        this.notifierService.notify( 'error', 'Error en el servicio catálogo de caracteristicas' );
      }
    );
  }


  filtrarCaracteristicasPorFlujo(flujo : number, caracteristicas : Array<CaracteristicaFlujo>) : Array<CaracteristicaFlujo>
  {
      var caracteristicasPorFlujo : Array<CaracteristicaFlujo> = [];
      caracteristicas.forEach(function (item)
      {
        if(item.status && item.flujosCompatibles.some( x=> x == flujo))
          caracteristicasPorFlujo.push(item)
      });

      return caracteristicasPorFlujo;
  }

  selectOption(idFlujo : number)
  {
    this.selected = idFlujo;
    this.caracteristicasBinding = this.filtrarCaracteristicasPorFlujo(this.selected, this.caracteristicasBD)
  }

  showCompPersonalizacion(eventPersonalizacion : any)
  {
    
    if(this.numeroUsuario == undefined || this.numeroUsuario <= 0)
    {
      //
      this.notifierService.notify( 'info', 'Ingrese un número de usuario válido' );
      this.personalizacionActivada = false;
      return false
    }
    
    if(this.personalizacionActivada)
    {
      this.numeroUsuarioPersonalizacion = this.numeroUsuario;
    }
  }


  printPersonalizacionExtra()
  {
    if(this.numeroUsuarioPersonalizacion > this.numeroUsuario)
    {
      this.numeroUsuario = this.numeroUsuarioPersonalizacion;
      this.personalizacionExtra = false;
    }
    else
    {
      this.diferenciaExtraPersonalizacion = this.numeroUsuario - this.numeroUsuarioPersonalizacion
     
      this.personalizacionExtra = true;
    }
  }

  getArrayClientes(clientes)
  {
    //alert(JSON.stringify(clientes))
    var clientesFinales = new Array<Cliente>();
    clientes.forEach(function (item)
    {
      var cantidad = item.cantidad 
      if( cantidad == 1 )
      {
        clientesFinales.push(item)
      }
      else
      {
        for(var x = 0; x < cantidad; x++)
        {
          //alert(x)
          var tmp = item
          tmp.cantidad = 1
          clientesFinales.push(tmp)
        }
      }
    });
    //alert(JSON.stringify(clientesFinales))
    return clientesFinales
    
  }


  

  ambientarUsuarios()
  {
    //construccion del objeto ambientacion
    var ambientacion = new AmbientaUsuario();
    ambientacion.usuarioLogin = this.auth.getUser("currentUser");
    ambientacion.numUsuarios = this.numeroUsuario;
    ambientacion.flujo = this.selected;
    ambientacion.caracteristicas = [];
    ambientacion.infoCliente = this.getArrayClientes(this.dataClienteService.getClientes());
    
    if(ambientacion.numUsuarios < 1)
    {
      this.notifierService.notify( 'error', 'Ingresa una cantidad de usuario válida');
      return
    }

    if(ambientacion.flujo == 0)
    {
      this.notifierService.notify( 'error', 'Elige un flujo');
      return
    }

    if( this.personalizacionActivada && ambientacion.infoCliente.length == 0)
    {
      this.notifierService.notify( 'error', 'Debe agregar al menos un usuario personalizado');
      return
    }
    
    //ambientar
    var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.AMBIENTAR_USUARIOS_URL;
    this.SpinnerVisible = true;
    console.log("endpoint => ", endpoint);
    console.log("ambientacion => ", ambientacion);
    var me  = this;
    this.restService.post(endpoint,ambientacion).subscribe((data: {}) => 
    {
     

        if(data)
        {
          var codigoResp = data["codigo"].split(".")[0]
          if(codigoResp == 200)
          {
            this.notifierService.notify( 'success', 'Se ambientaron correctamente.');
            this.personalizacion.cleanListClient();
            this.SpinnerVisible = false;
            this.router.navigate(['home']);

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

  

  logout()
  {
    this.auth.logout()
  }
}
