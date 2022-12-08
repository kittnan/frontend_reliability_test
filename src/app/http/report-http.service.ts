import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportHttpService {

  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  upload(formData: any): Observable<any> {
    return this.http.post(`${this.URL}/report/upload`, formData)
  }
  delete(data: any): Observable<any> {
    return this.http.delete(`${this.URL}/report/delete/${data}`)
  }


}
