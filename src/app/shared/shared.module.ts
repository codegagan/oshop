import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angular5-social-login';

import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
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
    CommonModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    SocialLoginModule
  ],
  declarations: [ProductQuantityComponent],
  exports: [ProductQuantityComponent, CommonModule, ReactiveFormsModule, NgbModule.forRoot().ngModule, SocialLoginModule],
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
