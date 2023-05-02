import { RequestHttpService } from 'src/app/http/request-http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAuthComponent } from './../pages/shared/dialog-auth/dialog-auth.component';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
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
    private _loading: NgxUiLoaderService,
    private dialog: MatDialog,
    private $request: RequestHttpService
  ) { }

  onLogin(data: any) {
    this.login(data).subscribe(res => {
      if (res.length > 0) {
        const user = {
          ...res[0],
          name: this.shortName(res[0].name)
        };
        console.log(user);

        if (user.authorize.find((u: any) => u == 'guest')) {
          this.setToken()
          localStorage.setItem('RLS_id', user._id);
          localStorage.setItem('RLS_authorize', user.authorize[0]);
          // console.log(localStorage.getItem(newAuth));

          localStorage.setItem('RLS_userName', user.name);
          let userLoginStr = JSON.stringify(user)
          localStorage.setItem('RLS_userLogin', userLoginStr)
          localStorage.setItem('RLS_section', 'guest')
          // this._toast.success();
          // setTimeout(() => {
          this._loading.start()
          // location.href = '/guest'
          this.router.navigate(['/guest']).then((boo: any) => {
            window.location.reload()
          })
        } else {
          let newAuth = ''
          if (user?.authorize.length > 1) {
            const auth = user.authorize.sort()
            const dialogRef = this.dialog.open(DialogAuthComponent, {
              data: auth,
              hasBackdrop: true,
              disableClose: true
            })
            dialogRef.afterClosed().subscribe(res => {
              newAuth = res
              if (user?.section?.length > 1) {
                this.selectSection(user, newAuth, user.section)
              } else {
                this.setAuth(user, newAuth, user.section[0])
              }
            })
          } else {
            newAuth = user.authorize
            if (user?.section?.length > 1) {
              this.selectSection(user, newAuth, user.section)
            } else {
              this.setAuth(user, newAuth, user.section)
            }
          }
        }



      } else {
        this._toast.danger('login failed!!')
      }
    })
  }

  selectSection(user: any, newAuth: any, sections: any[]) {
    const dialogRef = this.dialog.open(DialogAuthComponent, {
      data: sections,
      hasBackdrop: true,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      const section = res
      this.setAuth(user, newAuth, section)
    })
  }

  private setAuth(user: any, newAuth: any, section: any) {
    this.setToken()
    localStorage.setItem('RLS_id', user._id);
    localStorage.setItem('RLS_authorize', newAuth);
    // console.log(localStorage.getItem(newAuth));
    localStorage.setItem('RLS_section', section)

    localStorage.setItem('RLS_userName', user.name);
    let userLoginStr = JSON.stringify(user)
    localStorage.setItem('RLS_userLogin', userLoginStr)
    // this._toast.success();
    // setTimeout(() => {
    this._loading.start()
    this.validFormId(localStorage.getItem('RLS_authorize'))
    // }, 2000);

  }

  private shortName(name: string) {
    const sptName: string[] = name.trim().split(' ').filter((d: any) => d != '')

    if (sptName.length > 1) {
      const fName = sptName[0]
      const lName: string = sptName.length > 1 ? '-' + sptName[1].split('')[0] : ''
      return `${fName}${lName}`
    } else {
      return sptName[0]
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/user/login`, data)
  }

  async validFormId(auth: any) {
    if (localStorage.getItem('RLS_token')) {
      this.route.queryParams.subscribe(async res => {
        const { id, status } = res
        // console.log("🚀 ~ status:", status)
        let resRequest = []
        if (id) {
          resRequest = await this.$request.get_id(id).toPromise()
          // console.log("🚀 ~ resRequest:", resRequest)
        } else {
          resRequest = []
        }

        let newUrl = ''

        if (resRequest && resRequest.length > 0) {
          if (resRequest[0].status == status) {
            switch (status) {

              case 'request_confirm':
                this.validPermissionRequestConfirm(auth)
                break;

              case 'request_confirm_edited':
                this.validPermissionRequestConfirm(auth)
                break;

              case 'request_confirm_revise':
                this.validPermissionRequestConfirm(auth)
                break;

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

              case 'qe_revise':
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
          } else {
            this.viewPage()
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
          if (auth == 'guest') {
            newUrl = "/guest"
          }
          this.router.navigate([newUrl]).then((boo: any) => {
            window.location.reload()
          })
          // Swal.fire('')
        }

      })


    }
  }

  validPermissionRequest(auth: any) {
    // console.log(auth);
    switch (auth) {
      case 'request':
        const url = '/request/sheet'
        this.goLink(url)
        break;

      default: this.viewPage()
        break;
    }
  }
  validPermissionRequestConfirm(auth: any) {
    // console.log(auth);
    switch (auth) {
      case 'request':
        const url = '/request/confirm'
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
    // console.log(auth);
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
    // console.log(auth);
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
    // console.log(auth);
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
    // console.log('validPermissionQEEngineer2');
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
    // console.log(auth);
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
    localStorage.setItem('RLS_token', token)
  }

  getProFileById(id: string) {
    return this.http.get(`${this.URL}/user/id/${id}`,)
  }
}
