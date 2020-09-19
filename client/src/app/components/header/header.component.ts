import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  itemsInCart: number;

  constructor(public userSerVice: UserService, public cartService: CartService, public router: Router) {}

  ngOnInit(): void {
    this.cartService.getItemsCount(this.userSerVice.getUserId());
  }

  logoutBtnClickEventHandler(){
    this.userSerVice.setUserId(null);
    this.userSerVice.setName(null);
    this.userSerVice.setLogInStatus(false);
    this.router.navigateByUrl("/")
  }
}
