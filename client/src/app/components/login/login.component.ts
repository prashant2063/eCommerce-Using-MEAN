import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { matchPassword } from './match-passwords';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("",Validators.required),
    password: new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)])
  });

  registerForm = new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]),
    rePassword: new FormControl("",[Validators.required,Validators.minLength(8)])
  },{
    validators:matchPassword('password','rePassword')
  });
  constructor() { }

  ngOnInit(): void {
  }

  showLogin(){
    document.getElementById('registerTab').classList.remove("btn-primary")
    document.getElementById('loginTab').classList.add("btn-primary")
    document.getElementById('register').classList.replace("d-block","d-none")
    document.getElementById('login').classList.replace("d-none","d-block")
  }

  showRegister(){
    document.getElementById('loginTab').classList.remove("btn-primary")
    document.getElementById('registerTab').classList.add("btn-primary")
    document.getElementById('login').classList.replace("d-block","d-none")
    document.getElementById('register').classList.replace("d-none","d-block")
  }

  loginBtnClickEventHandler(){
    console.log(this.loginForm);
  }

  registerBtnClickEventHandler(){
    console.log(this.registerForm);
  }
}
