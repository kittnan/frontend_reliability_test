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

  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}`, { params: params })
  }
  getByRequestId(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/ByRequestId`, { params: params })
  }
  getReviseTable(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}/revisesTable`, { params: params })
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/insert`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.sub}/update/${id}`, data)
  }
  updateByRequestId(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.sub}/updateByRequestId/${id}`, data)
  }
  deleteByRequestId(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/${this.sub}/deleteByRequestId/` + id)
  }
  mergeOverrideForm(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/mergeOverrideForm/`, data)
  }
}
