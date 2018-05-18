import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common-service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoryService extends CommonService {

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.url + '/categories', {headers: this.httpHeaders});
  }

}
