import { PrincipalComponent } from './Components/principal/principal.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CardsComponent } from './components/cards/cards.component';
import { DatosEmisorComponent } from './components/datos-clientes/datos-emisor.component';
import { OlvidoPassComponent } from './components/olvido-password/olvido-pass.component';
import { PoliticasprivacidadComponent } from './components/politicas-privacidad/politicasprivacidad.component';
import { PinComponent } from './components/pin/pin.component';
import { PasswordComponent } from './components/password/password.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProvComponent } from './components/provedores/prov.component';
import { DatosEmisorProvComponent} from './components/crear-provedor/datos-emisor-prov.component';
import { FactComponent } from './components/facturas/fact.component';
import { CrearFactComponent } from './components/crear-fact/crear-fact.component';
import { DatosMiEmpresaComponent } from './components/datos-mi-empresa/datos-mi-empresa.component';
import { ArticulosYServiciosComponent } from './components/articulos-y-servicios/articulos-y-servicios.component';
import { CrearArticulosYServiciosComponent } from './components/crear-articulos-y-servicios/crear-articulos-y-servicios.component';



const routes: Routes = [
 {path: '', redirectTo:'/login', pathMatch:'full'},
 {path: 'registro',component:RegistroComponent},
 {path: 'login',component: LoginComponent},
 {path: 'cards', component: CardsComponent},
 {path: 'pin', component: PinComponent},
 {path: 'datos-emisor', component: DatosEmisorComponent,canActivate:[AuthGuard]},
 {path: 'recovery', component: OlvidoPassComponent},
 {path: 'politicas', component: PoliticasprivacidadComponent},
 {path: 'password', component: PasswordComponent},
 {path: 'principal',component: PrincipalComponent, canActivate:[AuthGuard]},
 {path: 'clientes',component: ClientesComponent, canActivate:[AuthGuard]},
 {path: 'prov', component: ProvComponent, canActivate:[AuthGuard]},
 {path: 'datos-emisor-prov', component: DatosEmisorProvComponent, canActivate:[AuthGuard]},
 {path: 'fact', component: FactComponent,canActivate:[AuthGuard]},
 {path: 'crear-fact', component: CrearFactComponent,canActivate:[AuthGuard]},
 {path: 'datos-mi-empresa', component: DatosMiEmpresaComponent, canActivate:[AuthGuard]},
 {path: 'articulos-y-servicios', component: ArticulosYServiciosComponent, canActivate:[AuthGuard]},
 {path: 'crear-articulos-y-servicios', component: CrearArticulosYServiciosComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
