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
        localStorage.setItem('_id', user._id);
        localStorage.setItem('authorize', user.authorize);
        localStorage.setItem('name', user.name);
        this._toast.success();
        setTimeout(() => {
          this.going(localStorage.getItem('authorize'))
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
    if (localStorage.getItem('token')) {
      if (auth == 'admin') {
        this.router.navigate(['/admin'])
      }
      if (auth == 'request') {
        this.router.navigate(['/request'])
      }
      if (auth == 'request_approve') {
        this.router.navigate(['/approve'])
      }
      if (auth == 'qe_window_person') {
        this.router.navigate(['/qe-window-person'])
      }
    }
  }

  private setToken() {
    const token = uuidv4()
    localStorage.setItem('token', token)
  }

  getProFileById(id:string){
    return this.http.get(`${this.URL}/user/id/${id}`,)
  }
}
