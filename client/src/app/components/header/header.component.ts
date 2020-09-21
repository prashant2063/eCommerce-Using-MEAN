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

  constructor(public userService: UserService, public cartService: CartService, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user'));
      this.userService.setName(user['name']);
      this.userService.setUserId(user['userId']);
      this.userService.setLogInStatus(true);
    }
    if (this.userService.getLogInStatus()) {
      this.cartService.getItemsCount(this.userService.getUserId());
    }
  }

  logoutBtnClickEventHandler() {
    this.userService.setUserId(null);
    this.userService.setName(null);
    this.userService.setLogInStatus(false);
    localStorage.removeItem('user')
    this.router.navigateByUrl("/")
  }
}
