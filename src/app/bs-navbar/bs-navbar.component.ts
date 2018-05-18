import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular5-social-login';
import {Observable} from 'rxjs/Observable';
import { AdminGuardService } from '../admin/services/admin-guard.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/model/User';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  public user: User;
  itemCount$: Observable<number>;
  totalQuantity$: Observable<number>;


  constructor(public socialAuthService: AuthService, private userService: UserService, private cartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.socialAuthService.authState.switchMap(gUser => {
      if (gUser) return this.userService.getUser(gUser.id);
      return Observable.of(null);
    }
    )
    .subscribe(user => this.user = user);

    this.itemCount$ =  this.cartService.getItemCount();
    this.totalQuantity$ = this.cartService.getTotalQuantityEvent();
  }

  logout() {
    this.socialAuthService.signOut().then(done => console.log('Signed out of Google'));
  }

}
