import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpFileServeService {

  private fileServer = environment.fileServer;
  private fileServerDelete = environment.fileServerDelete;
  constructor(private http: HttpClient) { }

  create(data: any = { path: '', file: '' }): Observable<any> {
    const formData: FormData = new FormData()
    formData.append('path', data.path)
    formData.append('file', data.file)
    return this.http.post(`${this.fileServer}`, formData);
  }
  delete(data: any): Observable<any> {
    const obj = { path_file: data.delete_path }
    return this.http.post(`${this.fileServerDelete}`, obj);
  }
}
