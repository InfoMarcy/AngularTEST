import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Constants } from '../../domain/constants';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient) { }

private oAuth = "https://authns.desadsi.gs/nidp/oauth/nam/token?grant_type=password&client_id=780d3cde-a591-42fc-b225-212773a6956b&client_secret=1ymTZkQjBdx9K5lu6tavra_ilM0V4pc6TTiA3-LOy7wDIno5uG4nVaxgJcn46Fpl2UdloDWJippViN9lbgyqQw&username=41900&password=GrupoSalinas2019&acr=secure/name/password/uri"


  /** GET heroes from the server */
getToken () {
  return this.http.post(this.oAuth, null)
};


eliminarCliente (id) {
  var endpoint = Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.ELIMINAR_CLIENTE + '/'+id;
  console.log("Eliminar Cliente endpoint => ", endpoint);
  return this.http.delete(endpoint)
};



doLogin (numEmpleado) {
  var endpoint =  Constants.IP_SERVER_API + Constants.PORT_SERVER_API + Constants.VALIDA_ACCESO_LOGIN;
  return this.http.post(endpoint, { "usuario": numEmpleado });
};
}



