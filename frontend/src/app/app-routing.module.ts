import { PrincipalComponent } from './Components/principal/principal.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CardsComponent } from './components/cards/cards.component';
import { DatosEmisorComponent } from './components/datos-emisor/datos-emisor.component';
import { OlvidoPassComponent } from './components/olvido-password/olvido-pass.component';
import { PoliticasprivacidadComponent } from './components/politicasprivacidad/politicasprivacidad.component';
import { PinComponent } from './components/pin/pin.component';
import { PasswordComponent } from './components/password/password.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProvComponent } from './components/prov/prov.component';
import { ClienteVerComponent } from './components/cliente-ver/cliente-ver.component';
import { DatosEmisorProvComponent} from './components/datos-emisor-prov/datos-emisor-prov.component';
import { FactComponent } from './components/fact/fact.component';
import { CrearFactComponent } from './components/crear-fact/crear-fact.component';
import { DatosMiEmpresaComponent } from './components/datos-mi-empresa/datos-mi-empresa.component';



const routes: Routes = [
 {path: '', redirectTo:'/login', pathMatch:'full'},
 {path: 'registro',component:RegistroComponent},
 {path: 'login',component: LoginComponent},
 {path: 'cards', component: CardsComponent},
 {path: 'pin', component: PinComponent},
 {path: 'datos-emisor', component: DatosEmisorComponent},
 {path: 'recovery', component: OlvidoPassComponent},
 {path: 'politicas', component: PoliticasprivacidadComponent},
 {path: 'password', component: PasswordComponent},
 {path: 'principal',component: PrincipalComponent, canActivate:[AuthGuard]},
 {path: 'clientes',component: ClientesComponent, canActivate:[AuthGuard]},
 {path: 'prov', component: ProvComponent, canActivate:[AuthGuard]},
 {path: 'cliente-ver', component: ClienteVerComponent, canActivate:[AuthGuard]},
 {path: 'datos-emisor-prov', component: DatosEmisorProvComponent, canActivate:[AuthGuard]},
 {path: 'fact', component: FactComponent,canActivate:[AuthGuard]},
 {path: 'crear-fact', component: CrearFactComponent,canActivate:[AuthGuard]},
 {path: 'datos-mi-empresa', component: DatosMiEmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
