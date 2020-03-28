import { PrincipalComponent } from './Components/principal/principal.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
 {path:'',redirectTo:'/login',pathMatch:'full'},
 {path:'registro',component:RegistroComponent},
 {path:'login',component: LoginComponent},
 {path:'principal',component: PrincipalComponent},
 {path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
