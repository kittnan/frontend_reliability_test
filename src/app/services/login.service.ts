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
          this.going()
        }, 2000);
      } else {
        this._toast.danger('login failed!!')
      }
    })
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/user/login`, data)
  }

  private going() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('authorize') == 'admin') {
        this.router.navigate(['/admin'])
      }
      if (localStorage.getItem('authorize') == 'request') {
        this.router.navigate(['/request'])
      }
      if (localStorage.getItem('authorize') == 'approve') {
        this.router.navigate(['/approve'])
      }
    }
  }

  private setToken() {
    const token = uuidv4()
    localStorage.setItem('token', token)
  }
}
