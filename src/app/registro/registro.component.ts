import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import { Constants } from '../domain/constants';
import { RestClientService } from '../services/rest-client.service';
import { Router } from '@angular/router';
import { User } from '../domain/user'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  SpinnerVisible : boolean = false;

  constructor
  (
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticateServiceService,
    private restService : RestClientService,
    private router:Router,
    private notifierService: NotifierService,
  ) 
  {
    
  }

  ngOnInit() 
  {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('username',[Validators.required, Validators.min(100)]),
      correo: new FormControl('correo',[Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
    });
    this.user = new User();
  }

  
  get username() { return this.registerForm.get('username'); }
  get correo() { return this.registerForm.get('correo'); }


  registrar()
  {
    if(this.registerForm.valid)
    {
      this.SpinnerVisible = true;
      var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.REGISTRO;
      
      this.restService.post(endpoint, this.user).subscribe((data: {}) => {
         
        if(data)
        {
            var codigoResp = data ? data["codigo"].split(".")[0] : 0
            if(codigoResp == 200)
            {
              this.SpinnerVisible = false;
              this.router.navigate(['login']);
              
            }
            else
            {
              this.notifierService.notify( 'error', 'Error en el servicio de autenticación no respondió correctamente' );
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
    
  }

}
