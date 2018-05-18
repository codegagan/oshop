import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'angular5-social-login';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import 'rxjs/add/observable/of';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private socialAuthService: AuthService, private userService: UserService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.socialAuthService.authState
    .switchMap(googleUser => this.userService.getUser(googleUser.id))
    .map(user => user.isAdmin);
  }
}
