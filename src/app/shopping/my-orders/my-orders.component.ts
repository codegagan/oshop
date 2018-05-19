import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular5-social-login';
import { OrderService } from '../../shared/services/order.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  order$: Observable<any>;

  constructor(private auth: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.order$ = this.auth.authState.switchMap(user => this.orderService.getOrdersByUserId(user.id));
  }

}
