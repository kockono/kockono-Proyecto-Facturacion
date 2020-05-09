import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { DatosEmpresaComponent } from './Componentes/datos-empresa/datos-empresa.component';
import { BarraComponent } from './Componentes/barra/barra.component';
import { OlvidoComponent } from './Componentes/olvido/olvido.component';
import { DatosEmisorComponent } from './Componentes/datos-emisor/datos-emisor.component';
import { CardsComponent } from './Componentes/cards/cards.component';
import { PoliticasprivacidadComponent } from './Componentes/politicasprivacidad/politicasprivacidad.component';
import { ReseptorComponent } from './Componentes/reseptor/reseptor.component';
import { DatosComponent } from './Componentes/datos/datos.component';
import { PinComponent } from './Componentes/pin/pin.component';
import { PasswordComponent } from './Componentes/password/password.component';
import { ConfiguracionComponent } from './Componentes/configuracion/configuracion.component';
import { SidebarComponent } from './Componentes/sidebar/sidebar.component';
import { ClientesComponent } from './Componentes/clientes/clientes.component';
import { ProveedoresComponent } from './Componentes/proveedores/proveedores.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    DatosEmpresaComponent,
    BarraComponent,
    OlvidoComponent,
    DatosEmisorComponent,
    CardsComponent,
    PoliticasprivacidadComponent,
    ReseptorComponent,
    DatosComponent,
    PinComponent,
    PasswordComponent,
    ConfiguracionComponent,
    SidebarComponent,
    ClientesComponent,
    ProveedoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
