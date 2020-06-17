// Librerias
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material'

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { CardsComponent } from './components/cards/cards.component';
import { DatosMiEmpresaComponent } from './components/datos-mi-empresa/datos-mi-empresa.component';
import { BarraComponent } from './shared/barra/barra.component';
import { PoliticasprivacidadComponent } from './components/politicas-privacidad/politicasprivacidad.component';
import { DatosEmisorComponent } from './components/datos-clientes/datos-emisor.component';
import { OlvidoPassComponent } from './components/olvido-password/olvido-pass.component';
import { PinComponent } from './components/pin/pin.component';
import { PasswordComponent } from './components/password/password.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProvComponent } from './components/provedores/prov.component';
import { DatosEmisorProvComponent } from './components/crear-provedor/datos-emisor-prov.component';
import { FactComponent } from './components/facturas/fact.component';
import { CrearFactComponent } from './components/crear-fact/crear-fact.component';
import { ArticulosYServiciosComponent } from './components/articulos-y-servicios/articulos-y-servicios.component';
import { CrearArticulosYServiciosComponent } from './components/crear-articulos-y-servicios/crear-articulos-y-servicios.component';
import { ReportesComponent } from './components/reportes/reportes.component';


// Seguridad
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';


//Filtros
import { FilterPipe } from './pipes/filter.pipe';

//Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { ReportesArticulosComponent } from './components/reportes/reportes-articulos/reportes-articulos.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
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
    DatosEmisorProvComponent,
    FactComponent,
    CrearFactComponent,
    FilterPipe,
    DatosMiEmpresaComponent,
    ArticulosYServiciosComponent,
    CrearArticulosYServiciosComponent,
    ReportesComponent,
    ReportesArticulosComponent,

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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule
    
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
