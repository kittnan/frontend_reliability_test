import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Step1HttpService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }
  get(params: any): Observable<any> {
    return this.http.get(`${this.URL}/step1`, { params: params })
  }

  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/step1/insert`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/step1/update/${id}`, data)
  }
}
