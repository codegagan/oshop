import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('122380041958566')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1010054408299-n26dt2ae2l55053ppcih5qj4dkt8tvca.apps.googleusercontent.com')
        },
      ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    SocialLoginModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckoutComponent },
      { path: 'my/orders', component: MyOrdersComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin/products', component: AdminProductsComponent },
      { path: 'admin/orders', component: AdminOrdersComponent }
    ])
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
