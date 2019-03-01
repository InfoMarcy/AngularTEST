// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth :
  {
    clientID: "",
    domain : "",
    audience : "",
    redirect : "",
    scope: ""
  },
  loginFormApp:
  {
    cveOauth : "~3$}W>qT8hX),2MV",
    domain : "https://10.51.58.238:3080/banca_digital/v1/login?code=",
    redirect : "&redirectURL=http://10.51.58.237:4200/login?cb"
  }
};

//https://10.51.58.238:3080/banca_digital/v1/login?code=~3$}W>qT8hX),2MV&redirectURL=http://192.168.2.4:4200/login?cb
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
