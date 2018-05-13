import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular5-social-login';
import {Observable} from 'rxjs/Observable';
import { AdminGuardService } from '../services/admin-guard.service';
import { UserService } from '../services/user.service';
import { User } from '../services/model/User';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  public user: User;
  itemCount$: Observable<number>;
  totalQuantity: number;


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
    this.cartService.getTotalQuantity().subscribe(count => this.totalQuantity = count);
  }

  logout() {
    this.socialAuthService.signOut().then(done => console.log('Signed out of Google'));
  }

}
