import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from 'angular5-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shipping: FormGroup;

  constructor(private fb: FormBuilder, private cartService: ShoppingCartService, 
    private orderService: OrderService, private socalAuthService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.shipping = this.fb.group({
      name: ['', Validators.required],
      line1: ['', Validators.required],
      line2: [''],
      city: ['', Validators.required]
    });
  }

  async placeOrder() {
    const cart = await this.cartService.createOrGetCart();
    this.socalAuthService.authState.subscribe(user => {
      const order = {
        shipping: this.shipping.value,
        items: cart.items,
        creationDate: new Date().getTime(),
        totalPrice: ShoppingCartService.getTotalPrice(cart),
        user: user.id
      };
      this.cartService.clear().toPromise();
      this.orderService.place(order).subscribe(o => this.router.navigate(['/order-success', o._id]));
    });

  }

}
