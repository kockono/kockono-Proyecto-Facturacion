import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usserLogged:User;
  constructor(public authService: AuthService) {  }
  
   dividirCadena(cadenaADividir) {

    let cadena = cadenaADividir.split("@");
    return cadena[0]
  }
  ngOnInit(): void {
    this.usserLogged= this.authService.getUserLoggedIn();
    this.usserLogged.email= this.dividirCadena(this.usserLogged.email)
  }
  

}
