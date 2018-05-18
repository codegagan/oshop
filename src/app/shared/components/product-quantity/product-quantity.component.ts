import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../model/Product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../model/ShoppingCart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input() productQuantity: any = {};
  @Input() product: Product;
  @Output() cartUpdated = new EventEmitter<ShoppingCart>();

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }
  
  addToCart(product: Product) {
    this.cartService.addToCart(product).then(cart => {
     this.cartUpdated.emit(cart);
    });
  }

  removeFromCart(product: Product) {
      this.cartService.removeFromCart(product).then(cart => {
        this.cartUpdated.emit(cart);
      });
  }
}
