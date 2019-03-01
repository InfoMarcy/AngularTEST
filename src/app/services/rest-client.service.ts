import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AmbientaUsuario } from '../domain/ambienta-usuario';
import { Http, Headers, RequestOptions, Response,  RequestMethod } from '@angular/http';

let headers = new HttpHeaders({
        'Content-Type':  'application/json'
      })


      /*
httpsAgent: new https.Agent({ 

rejectUnauthorized: false

})
      */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization-Code': '~3$}W>qT8hX),2MV'
  })
  // rejectUnauthorized: false
};


// clone request and replace 'http://' with 'https://' at the same time
// const secureReq = req.clone({
//   url: req.url.replace('http://', 'https://')
//   });
//   // send the cloned, "secure" request to the next handler.
//   return next.handle(secureReq);



@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(private http: HttpClient) { }

  post(endpoint : string, request: Object) : Observable<Object>
  {
    console.log("Request : "+JSON.stringify(request))

    return this.http.post(endpoint, request, httpOptions).pipe
    (
      tap( (request: Object) => console.log("Post OK") )
    )
  }

  put(endpoint : string, request: Object) : Observable<Object>
  {
    console.log("Request : "+JSON.stringify(request))

    return this.http.put(endpoint, request, httpOptions).pipe
    (
      tap( (request: Object) => console.log("Put OK") )
    )
  }

  

  get(endpoint : string) : Observable<Object>
  {
    return this.http.get(endpoint)
      .pipe(
        map(this.extractData)
      )
  }

  getFront(endpoint : string) : Observable<Object>
  {
    return this.http.get(endpoint, httpOptions)
      .pipe(
        map(this.extractData)
      )
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError<T> (operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => 
    {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }




}
