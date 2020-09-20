import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductListingService } from 'src/app/services/product-listing/product-listing.service';
import { UserService } from 'src/app/services/user/user.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products;
  filter: any = {};
  productDetails: any;
  productSpecifications;
  productCount: number;
  isAddedToCartSuccessfully: boolean;

  constructor(public productListingService: ProductListingService, public userService: UserService, public cartService: CartService, public router: Router) { }

  ngOnInit(): void {
    this.productListingService.fetchProducts(this.filter)
    .subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{
        console.log(err)
      }
    )
    this.productDetails = null;
    this.productCount=1;
    this.isAddedToCartSuccessfully = false;
  }

  ngDoCheck(): void {
    $('#product-details').on('hidden.bs.modal', function () {
      let carouselImages = document.getElementById('product-images').getElementsByClassName('carousel-item');
      for (let i = 0; i < carouselImages.length; i++) {
        let image = carouselImages[i];
        image.classList.remove("active");
      }
      document.getElementById('thumbnail').classList.add("active");
    });
  }

  applyFilter(){
    this.productListingService.fetchProducts(this.filter)
    .subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  displayProductDetails(product){
    this.isAddedToCartSuccessfully = false;
    this.productSpecifications = Object.keys(product['specifications']);
    this.productDetails = product;
    this.productCount = 1;
  }

  addToCartBtnClickEventHandler(){
    // console.log(this.userService.getLogInStatus())
    if(!this.userService.getLogInStatus()){
      $('#product-details').modal('hide');
      this.router.navigateByUrl("/login");
    }
    else{
      let product = {
        userId: this.userService.getUserId(),
        productId: this.productDetails['_id'],
        productCount: this.productCount
      }
      this.cartService.addToCart(product)
      .subscribe(
        (data)=>{
          this.isAddedToCartSuccessfully = true;
          this.cartService.getItemsCount(this.userService.getUserId());
        },
        (err)=>{
          if(err){
            console.log(err);
          }
        }
      )
    }
  }
}
