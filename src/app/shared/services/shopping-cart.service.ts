import { Injectable } from '@angular/core';
import { CommonService } from './common-service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Product } from '../model/Product';
import { ShoppingCart } from '../model/ShoppingCart';

@Injectable()
export class ShoppingCartService extends CommonService {

  observer;
  cart: Observable<ShoppingCart> = Observable.create((observer) => {
    this.observer = observer;
  });

  private create(): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(environment.url + '/shopping-cart', null, { headers: this.httpHeaders })
      .do(cart => {
        if (this.observer) {
          this.observer.next(cart);
        }
      });
  }

  // private createCartWithProduct(product: Product): Observable<ShoppingCart> {
  //   return this.http.post<ShoppingCart>(environment.url + '/shopping-cart', {product}, { headers: this.httpHeaders });
  // }

  private add(product: Product, cart: ShoppingCart): ShoppingCart {
    const item = cart.items.filter(elem2 => !!elem2.product).find(elem1 => elem1.product._id === product._id);
    if (item) {
      item.quantity++;
    } else {
      cart.items.push({ product, quantity: 1 });
    }
    return cart;
  }

  private remove(product: Product, cart: ShoppingCart): ShoppingCart {
    const item = cart.items.filter(elem2 => !!elem2.product).find(elem1 => elem1.product._id === product._id);
    if (item) {
      item.quantity--;
      if (item.quantity < 1) {
        cart.items = cart.items.filter(elem => !!elem.quantity);
      }
    }
    
    return cart;
  }

  private getCart(id: string): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(environment.url + '/shopping-cart/' + id, { headers: this.httpHeaders })
      .do(cart => {
        if (this.observer) {
          this.observer.next(cart);
        }
      });
  }

  private updateDb(cart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.put<ShoppingCart>(environment.url + '/shopping-cart/' + cart._id, cart, { headers: this.httpHeaders })
      .do(updatedCart => {
        if (this.observer) { 
          this.observer.next(updatedCart); 
        }
      });
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

  async addToCart(product: Product): Promise<ShoppingCart> {
    const cart = await this.createOrGetCart();
    const updatedCart = this.add(product, cart);
    return this.updateDb(updatedCart).toPromise();
  }

  getTotalQuantityEvent(): Observable<number> {
    return this.cart.map(cart => {
      return ShoppingCartService.getTotalQuantity(cart);
    });
  }

  static getTotalQuantity(cart: ShoppingCart) : number {
    let quantity = 0;
    if(cart)
    cart.items.forEach(item => quantity += item.quantity);
    return quantity;
  }

  static getTotalPrice(cart: ShoppingCart) : number {
    let total = 0;
    if(cart)
    cart.items.forEach(item => total += item.product.price * item.quantity);
    return total;
  }

  clear() : Observable<ShoppingCart>{
    return this.createOrGetCartObs().switchMap(cart => this.updateDb(this.clearItems(cart)));
  }

  private clearItems(cart: ShoppingCart) : ShoppingCart {
    cart.items = [];
    return cart;
  }

}
