import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RevisesHttpService {
  private URL = environment.API
  private sub: string = 'request_revises'
  constructor(
    private http: HttpClient
  ) { }

  getPrev(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/prev`, { params: params })
  }
  getRevisesTable(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/revisesTable`, { params: params })
  }
  create(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/insert`, data)
  }
  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}`, { params: params })
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.sub}/update/${id}`, data)
  }
}
