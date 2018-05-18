import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { SocialLoginModule } from 'angular5-social-login';

import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { ProductQuantityComponent } from './shared/components/product-quantity/product-quantity.component';
import { AdminGuardService } from './admin/services/admin-guard.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    ShoppingCartComponent,
    ProductFilterComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckoutComponent , canActivate: [AuthGuardService]},
      { path: 'my/orders', component: MyOrdersComponent , canActivate: [AuthGuardService]},
      { path: 'order-success/:id', component: OrderSuccessComponent , canActivate: [AuthGuardService]},
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [
    AdminGuardService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
