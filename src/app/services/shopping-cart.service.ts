import { Injectable } from '@angular/core';
import { CommonService } from './common-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Product } from './model/Product';
import { ShoppingCart } from './model/ShoppingCart';
import { element } from 'protractor';

@Injectable()
export class ShoppingCartService extends CommonService {

  private create(): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(environment.url + '/shopping-cart', null, { headers: this.httpHeaders });
  }

  private createCartWithProduct(product: Product): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(environment.url + '/shopping-cart', {product}, { headers: this.httpHeaders });
  }

  private add(product: Product, cart: ShoppingCart): ShoppingCart {
    const item = cart.items.filter(elem2 => !!elem2.product).find(elem1 => elem1.product._id === product._id);
    if (item) {
      item.quantity++;
    } else {
      cart.items.push({product, quantity: 1});
    }
    return cart;
  }

  private remove(product: Product, cart: ShoppingCart): ShoppingCart {
    const item = cart.items.filter(elem2 => !!elem2.product).find(elem1 => elem1.product._id === product._id);
    if (item) {
      item.quantity--;
    }
    return cart;
  }

  async addToCart(product: Product): Promise<ShoppingCart> {
    const cart = await this.createOrGetCart();
    const updatedCart = this.add(product, cart);
    return this.updateDb(updatedCart).toPromise();
  }

  private getCart(id: string): Observable<ShoppingCart> {
   return this.http.get<ShoppingCart>(environment.url + '/shopping-cart/' + id, { headers: this.httpHeaders });
  }

  private updateDb(cart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.put<ShoppingCart>(environment.url + '/shopping-cart/' + cart._id, cart, {headers: this.httpHeaders});
  }

  async createOrGetCart(): Promise<ShoppingCart> {
    let cartId = localStorage.getItem('cart');

    if (!cartId) {
      const resp = await this.create().toPromise();
      cartId = resp._id;
      localStorage.setItem('cart', cartId);
    }
    const cart = await this.getCart(cartId).toPromise();
    return cart;
  }

  createOrGetCartObs(): Observable<ShoppingCart> {
    const cartId = localStorage.getItem('cart');

    if (!cartId) {
      return this.create().do(resp => localStorage.setItem('cart', resp._id));
    } else {
      return this.getCart(cartId);
    }
  }

  async removeFromCart(product: Product): Promise<ShoppingCart> {
    const cart = await this.createOrGetCart();
    const updatedCart = this.remove(product, cart);
    return this.updateDb(updatedCart).toPromise();
  }

  getItemCount(): Observable<number> {
    return this.createOrGetCartObs().map(cart => cart.items.length);
  }

  getTotalQuantity(): Observable<number> {
    return this.createOrGetCartObs().map(cart => {
      let quantity = 0;
      cart.items.forEach(item => quantity += item.quantity);
      return quantity;
    });
  }

}
