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

  getChamberList(): Observable<any> {
    return this.http.get(`${this.URL}/chamber_list/`)
  }
  insertChamberList(data: any): Observable<any> {
    return this.http.post(`${this.URL}/chamber_list/insert`, data)
  }
  updateChamberList(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/chamber_list/update/${id}`, data)
  }
  deleteChamberList(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/chamber_list/delete/${id}`)
  }
  getChamberLastRecord():Observable<any>{
    return this.http.get(`${this.URL}/chamber_list/lastRecord`)
  }
  getChamberByValue(value:any):Observable<any>{
    return this.http.get(`${this.URL}/chamber_list/chamber/${value}`)
  }

  createQueue(data: any): Observable<any> {
    return this.http.post(`${this.URL}/chamber_list/insertQueue`, data)
  }
}
