import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { CardsComponent } from './components/cards/cards.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


// Seguridad
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { BarraComponent } from './shared/barra/barra.component';
import { PoliticasprivacidadComponent } from './components/politicasprivacidad/politicasprivacidad.component';
import { DatosEmisorComponent } from './components/datos-emisor/datos-emisor.component';
import { OlvidoPassComponent } from './components/olvido-password/olvido-pass.component';
import { PinComponent } from './components/pin/pin.component';
import { PasswordComponent } from './components/password/password.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProvComponent } from './components/prov/prov.component';
import { ClienteVerComponent } from './components/cliente-ver/cliente-ver.component';
import { DatosEmisorProvComponent } from './components/datos-emisor-prov/datos-emisor-prov.component';
import { FactComponent } from './components/fact/fact.component';
import { CrearFactComponent } from './components/crear-fact/crear-fact.component';
import { FilterPipe } from './pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { DatosMiEmpresaComponent } from './components/datos-mi-empresa/datos-mi-empresa.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    NavbarComponent,
    BarraComponent,
    CardsComponent,
    PoliticasprivacidadComponent,
    DatosEmisorComponent,
    OlvidoPassComponent,
    PinComponent,
    PasswordComponent,
    SidebarComponent,
    ClientesComponent,
    ProvComponent,
    ClienteVerComponent,
    DatosEmisorProvComponent,
    FactComponent,
    CrearFactComponent,
    FilterPipe,
    DatosMiEmpresaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
