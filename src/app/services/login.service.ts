import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL: string = environment.API
  constructor(
    private http: HttpClient,
    private router: Router,
    private _toast: ToastService,
    private route: ActivatedRoute,
    private _loading: NgxUiLoaderService
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
          this._loading.start()
          this.validFormId(localStorage.getItem('authorize'))
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

  async validFormId(auth: any) {
    if (localStorage.getItem('token')) {
      this.route.queryParams.subscribe(res => {
        const { id, status } = res
        let newUrl = ''
        if (id) {
          console.log(1);

          switch (status) {
            case 'request_approve':
              this.validPermissionApprove(auth)
              break;

            case 'qe_window_person':
              this.validPermissionQEWindowChamber(auth)
              break;

            case 'qe_engineer':
              this.validPermissionQEEngineer(auth)
              break;

            case 'qe_engineer2':
              this.validPermissionQEEngineer2(auth)
              break;

            case 'qe_section_head':
              this.validPermissionQESectionHead(auth)
              break;

            case 'qe_window_person_report':
              this.validPermissionQEWindowReport(auth)
              break;






            case 'reject_request':
              this.validPermissionRequest(auth)
              break;

            case 'reject_request_approve':
              this.validPermissionApprove(auth)
              break;

            case 'reject_qe_window_person':
              this.validPermissionQEWindowChamber(auth)
              break;

            case 'reject_qe_engineer':
              this.validPermissionQEEngineer(auth)
              break;

            case 'reject_qe_section_head':
              this.validPermissionQESectionHead(auth)
              break;

            default: this.viewPage()
              break;
          }

          // if (auth == 'admin') {
          //   newUrl = "/admin"
          // }
          // if (auth == 'request') {
          //   newUrl = "/request/sheet"
          // }
          // if (auth == 'request_approve') {
          //   newUrl = "/approve/approve-request"
          // }
          // if (auth == 'qe_window_person') {
          //   if (status === 'qe_window_person' || status === 'reject_qe_window_person') {
          //     newUrl = "/qe-window-person/chamber"
          //   } else {
          //     newUrl = "/qe-window-person/report"
          //   }
          // }
          // if (auth == 'qe_engineer') {
          //   newUrl = "/qe-engineer/approve-request"
          // }
          // if (auth == 'qe_engineer2') {
          //   newUrl = "/qe-engineer/approve-request"
          // }
          // if (auth == 'qe_section_head') {
          //   newUrl = "/qe-section-head/approve-request"
          // }
          // this.router.navigate([newUrl], { queryParamsHandling: 'preserve' }).then((boo: any) => {
          //   window.location.reload()
          // })
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

  validPermissionRequest(auth: any) {
    console.log(auth);
    switch (auth) {
      case 'request':
        const url = '/request/sheet'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }
  }
  validPermissionApprove(auth: any) {
    switch (auth) {
      case 'request_approve':
        const url = '/approve/approve-request'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }

  }
  validPermissionQEWindowChamber(auth: any) {
    console.log(auth);
    switch (auth) {
      case 'qe_window_person':
        const url = '/qe-window-person/chamber'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }
  }
  validPermissionQEWindowReport(auth: any) {
    console.log(auth);
    switch (auth) {
      case 'qe_window_person':
        const url = '/qe-window-person/report'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }
  }
  validPermissionQEEngineer(auth: any) {
    console.log(auth);
    switch (auth) {
      case 'qe_engineer':
        const url = '/qe-engineer/approve-request'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }
  }
  validPermissionQEEngineer2(auth: any) {
    console.log('validPermissionQEEngineer2');
    switch (auth) {
      case 'qe_engineer2':
        const url = '/qe-engineer/approve-request'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }
  }
  validPermissionQESectionHead(auth: any) {
    console.log(auth);
    switch (auth) {
      case 'qe_section_head':
        const url = '/qe-section-head/approve-request'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }
  }
  viewPage() {
    const url = '/view-page'
    this.goLink(url)
  }


  goLink(url: string) {
    this.router.navigate([url], { queryParamsHandling: 'preserve' }).then((boo: any) => {
      window.location.reload()
    })
  }


  private setToken() {
    const token = uuid()
    localStorage.setItem('token', token)
  }

  getProFileById(id: string) {
    return this.http.get(`${this.URL}/user/id/${id}`,)
  }
}
