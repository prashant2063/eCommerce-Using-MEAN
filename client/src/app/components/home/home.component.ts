import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { ProductListingService } from 'src/app/services/product-listing/product-listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products;
  filter: any = {};

  constructor(public productListingService: ProductListingService) { 
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

  ngOnInit(): void {
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
}
