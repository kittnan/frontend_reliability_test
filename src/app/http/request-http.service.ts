import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestHttpService {

  URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  // TODO request http
  getRequest_formById(id: string): Observable<any> {
    return this.http.get(`${this.URL}/request_form/id/${id}`)
  }
  getRequest_form(): Observable<any> {
    return this.http.get(`${this.URL}/request_form`)
  }
  insertRequest_form(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/insert`, data)
  }
  updateRequest_form(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/request_form/update/${id}`, data)
  }
  deleteRequest_form(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/request_form/delete/${id}`)
  }
  countRequest_form(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/count`, data)
  }

}
