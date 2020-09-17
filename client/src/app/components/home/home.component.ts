import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<number>;
  filter: any = {};

  constructor() { 
    this.products = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  }

  ngOnInit(): void {
  }

  applyFilter(){
    console.log("filered")
  }
}
