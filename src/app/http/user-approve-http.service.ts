import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserApproveHttpService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  // TODO api_user
  updateUserApprove(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/userApprove/update/${id}`, data)
  }
  insertUserApprove(data: any): Observable<any> {
    return this.http.post(`${this.URL}/userApprove/insert/`, data)
  }
}
