import { Injectable } from '@angular/core';
import { CommonService } from './common-service';
import { Product } from './model/Product';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService extends CommonService {

  productUrl: string = environment.url + '/products';

  create(product: Product): void {
    this.http.post(this.productUrl, product, {headers: this.httpHeaders}).subscribe(done => console.log(done));
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl, {headers: this.httpHeaders});
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`, {headers: this.httpHeaders});
  }

  update(id: string, product: Product): void {
    this.http.put(`${this.productUrl}/${id}`, product, {headers: this.httpHeaders}).subscribe(done => console.log(done));
  }
}
