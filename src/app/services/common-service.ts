import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
    constructor(protected http: HttpClient) {}
    protected httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
}
