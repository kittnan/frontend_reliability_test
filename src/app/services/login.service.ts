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
        const user = {
          ...res[0],
          name: this.shortName(res[0].name)
        };
        this.setToken()
        localStorage.setItem('_id', user._id);
        localStorage.setItem('authorize', user.authorize);
        localStorage.setItem('name', user.name);
        let userLoginStr = JSON.stringify(user)
        localStorage.setItem('reliability-userLogin', userLoginStr)


        this._toast.success();
        setTimeout(() => {
          this.going(localStorage.getItem('authorize'))
        }, 2000);
      } else {
        this._toast.danger('login failed!!')
      }
    })
  }

  private shortName(name: string) {
    let newName: string = name.trim()
    let sptName: string[] = newName.split(' ')
    if (sptName.length > 1) {
      const fName = sptName[0]
      const lName = sptName[2].split('')[0]
      return `${fName}-${lName}`
    } else {
      return sptName[0]
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/user/login`, data)
  }

  async going(auth: any) {
    if (localStorage.getItem('token')) {
      this.route.queryParams.subscribe(res => {
        const { id, status } = res
        let newUrl = ''
        if (!!id) {
          console.log(1);

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
          this.router.navigate([newUrl], { queryParamsHandling: 'preserve' }).then((boo: any) => {
            window.location.reload()
          })
        } else {
          console.log(2);

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
          this.router.navigate([newUrl]).then((boo: any) => {
            window.location.reload()
          })
        }



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
