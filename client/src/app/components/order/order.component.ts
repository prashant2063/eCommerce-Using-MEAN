import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders;

  constructor(public orderService: OrderService, public userService: UserService) { }

  ngOnInit(): void {
    this.orderService.getOrders(this.userService.getUserId())
    .subscribe(
      (data)=>{
        console.log(data)
        this.orders = data;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
