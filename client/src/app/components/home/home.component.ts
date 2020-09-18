import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public productListingService: ProductListingService, public userService: UserService, public router: Router) { 
    this.productListingService.fetchProducts(this.filter)
    .subscribe(
      (data)=>{
        this.products = data;
      },
      (err)=>{
        console.log(err)
      }
    )
    this.productDetails = null
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    $('#product-details').on('hide.bs.modal', function () {
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
    this.productSpecifications = Object.keys(product['specifications']);
    this.productDetails = product;
  }

  addToCartBtnClickEventHandler(){
    // console.log(this.userService.getLogInStatus())
    if(!this.userService.getLogInStatus()){
      $('#product-details').modal('hide');
      this.router.navigateByUrl("/login");
    }
  }

}
