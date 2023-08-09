import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportHttpService {

  private URL = environment.API
  private SUB: string = 'report'
  constructor(
    private http: HttpClient
  ) { }

  upload(formData: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/upload`, formData)
  }
  delete(data: any): Observable<any> {
    return this.http.delete(`${this.URL}/${this.SUB}/delete/${data}`)
  }


}
