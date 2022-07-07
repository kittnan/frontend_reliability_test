import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  // TODO api_user
  getUserById(id:string): Observable<any> {
    return this.http.get(`${this.URL}/user/id/${id}`)
  }
  getUser(): Observable<any> {
    return this.http.get(`${this.URL}/user`)
  }
  insertUser(data: any): Observable<any> {
    return this.http.post(`${this.URL}/user/insert`, data)
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/user/update/${id}`, data)
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/user/delete/${id}`)
  }

}
