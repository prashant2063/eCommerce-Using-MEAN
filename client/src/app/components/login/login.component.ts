import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

import { matchPassword } from './match-passwords';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)])
  });

  registerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]),
    rePassword: new FormControl("", [Validators.required, Validators.minLength(8)])
  }, {
    validators: matchPassword('password', 'rePassword')
  });
  constructor(public router: Router, public userService: UserService, public cartService: CartService) { }

  ngOnInit(): void {
  }

  showLogin() {
    document.getElementById('message').classList.replace("d-block","d-none");
    document.getElementById('registerTab').classList.remove("btn-primary")
    document.getElementById('loginTab').classList.add("btn-primary")
    document.getElementById('register').classList.replace("d-block", "d-none")
    document.getElementById('login').classList.replace("d-none", "d-block")
    this.loginForm.reset();
  }

  showRegister() {
    document.getElementById('message').classList.replace("d-block","d-none");
    document.getElementById('loginTab').classList.remove("btn-primary")
    document.getElementById('registerTab').classList.add("btn-primary")
    document.getElementById('login').classList.replace("d-block", "d-none")
    document.getElementById('register').classList.replace("d-none", "d-block")
    this.registerForm.reset()
  }

  loginBtnClickEventHandler() {
    let userCredentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.userService.doUserValidation(userCredentials)
      .subscribe(
        (data) => {
          if (data) {
            this.cartService.getItemsCount(data["_id"]);
            this.userService.setName(data["name"]);
            this.userService.setLogInStatus(true);
            this.userService.setUserId(data["_id"]);
            this.router.navigateByUrl("/");
            let user = {
              name: this.userService.getName(),
              userId: this.userService.getUserId()
            }
            localStorage.setItem('user', JSON.stringify(user)); 
          }
        },
        (err) => {
          if(err.status === 401){
            this.setMessage("You have entered incorrect credentials",-1);
          }
          else{
            this.setMessage("Something went wrong. Please try again later.",-1);
          }
        }
      )
  }

  registerBtnClickEventHandler() {
    let user = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.userService.registerUser(user)
      .subscribe(
        (data) => {
          if (data) {
            this.setMessage("You have registered successfully.",1);
          }
        },
        (err) => {
          if(err.status === 409){
            this.setMessage("User with similar email already exists",-1)
          }
          else{
            this.setMessage("Something went wrong. Please try again later.",-1);
          }
        }
      )
  }

  setMessage(msg,type) {
    let div = document.getElementById("message");
    div.innerHTML = "";
    let span = document.createElement("span");
    let textNode = document.createTextNode(msg);
    span.append(textNode);
    div.append(span);
    div.classList.replace("d-none","d-block")
    if(type==1){
      div.classList.remove("error");
      div.classList.add("success")
    }
    else{
      div.classList.remove("success");
      div.classList.add("error")
    }
  }
}