import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private myBaseServerUrl = environment.serverUrl;

  constructor(public httpClient: HttpClient) { }

  getAddresses(userId){
    const myServerUrl = this.myBaseServerUrl+"api/address/getAllAddresses";
    return this.httpClient.post(myServerUrl,{userId});
  }

  addNewAddress(address){
    const myServerUrl = this.myBaseServerUrl+"api/address/addNewAddress";
    return this.httpClient.post(myServerUrl,address);
  }
  
  removeAddress(_id){
    const myServerUrl = this.myBaseServerUrl+"api/address/removeAddress";
    return this.httpClient.post(myServerUrl,{_id});
  }
}
