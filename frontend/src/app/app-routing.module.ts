import { PrincipalComponent } from './Components/principal/principal.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { AuthGuard } from './auth.guard';
import { DatosEmpresaComponent } from './components/datos-empresa/datos-empresa.component';
import { CardsComponent } from './components/cards/cards.component';
import { DatosEmisorComponent } from './components/datos-emisor/datos-emisor.component';
import { OlvidoPassComponent } from './components/olvido-password/olvido-pass.component';
import { PoliticasprivacidadComponent } from './components/politicasprivacidad/politicasprivacidad.component';
import { ReceptorComponent } from './components/receptor/receptor.component';
import { PinComponent } from './components/pin/pin.component';
import { PasswordComponent } from './components/password/password.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
 {path: '', redirectTo:'/login', pathMatch:'full'},
 {path: 'registro',component:RegistroComponent},
 {path: 'login',component: LoginComponent},
 {path: 'cards', component: CardsComponent},
 {path: 'pin', component: PinComponent},
 {path: 'datos-emisor', component: DatosEmisorComponent},
 {path: 'recovery', component: OlvidoPassComponent},
 {path: 'politicas', component: PoliticasprivacidadComponent},
 {path: 'receptor', component: ReceptorComponent},
 {path: 'password', component: PasswordComponent},
 {path: 'principal',component: PrincipalComponent, canActivate:[AuthGuard]},
 {path: 'clientes',component: ClientesComponent, canActivate:[AuthGuard]},
 {path: 'formulario', component: FormularioComponent, canActivate:[AuthGuard]},
 {path: 'datos-empresa', component: DatosEmpresaComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
