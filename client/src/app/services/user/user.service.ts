import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myBaseServerUrl = environment.serverUrl;
  private name: string;
  private isLoggedIn: boolean;
  private userId: string;

  constructor(public httpClient: HttpClient) {
    this.userId = "5f63518d63987561964752ac",
    this.name = "Admin";
    this.isLoggedIn = true;
  }

  getUserId(){
    return this.userId;
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

  setUserId(id){
    this.userId = id;
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
