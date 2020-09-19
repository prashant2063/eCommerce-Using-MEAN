import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private myBaseServerUrl = environment.serverUrl;
  cartItemsCount;

  constructor(public httpClient: HttpClient) { }

  addToCart(product){
    const myServerUrl = this.myBaseServerUrl+"api/cart/add";
    return this.httpClient.post(myServerUrl,product);
  }

  getItemsCount(userId){
    const myServerUrl = this.myBaseServerUrl+"api/cart/getItemsCount";
    this.httpClient.post(myServerUrl,{userId})
    .subscribe(
      (data)=>{
        this.cartItemsCount = data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  getCartItems(userId){
    const myServerUrl = this.myBaseServerUrl+"api/cart/getItems";
    return this.httpClient.post(myServerUrl,{userId});
  }

  removeItem(_id){
    const myServerUrl = this.myBaseServerUrl+"api/cart/removeItem";
    return this.httpClient.post(myServerUrl,{_id})
  }

  updateItem(_id, productCount){
    const myServerUrl = this.myBaseServerUrl+"api/cart/updateItem";
    return this.httpClient.post(myServerUrl,{_id, productCount})
  }
}
