import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateServiceService } from '../services/authenticate-service.service'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticateServiceService,
  ) {

    this.activatedRoute.queryParams.subscribe(params => 
    {
        let token = params['cb'];
        if(token)
        {
          var username = this.auth.preLogin(token);
          //this.validaAccesoLogin(username, tmpTkn)
        }
    });
  }

  ngOnInit() {
  }

}
