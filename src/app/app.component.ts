import { Component } from '@angular/core';
import { User } from './domain/user';
import { Router } from '@angular/router';
import { AuthenticateServiceService } from './services/authenticate-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AmbientacionUsuarios';
  SpinnerGlobalVisible = true;
  currentUser: string;

  constructor
  (
      private router: Router,
      private auth: AuthenticateServiceService
  )
  {
    this.currentUser = localStorage.getItem("currentUser")
  }


  logout()
  {
    this.auth.logout()
  }

}


