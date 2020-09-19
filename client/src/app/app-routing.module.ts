import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "contact", component: ContactUsComponent},
  {path: "about", component: AboutUsComponent},
  {path: "login", component: LoginComponent},
  {path: "cart", component: CartComponent},
  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
