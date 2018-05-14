import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/model/Product';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../services/category.service';
import { Category } from '../services/model/Category';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart, CartItem } from '../services/model/ShoppingCart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  productQuantity: any = {};

  cart: ShoppingCart;
  // items: CartItem[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.route.queryParams.subscribe(params => {
        this.category = params.category;
        this.filteredProducts = this.category ?
          this.products.filter(value => value.category.toString() === this.category) :
          this.products;
      });
    });
    this.cart = await this.cartService.createOrGetCart();
    this.updateQuantity();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).then(cart => {
      this.cart = cart;
      this.updateQuantity();
    });
  }

  removeFromCart(product: Product) {
      this.cartService.removeFromCart(product).then(cart => {
        this.cart = cart;
        this.updateQuantity();
      });
  }

  private updateQuantity() {
    this.productQuantity = {};
    this.cart.items.forEach(cartItem => this.productQuantity[cartItem.product._id] = cartItem.quantity);
  }
}
