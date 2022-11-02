import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OperateItemsHttpService {

  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  // TODO api_user
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/operate_items/update/${id}`, data)
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/operate_items/insert/`, data)
  }
  get(): Observable<any> {
    return this.http.get(`${this.URL}/operate_items/`)
  }
  getLastRecord(): Observable<any> {
    return this.http.get(`${this.URL}/operate_items/lastCode/`)
  }
  countCode(code:any): Observable<any> {
    return this.http.get(`${this.URL}/operate_items/countCode/${code}`)
  }
  delete(id:any): Observable<any> {
    return this.http.delete(`${this.URL}/operate_items/delete/${id}`)
  }

}
