import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonService } from './common-service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserService extends CommonService {

  update(user: User): void {
    this.http.post(environment.url + '/users', user, {headers: this.httpHeaders}).subscribe(res => console.log(res));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(environment.url + '/users/' + id, {headers: this.httpHeaders});
  }


}
