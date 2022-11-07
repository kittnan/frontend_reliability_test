import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperateGroupService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/operate_group/update/${id}`, data)
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/operate_group/insert/`, data)
  }
  get(): Observable<any> {
    return this.http.get(`${this.URL}/operate_group/`)
  }
  getLastRecord(): Observable<any> {
    return this.http.get(`${this.URL}/operate_group/lastCode/`)
  }
  delete(id:any): Observable<any> {
    return this.http.delete(`${this.URL}/operate_group/delete/${id}`)
  }
}
