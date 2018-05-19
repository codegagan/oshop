import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../shared/model/ShoppingCart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: ShoppingCart;
  totalQuantity = ShoppingCartService.getTotalQuantity;
  totalPrice = ShoppingCartService.getTotalPrice;
  productQuantity: any = {};
  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cartService.createOrGetCartObs().subscribe(cart => {
      this.cart = cart;
      this.updateQuantity(cart);
    });
  }

  updateQuantity(cart: ShoppingCart) {
    this.productQuantity = {};
    this.cart = cart;
    cart.items.forEach(cartItem => this.productQuantity[cartItem.product._id] = cartItem.quantity);
  }

  clearCart() {
    this.cartService.clear().subscribe(cart => this.cart = cart);
  }

}
