import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user/user.service';
import { ProductListingService } from './services/product-listing/product-listing.service';
import { CartService } from './services/cart/cart.service';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { CartComponent } from './components/cart/cart.component';
import { LimitPipe } from './pipes/limit/limit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    LoginComponent,
    EllipsisPipe,
    CartComponent,
    LimitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,    
    ProductListingService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
