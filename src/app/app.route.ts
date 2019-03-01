import { RouterModule, Routes, CanActivate } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AmbientacionComponent } from './ambientacion/ambientacion.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NAMComponent } from './shared/components/nam/nam.component';

export const router: Routes = [
    //routes for anonimous users

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent , canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'ambientacion', component: AmbientacionComponent , canActivate: [AuthGuardService]},
    // { path: 'nam', component: NAMComponent }
  
];

export const routes: ModuleWithProviders  = RouterModule.forRoot(router);