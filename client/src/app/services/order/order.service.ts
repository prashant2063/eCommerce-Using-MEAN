import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private myBaseServerUrl = environment.serverUrl;

  constructor(public httpClient: HttpClient) { }

  placeOrder(orders){
    const myServerUrl = this.myBaseServerUrl+"api/order/placeOrder";
    return this.httpClient.post(myServerUrl,orders);
  }

  getOrders(userId){
    const myServerUrl = this.myBaseServerUrl+"api/order/getOrders";
    return this.httpClient.post(myServerUrl,{userId});
  }
}
