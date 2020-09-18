import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myBaseServerUrl = environment.serverUrl;
  private name: string;
  private isLoggedIn: boolean;

  constructor(public httpClient: HttpClient, public router: Router) {
    this.name = "";
    this.isLoggedIn = false;
  }

  getName(){
    return this.name;
  }

  getLogInStatus(){
    return this.isLoggedIn;
  }

  getMyBaseServerUrl(){
    return this.myBaseServerUrl;
  }

  setName(name){
    this.name = name;
  }

  setLogInStatus(isLoggedIn){
    this.isLoggedIn = isLoggedIn;
  }

  doUserValidation(userCredentials){
    const myServerUrl = this.myBaseServerUrl+"api/user/login";
    return this.httpClient.post(myServerUrl,userCredentials);
  }

  registerUser(user){
    const myServerUrl = this.myBaseServerUrl+"api/user/register";
    return this.httpClient.post(myServerUrl,user);
  }
}
