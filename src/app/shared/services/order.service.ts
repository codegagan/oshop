import { Injectable } from '@angular/core';
import { CommonService } from './common-service';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService extends CommonService{

  place(order: any) : Observable<any> {
    return this.http.post(environment.url + '/orders', order, {headers: this.httpHeaders});
  }

  getOrdersByUserId(id: string) : Observable<any> {
    return this.http.get(environment.url + '/orders', {headers: this.httpHeaders, params: {user: id}});
  }

}
