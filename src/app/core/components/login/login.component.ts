import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  public socialSignIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
        // console.log('Google sign in data : ' , userData);
        this.userService.update({email: userData.email, name: userData.name, provider: userData.provider, providerId: userData.id});
        const returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'];
        console.log('navigating to returnurl', returnUrl);
        this.router.navigate([returnUrl || '/']);
      }
    ).catch(err => console.log('Error after sign in', err));
  }
}
