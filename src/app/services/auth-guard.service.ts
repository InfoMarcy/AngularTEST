import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticateServiceService } from './authenticate-service.service'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor
  (
    public auth: AuthenticateServiceService, public router: Router
  ) 
  { }

  
  canActivate(): boolean
  {
    if( !this.auth.isAuthenticated() )
    {
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
  
/*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    setTimeout(()=>{ //timer trick
      if(!this.auth.isAuthenticated()){ 
        this.router.navigate(['']); //home page, usually logged out state
        return false;
      }else{
       this.router.navigate(['home']); //redirect to your after loggedin page
       return true
      } 
    },500) //default 500 works fine, but experiment with 600, 700, 800. lower than 500 was not stable, sometimes kicks you to home page.
  return true;
  }
*/
}
