import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/queue/insert/`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/queue/update/${id}`, data)
  }
  updateMany(data: any): Observable<any> {
    return this.http.put(`${this.URL}/queue/updateMany/`, data)
  }
  get(): Observable<any> {
    return this.http.get(`${this.URL}/queue/`)
  }
  getFormId(id: any): Observable<any> {
    return this.http.get(`${this.URL}/queue/formId/${id}`)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/queue/delete/${id}`)
  }

}
