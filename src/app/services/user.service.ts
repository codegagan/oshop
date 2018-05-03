import { Injectable } from '@angular/core';
import { User } from './model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  update(user: User): void {
    console.log('user update', user);
    this.http.post(environment.url + '/users', user, {headers: this.httpHeaders}).subscribe(res => console.log(res));
  }

}
