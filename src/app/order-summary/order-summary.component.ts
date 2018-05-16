import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../services/model/ShoppingCart';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  cart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart = await this.cartService.createOrGetCart();
  }

  get totalQuantity(): number {
    return ShoppingCartService.getTotalQuantity(this.cart)
  }

  get totalPrice(): number {
    return ShoppingCartService.getTotalPrice(this.cart);
  }

}
