import { PrincipalComponent } from './Components/principal/principal.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
 {path: '', redirectTo:'/login', pathMatch:'full'},
 {path:'registro',component:RegistroComponent},
 {path:'login',component: LoginComponent},
 {path:'principal',component: PrincipalComponent, canActivate:[AuthGuard]},
 {path:'signup', component: SignupComponent},
 {path:'formulario', component: FormularioComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
