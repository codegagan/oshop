import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthServiceConfig, GoogleLoginProvider } from 'angular5-social-login';

import { OrderService } from './services/order.service';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

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
  imports: [
    CommonModule
  ],
  declarations: [ProductQuantityComponent],
  exports: [ProductQuantityComponent],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService]
})
export class SharedModule { }
