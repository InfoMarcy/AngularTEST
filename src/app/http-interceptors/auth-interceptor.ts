import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';



@Injectable()
export class AuthInterceptor implements HttpInterceptor 
{
 
    headerNombreCompleto : string
    constructor() {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
    
        this.headerNombreCompleto = req.headers.get('User-Agent')
        //alert("headerNombreCompleto = " +this.headerNombreCompleto)
    
        // send cloned request with header to the next handler.
        return next.handle(req);
    }

}