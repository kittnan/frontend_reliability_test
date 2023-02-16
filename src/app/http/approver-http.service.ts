import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproverHttpService {
  URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any> {
    return this.http.get(`${this.URL}/approver/`)
  }
  getById(param: any): Observable<any> {
    return this.http.get(`${this.URL}/approver/id`, { params: param })
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/approver/insert`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/approver/update/${id}`, data)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/approver/delete/${id}`)
  }
}
