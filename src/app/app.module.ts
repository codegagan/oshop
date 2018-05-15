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
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminGuardService } from './services/admin-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import {DataTableModule} from 'angular5-data-table';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        // {
        //   id: FacebookLoginProvider.PROVIDER_ID,
        //   provider: new FacebookLoginProvider('122380041958566')
        // },
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
    ShoppingCartComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckoutComponent , canActivate: [AuthGuardService]},
      { path: 'my/orders', component: MyOrdersComponent , canActivate: [AuthGuardService]},
      { path: 'order-success', component: OrderSuccessComponent , canActivate: [AuthGuardService]},
      { path: 'login', component: LoginComponent },
      { path: 'admin/products/new', component: ProductFormComponent , canActivate: [AuthGuardService, AdminGuardService]},
      { path: 'admin/products/:id', component: ProductFormComponent , canActivate: [AuthGuardService, AdminGuardService]},
      { path: 'admin/products', component: AdminProductsComponent , canActivate: [AuthGuardService, AdminGuardService]},
      { path: 'admin/orders', component: AdminOrdersComponent , canActivate: [AuthGuardService, AdminGuardService]}
    ])
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },
  AuthGuardService,
  UserService,
  AdminGuardService,
  CategoryService,
  ProductService,
  ShoppingCartService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
