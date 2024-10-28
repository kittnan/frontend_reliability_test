import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquipmentHttpService {
  private URL = environment.API
  private sub: string = 'equipment'
  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.sub}`, { params: params })
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/insert`, data)
  }
  createOrUpdate(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.sub}/createOrUpdate`, data)
  }
  deleteById(_id: any): Observable<any> {
    return this.http.delete(`${this.URL}/${this.sub}/deleteById`, {
      params: _id
    })
  }

}
