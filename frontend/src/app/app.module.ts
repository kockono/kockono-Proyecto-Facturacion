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
import { FormularioComponent } from './components/formulario/formulario.component';
import { CardsComponent } from './components/cards/cards.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


// Seguridad
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { DatosEmpresaComponent } from './components/datos-empresa/datos-empresa.component';
import { BarraComponent } from './shared/barra/barra.component';
import { PoliticasprivacidadComponent } from './components/politicasprivacidad/politicasprivacidad.component';
import { DatosComponent } from './components/datos/datos.component';
import { DatosEmisorComponent } from './components/datos-emisor/datos-emisor.component';
import { OlvidoPassComponent } from './components/olvido-password/olvido-pass.component';
import { ReceptorComponent } from './components/receptor/receptor.component';
import { PinComponent } from './components/pin/pin.component';
import { PasswordComponent } from './components/password/password.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProvComponent } from './components/prov/prov.component';
import { ClienteVerComponent } from './components/cliente-ver/cliente-ver.component';
import { DatosEmisorProvComponent } from './components/datos-emisor-prov/datos-emisor-prov.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    FormularioComponent,
    NavbarComponent,
    DatosEmpresaComponent,
    BarraComponent,
    CardsComponent,
    PoliticasprivacidadComponent,
    DatosComponent,
    DatosEmisorComponent,
    OlvidoPassComponent,
    ReceptorComponent,
    PinComponent,
    PasswordComponent,
    SidebarComponent,
    ClientesComponent,
    ProvComponent,
    ClienteVerComponent,
    DatosEmisorProvComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
