import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL: string = environment.API
  constructor(
    private http: HttpClient,
    private router: Router,
    private _toast: ToastService
  ) { }

  onLogin(data: any) {
    this.login(data).subscribe(res => {
      if (res.length > 0) {
        const user = res[0];
        this.setToken()
        sessionStorage.setItem('_id', user._id);
        sessionStorage.setItem('authorize', user.authorize);
        sessionStorage.setItem('name', user.name);
        this._toast.success();
        setTimeout(() => {
          this.going(sessionStorage.getItem('authorize'))
        }, 2000);
      } else {
        this._toast.danger('login failed!!')
      }
    })
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/user/login`, data)
  }

   going(auth:any) {
    if (sessionStorage.getItem('token')) {
      if (auth == 'admin') {
        location.href = "/admin"
      }
      if (auth == 'request') {
        location.href = "/request"

      }
      if (auth == 'request_approve') {
        location.href = "/approve"

      }
      if (auth == 'qe_window_person') {
        location.href = "/qe-window-person"

      }
      if (auth == 'qe_engineer') {
        location.href = "/qe-engineer"

      }
      if (auth == 'qe_section_head') {
        location.href = "/qe-section-head"

      }
      if (auth == 'qe_department_head') {
        location.href = "/qe-department-head"

      }
    }
  }

  private setToken() {
    const token = uuidv4()
    sessionStorage.setItem('token', token)
  }

  getProFileById(id:string){
    return this.http.get(`${this.URL}/user/id/${id}`,)
  }
}
