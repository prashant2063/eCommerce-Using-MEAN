import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userSerVice: UserService) { }

  ngOnInit(): void {
  }

  logoutBtnClickEventHandler(){
    this.userSerVice.setName("");
    this.userSerVice.setLogInStatus(false);
  }
}
