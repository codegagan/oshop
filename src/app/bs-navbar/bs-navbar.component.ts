import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular5-social-login';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(private socialAuthService: AuthService) {

    socialAuthService.authState.subscribe(user => console.log('AuthState: ', user));
  }

  ngOnInit() {
  }

  logout() {
this.socialAuthService.signOut().then(done => console.log('Signed out of Google'));
  }

}
