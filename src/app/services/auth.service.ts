import { RequestHttpService } from 'src/app/http/request-http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserHttpService } from '../http/user-http.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  filter$!: Observable<any>;
  constructor(
    private _user_service: UserHttpService,
  ) {

  }

  getToken() {
    const token = localStorage.getItem('RLS_token');
    if (token) return true
    return false
  }

  getAuthorizeRequest() {
    if (localStorage.getItem('RLS_authorize') == 'request') return true
    return false
  }
  getAuthorizeApprove() {
    if (localStorage.getItem('RLS_authorize') == 'request_approve') return true
    return false
  }
  getAuthorizeAdmin() {
    if (localStorage.getItem('RLS_authorize') == 'admin') return true
    return false
  }
  getAuthorizeQeWindowPerson() {
    if (localStorage.getItem('RLS_authorize') == 'qe_window_person') return true
    return false
  }
  getAuthorizeQeEngineer() {
    if (localStorage.getItem('RLS_authorize') == 'qe_engineer' || localStorage.getItem('RLS_authorize') == 'qe_engineer2') return true
    return false
  }
  getAuthorizeQeSectionHead() {
    if (localStorage.getItem('RLS_authorize') == 'qe_section_head') return true
    return false
  }
  getAuthorizeQeDepartmentHead() {
    if (localStorage.getItem('RLS_authorize') == 'qe_department_head') return true
    return false
  }

  async getUserLogin() {
    const _id: any = localStorage.getItem('RLS_id')
    const resultUserLogin = this.findUserLogin(_id)
    return resultUserLogin
  }

  private findUserLogin(_id: any) {
    return new Promise(resolve => {
      this._user_service.getUserById(_id).subscribe(res => {
        resolve(res)
      })
    })
  }



}
