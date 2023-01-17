import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL: string = environment.API
  constructor(
    private http: HttpClient,
    private router: Router,
    private _toast: ToastService,
    private route: ActivatedRoute
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

  async going(auth: any) {
    if (localStorage.getItem('token')) {

      this.route.queryParams.subscribe(res => {
        const { id, status } = res
        let newUrl = ''
        if (id) {

          if (auth == 'admin') {
            newUrl = "/admin"
          }
          if (auth == 'request') {
            newUrl = "/request/sheet"
          }
          if (auth == 'request_approve') {
            newUrl = "/approve/approve-request"
          }
          if (auth == 'qe_window_person') {
            if (status === 'qe_window_person' || status === 'reject_qe_window_person') {
              newUrl = "/qe-window-person/chamber"
            } else {
              newUrl = "/qe-window-person/report"
            }
          }
          if (auth == 'qe_engineer') {
            newUrl = "/qe-engineer/approve-request"
          }
          if (auth == 'qe_engineer2') {
            newUrl = "/qe-engineer/approve-request"
          }
          if (auth == 'qe_section_head') {
            newUrl = "/qe-section-head/approve-request"
          }
        } else {
          if (auth == 'admin') {
            newUrl = "/admin"
          }
          if (auth == 'request') {
            newUrl = "/request"
          }
          if (auth == 'request_approve') {
            newUrl = "/approve"
          }
          if (auth == 'qe_window_person') {
            newUrl = "/qe-window-person"
          }
          if (auth == 'qe_engineer') {
            newUrl = "/qe-engineer"
          }
          if (auth == 'qe_engineer2') {
            newUrl = "/qe-engineer"
          }
          if (auth == 'qe_section_head') {
            newUrl = "/qe-section-head"
          }
          if (auth == 'qe_department_head') {
            newUrl = "/qe-department-head"
          }
        }

        this.router.navigate([newUrl], { queryParamsHandling: 'preserve' }).then((boo: any) => {
          window.location.reload()
        })

      })


    }
  }


  private setToken() {
    const token = uuid()
    localStorage.setItem('token', token)
  }

  getProFileById(id: string) {
    return this.http.get(`${this.URL}/user/id/${id}`,)
  }
}
