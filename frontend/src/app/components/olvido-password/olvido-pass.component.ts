import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-olvido-pass',
  templateUrl: './olvido-pass.component.html',
  styleUrls: ['./olvido-pass.component.css']
})
export class OlvidoPassComponent implements OnInit {

  recovery = {
    password: '',
    password2: ''
  }

  constructor() { }

  recover(){

  }

  ngOnInit() {
  }

}
