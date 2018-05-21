import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
    protected httpHeaders: HttpHeaders;
    constructor(protected http: HttpClient) {
        this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        // .set('x-codegagan', 'gagan');
    }
}
