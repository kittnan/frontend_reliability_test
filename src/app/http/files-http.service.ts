import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesHttpService {



  URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.URL}/files/upload`, formData)
  }

}
