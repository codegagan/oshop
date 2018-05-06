import { Injectable } from '@angular/core';
import { CommonService } from './common-service';
import { Product } from './model/Product';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService extends CommonService {

  create(product: Product): void {
    this.http.post(environment.url + '/products', product, {headers: this.httpHeaders}).subscribe(done => console.log(done));
  }
}
