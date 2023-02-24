import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../../app.constants";

const serviceUrl = SERVER_API_URL + 'userLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  doLogin(pData: any): Observable<any> {
    return this.http.post(serviceUrl, pData);
  }
}
