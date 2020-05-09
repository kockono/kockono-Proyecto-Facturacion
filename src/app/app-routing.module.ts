import { PrincipalComponent } from './Componentes/principal/principal.component';
import { LoginComponent } from './Componentes/login/login.component';
import { OlvidoComponent } from './Componentes/olvido/olvido.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { DatosComponent } from './Componentes/datos/datos.component';
import { DatosEmpresaComponent } from './Componentes/datos-empresa/datos-empresa.component';
import { DatosEmisorComponent } from './Componentes/datos-emisor/datos-emisor.component';
import { ReseptorComponent } from './Componentes/reseptor/reseptor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliticasprivacidadComponent } from './Componentes/politicasprivacidad/politicasprivacidad.component';
import { PinComponent } from './Componentes/pin/pin.component';
import { PasswordComponent } from './Componentes/password/password.component';
import { ConfiguracionComponent } from './Componentes/configuracion/configuracion.component';
import { ClientesComponent } from './Componentes/clientes/clientes.component';
import { ProveedoresComponent } from './Componentes/proveedores/proveedores.component';

const routes: Routes = [
 {path: '', redirectTo: '/login', pathMatch: 'full'},
 {path: 'registro', component: RegistroComponent},
 {path: 'login', component: LoginComponent},
 {path: 'olvido', component: OlvidoComponent},
 {path: 'principal', component: PrincipalComponent},
 {path: 'Datos', component: DatosComponent},
 {path: 'DatosEmpresa', component: DatosEmpresaComponent},
 {path: 'DatosEmisor', component: DatosEmisorComponent},
 {path: 'DatosReceptor', component: ReseptorComponent},
 {path: 'politicas', component: PoliticasprivacidadComponent},
 {path: 'pin', component: PinComponent},
 {path: 'nueva', component: PasswordComponent},
 {path: 'configuracion', component: ConfiguracionComponent},
 {path: 'clientes', component: ClientesComponent},
 {path: 'proveedores', component: ProveedoresComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
