import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../../app.constants";

const serviceUrl = SERVER_API_URL + 'roomAvailability';

@Injectable({
  providedIn: 'root'
})
export class RoomAvailabilityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(serviceUrl);
  }

  get(pUuid: any): Observable<any> {
    return this.http.get(`${serviceUrl}/${pUuid}`);
  }

  getAvailabilityPeriods(pUuid: any): Observable<any> {
    return this.http.get(`${serviceUrl}/room-uuid/${pUuid}`);
  }

  create(pData: any): Observable<any> {
    return this.http.post(serviceUrl, pData);
  }

  update(pData: any, pUuid: any): Observable<any> {
    return this.http.put(`${serviceUrl}/${pUuid}`, pData);
  }

  delete(pUuid: any): Observable<any> {
    return this.http.delete(`${serviceUrl}/${pUuid}`);
  }

}
