import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScanHistoryHttpService {
  private URL = environment.API
  private sub: string = 'scan-history'
  constructor(
    private http: HttpClient
  ) { }


  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}`, { params: params })
  }

  hold(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/hold`, { params: params })
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/insert`, data)
  }
  deleteAllByCode(params: HttpParams): Observable<any> {
    return this.http.delete(`${this.URL}/${this.sub}/deleteAllByCode`, {
      params: params
    })
  }
  deleteByCode(params: HttpParams): Observable<any> {
    return this.http.delete(`${this.URL}/${this.sub}/deleteByCode`, {
      params: params
    })
  }

}
