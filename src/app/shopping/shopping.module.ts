import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckoutComponent , canActivate: [AuthGuardService]},
      { path: 'my/orders', component: MyOrdersComponent , canActivate: [AuthGuardService]},
      { path: 'order-success/:id', component: OrderSuccessComponent , canActivate: [AuthGuardService]}
    ]
    )
  ],
  declarations: [
    ProductsComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartComponent,
    ProductFilterComponent,
    OrderSummaryComponent]
})
export class ShoppingModule { }
