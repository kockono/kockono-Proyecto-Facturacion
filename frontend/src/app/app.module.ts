import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormularioComponent } from './components/formulario/formulario.component';

import { TokenInterceptorService } from './services/token-interceptor.service';

// Seguridad
import { AuthGuard } from './auth.guard';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DatosEmpresaComponent } from './components/datos-empresa/datos-empresa.component';
import { BarraComponent } from './shared/barra/barra.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    SignupComponent,
    FormularioComponent,
    NavbarComponent,
    DatosEmpresaComponent,
    BarraComponent

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
