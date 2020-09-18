import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductListingService {
  private myBaseServerUrl = environment.serverUrl;

  constructor(public httpClient: HttpClient) { }

  fetchProducts(filter){
    const myServerUrl = this.myBaseServerUrl+"api/products";
    return this.httpClient.post(myServerUrl,filter);
  }
}
