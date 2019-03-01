import { Component, OnInit,Input } from '@angular/core';
import { AuthenticateServiceService } from '../services/authenticate-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  @Input() nombre_usuario: string; 

  constructor(
    private auth: AuthenticateServiceService
  ) { }

  ngOnInit() {
  }

  logout()
  {
    // this.auth.logout()
    this.auth.logoutWithNAM();
  }

}
