import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formData: any = {};
  isVisible: boolean;

  constructor() {
    this.formData.issue = "";
    this.isVisible = false;
  }

  ngOnInit(): void {
  }

  submitContactRequest() {
    this.isVisible = true;
  }
}
