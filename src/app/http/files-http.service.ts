import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesHttpService {



  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  uploadFile(formData: any): Observable<any> {
    return this.http.post(`${this.URL}/files/upload`, formData)
  }
  delete(data: any): Observable<any> {
    return this.http.delete(`${this.URL}/files/delete/${data}`)
  }



}
