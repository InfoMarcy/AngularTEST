import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../domain/user'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {


  constructor
  (
    public jwtHelper: JwtHelperService,
    public router: Router
  ) 
  { 
  }

  login(token: string) 
  {
      localStorage.clear()
      localStorage.setItem('token', token);
      const decodedToken = this.jwtHelper.decodeToken(token)
      var user = decodedToken["_username"];
      localStorage.setItem('currentUser', user);
      
  }

  getUser(key : string)
  {
    return localStorage.getItem(key)
  }

  logout() 
  {
      // remove user from local storage to log user out
      localStorage.clear()
      this.router.navigate(['login'])
  }

  loginWithNAM(numero_empleado: string, token: string)
  {
      localStorage.clear()
      localStorage.setItem('currentUser', numero_empleado);
      localStorage.setItem('token', token);
      // localStorage.setItem('token',this.buildJWT(numero_empleado));
  }

  buildJWT(currentUser : string)
  {
    const token = jwt.sign({ _username: currentUser }, "secret",{ expiresIn: 300 })
    return token;
  }

  logoutWithNAM()
  {
    localStorage.clear()
    window.location.assign('https://namns.desadsi.gs/AGLogout');
  }

  preLogin(token: string) 
  {
      localStorage.clear()
      const decodedToken = this.jwtHelper.decodeToken(token)
      var user = decodedToken["_username"];
      
      return user;
  }

  isAuthenticated() : boolean
  {
    const token = localStorage.getItem("token");
    if(token == null)
      return false;

    return !this.jwtHelper.isTokenExpired(token);
  }

}
