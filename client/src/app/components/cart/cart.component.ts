import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
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

  constructor(public userService: UserService, public cartService: CartService) { }

  ngOnInit(): void {
    this.totalPrice = 0;
    this.cartService.getCartItems(this.userService.getUserId())
      .subscribe(
        (data) => {
          this.cartItems = data;
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
}
