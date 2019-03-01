import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent  } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { routes } from './app.route';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import "reflect-metadata";
import { AmbientacionComponent } from './ambientacion/ambientacion.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PersonalizaUsuarioComponent } from './personaliza-usuario/personaliza-usuario.component';
import { AlertModule } from 'ngx-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgDatepickerModule } from 'ng2-datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DataTablesModule } from 'angular-datatables';
import { RegistroComponent } from './registro/registro.component';
import { JwtModule , JwtModuleOptions} from '@auth0/angular-jwt'
import { AuthGuardService } from './services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import {APP_BASE_HREF} from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { OauthService } from './shared/oauth/oauth.service';
import { NAMComponent } from './shared/components/nam/nam.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: ['localhost:4200/login']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    LoginComponent,
    DashboardComponent,
    AmbientacionComponent,
    PersonalizaUsuarioComponent,
    RegistroComponent,
    LogoutComponent,
    NAMComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routes,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatSliderModule,
    BrowserAnimationsModule,
    NotifierModule,
    FormsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    MatDatepickerModule,
    NgDatepickerModule,
    NgbModule,
    MatProgressSpinnerModule,
    DataTablesModule,
    JwtModule.forRoot(JWT_Module_Options)
    
  ], //AuthGuardService
  providers: [
    OauthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },AuthGuardService,
    {provide: APP_BASE_HREF, useValue: '/abc/'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
