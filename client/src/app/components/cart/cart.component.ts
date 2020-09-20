import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems;
  totalPrice: number;
  gst: number;
  newAddress: any = {};
  addresses;
  selectedAddress;
  modeOfPayment;

  constructor(public userService: UserService, public cartService: CartService, public addressService: AddressService, public orderService: OrderService, public router: Router) { }

  ngOnInit(): void {
    this.totalPrice = 0;
    this.cartService.getCartItems(this.userService.getUserId())
      .subscribe(
        (data) => {
          this.cartItems = data;
          // console.log(data);
          for (let item of this.cartItems) {
            let price = item['productDetails']['price'] as number;
            let quantity = item['productCount'] as number
            this.totalPrice += price * quantity;
          }
        },
        (err) => {
          console.log(err);
        }
      )
    this.gst = 0.18;
    this.selectedAddress = null;
    this.modeOfPayment = null;
  }

  removeItemFromCart(_id) {
    this.cartService.removeItem(_id)
      .subscribe(
        (data) => {
          this.cartItems = this.cartItems.filter(item => {
            if (item['_id'] != _id)
              return true
            else {
              this.totalPrice -= item['productDetails']['price'];
            }
          });
          this.cartService.getItemsCount(this.userService.getUserId());
        },
        (err) => {
          console.log(err);
        }
      )
  }

  updateProductCount(_id, value) {
    if (!isNaN(value) && value > 0) {
      this.cartService.updateItem(_id, value)
        .subscribe(
          (data) => {
            this.cartItems.find(item=>{
              if(item['_id'] == _id){
                this.totalPrice -= item['productDetails']['price']*item['productCount']
                item['productCount'] = parseInt(value)
                this.totalPrice += item['productDetails']['price']*item['productCount']
              }
            })
            $('.toast').toast({
              animation: true,
              delay: 1000
            });
            $('.toast').toast('show');
          },
          (err) => {
            console.log(err);
          }
        )
    }
  }

  addNewAddress(){
    if(!this.newAddress['addressLine2']){
      this.newAddress['addressLine2'] = "";
    }
    let address = {
      userId: this.userService.getUserId(),
      name: this.newAddress['name'],
      phone: this.newAddress['phone'],
      address: this.newAddress['addressLine1'] + " " + this.newAddress['addressLine2'],
      pin: this.newAddress['pin']
    }
    this.addressService.addNewAddress(address)
    .subscribe(
      (data)=>{
        this.addresses.push(data);
        console.log(data)
        $('#new-address').modal('hide');
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  getAddresses(){
    this.addressService.getAddresses(this.userService.getUserId())
    .subscribe(
      (data)=>{
        this.addresses = data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  removeAddress(_id){
    this.addressService.removeAddress(_id)
    .subscribe(
      (data)=>{
        this.addresses = this.addresses.filter(address => address['_id']!=_id);
        this.selectedAddress = null;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  placeOrder(){
    let orders = [];
    for(let item of this.cartItems){
      let order = {
        userId: this.userService.getUserId(),
        productId: item['productDetails']['_id'],
        productCount: item['productCount'],
        address: {
          name: this.selectedAddress['name'],
          phone: this.selectedAddress['phone'],
          address: this.selectedAddress['address'],
          pin: this.selectedAddress['pin']
        },
        price: item['productDetails']['price'] * (1+this.gst),
        modeOfPayment: this.modeOfPayment,
        timestamp: Date.now()
      }
      orders.push(order);
    }
    this.orderService.placeOrder(orders)
    .subscribe(
      (data)=>{
        this.cartService.getItemsCount(this.userService.getUserId());
        this.router.navigateByUrl("/")
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
