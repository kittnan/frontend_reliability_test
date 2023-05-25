import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QueuesRevisesService {
  private URL = environment.API
  private SUB = 'queues_revises'
  constructor(
    private http: HttpClient
  ) { }

  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/insert/`, data)
  }
  check(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/check/`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.SUB}/update/${id}`, data)
  }
  updateMany(data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.SUB}/updateMany/`, data)
  }
  get(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/`)
  }
  getFormId(id: any): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/formId/${id}`)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/${this.SUB}/delete/${id}`)
  }
  getReady(param: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/chamber/ready`, { params: param })
  }

}
