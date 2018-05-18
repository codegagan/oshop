import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminGuardService } from './services/admin-guard.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { DataTableModule } from 'angular5-data-table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent , canActivate: [AuthGuardService, AdminGuardService]},
      { path: 'admin/products/:id', component: ProductFormComponent , canActivate: [AuthGuardService, AdminGuardService]},
      { path: 'admin/products', component: AdminProductsComponent , canActivate: [AuthGuardService, AdminGuardService]},
      { path: 'admin/orders', component: AdminOrdersComponent , canActivate: [AuthGuardService, AdminGuardService]}
    ]),
    SharedModule,
  ],
  declarations: [AdminOrdersComponent, AdminProductsComponent, ProductFormComponent],
  providers: [AdminGuardService]
})
export class AdminModule { }
