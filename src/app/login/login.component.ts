import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../domain/constants'
import { from } from 'rxjs';
import { RestClientService } from '../services/rest-client.service';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { environment } from './../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthenticateServiceService } from '../services/authenticate-service.service'
import { NotifierService } from 'angular-notifier';
import { OauthService } from '../shared/oauth/oauth.service';
'@angular/core';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginHTML: any;
  loginFormURL : any
  SpinnerVisible : boolean = false;
  numeroEmpleado : string;
  oAuthToken: any;
  validationMessage: boolean = false;

  constructor
  (
    private formBuilder: FormBuilder,
    private router:Router,
    private restService : RestClientService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private auth: AuthenticateServiceService,
    private notifierService: NotifierService,
    private oAuthService: OauthService
    
  ) 
  {

    //this.loginFormURL = this.doURL()
     // redirect to home if already logged in
     if (auth.isAuthenticated()) 
     { 
      this.router.navigate(['home']);
     }
  }

  ngOnInit() 
  {

    // GET OAUTH TOKEN git push origin test
    this.oAuthService.getToken()
      .subscribe(
        res => {
          // console.log(res)
          this.oAuthToken = JSON.stringify(res);
          return;
        },
        err => {
          console.log("Incidencia al conectarse con el servidor OAUTH", err);
        }
      );

      // this.oAuthService.Encrypt_File('Hola Banco azteca');



    this.loginForm = new FormGroup({
      numEmpleado : new FormControl('numEmpleado', [ Validators.required ])
    });

    
  }



  get numEmpleado() { return this.loginForm.get('numEmpleado'); }

  goToRegister()
  {
    this.router.navigate(['registro']);
  }

  doURL()
  {
    var url = environment.loginFormApp.domain+environment.loginFormApp.cveOauth+environment.loginFormApp.redirect
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get f() { return this.loginForm.controls; }

  login()
  {
    const token = JSON.parse(this.oAuthToken);
    console.log(token.access_token);

    if(this.loginForm.valid)
    {

      this.oAuthService.doLogin(this.numeroEmpleado).subscribe(
        res => {
          // console.log(res)
         console.log("res do login => ", res);

          const respuesta = JSON.stringify(res);
          console.log("respuesta =>", respuesta);
          const loginToken = JSON.parse(respuesta);
         
         console.log("loginToken =>", loginToken.Token);
     
        //  token = JSON.parse(this.oAuthToken);
         this.auth.loginWithNAM(this.numeroEmpleado, loginToken.Token);
         $('#closeModal').click();
         this.router.navigate(['home']);
         this.validationMessage = false;

        },
        err => {
              this.validationMessage = true;
          console.log("Incidencia al tratar de hacer login", err);
        }
      );

    
    }
  }
  
  loadLogin()
  {
    var url = environment.loginFormApp.domain+environment.loginFormApp.cveOauth+environment.loginFormApp.redirect
    
    this.restService.get(url).subscribe((data: {}) => {
      if(data)
      {
        if(data["status"] == 200)
        {
          alert(data["status"])
          var text = JSON.parse(data["error"])

          alert(JSON.stringify(text))
          $( "#formLogin" ).append( data["text"] );
        }
      }
      }, (err) => 
      {
        $( "#formLogin" ).append( err["error"].text );
        
      }
    );
  }

  /*
  Valida en el WS backend si el usuario ha sido habilitado para acceder al sistema ABC
  */
  validaAccesoLogin(username, token)
  {
      this.SpinnerVisible = true;
      var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.VALIDA_ACCESO_LOGIN;
      var jsonAuth = {"usuario": username}
      this.restService.post(endpoint, jsonAuth).subscribe((data: {}) => {
         
        if(data)
        {
            var codigoResp = data ? data["codigo"].split(".")[0] : 0
            if(codigoResp == 200)
            {
              this.SpinnerVisible = false;
              this.auth.login(token);
              this.router.navigate(['home']);
            }
            else
            {
              this.notifierService.notify( 'error', data["mensaje"] );
              this.SpinnerVisible = false;
            }
        }
        }, (err) => 
        {
          this.notifierService.notify( 'error',err.error.mensaje);
          this.SpinnerVisible = false;
        }
      );

  }

  onSubmit()
  {
    if (this.loginForm.invalid) 
    {
      return;
    }
    this.loading = true;
    this.router.navigate(['home']);
    //TODO. Autenticacion
  }


  closeModal(token)
  {
    window.top.location.href = window.parent.location+"?token="+token;
    $('#closeModal').click();
    //$('#exampleModal').modal('hide');  
    //window.location.replace("http://192.168.2.4:4200/home");
  }

}
