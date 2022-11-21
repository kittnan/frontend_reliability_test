import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChamberHttpService {

  URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any> {
    return this.http.get(`${this.URL}/chamber_list/`)
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/chamber_list/insert`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/chamber_list/update/${id}`, data)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/chamber_list/delete/${id}`)
  }
  getLast():Observable<any>{
    return this.http.get(`${this.URL}/chamber_list/lastRecord`)
  }
  getByValue(value:any):Observable<any>{
    return this.http.get(`${this.URL}/chamber_list/chamber/${value}`)
  }
  insertQueue(data: any): Observable<any> {
    return this.http.post(`${this.URL}/chamber_list/insertQueue`, data)
  }
  getReady(value:any,startDate:any,qty:any):Observable<any>{
    return this.http.get(`${this.URL}/chamber_list/ready/${value}/${startDate}/${qty}`)
  }
}
