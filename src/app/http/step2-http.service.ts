import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Step2HttpService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }
  get(params: any): Observable<any> {
    return this.http.get(`${this.URL}/step2`, {params:params})
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/step2/insert`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/step2/update/${id}`, data)
  }

}
