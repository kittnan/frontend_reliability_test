import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserHttpService } from '../http/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _user_service: UserHttpService
  ) {

  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) return true
    return false
  }

  getAuthorizeRequest() {
    if (localStorage.getItem('authorize') == 'request') return true
    return false
  }
  getAuthorizeApprove() {
    if (localStorage.getItem('authorize') == 'request_approve') return true
    return false
  }
  getAuthorizeAdmin() {
    if (localStorage.getItem('authorize') == 'admin') return true
    return false
  }
  getAuthorizeQeWindowPerson() {
    if (localStorage.getItem('authorize') == 'qe_window_person') return true
    return false
  }
  getAuthorizeQeEngineer() {
    if (localStorage.getItem('authorize') == 'qe_engineer' || localStorage.getItem('authorize') == 'qe_engineer2') return true
    return false
  }
  getAuthorizeQeSectionHead() {
    if (localStorage.getItem('authorize') == 'qe_section_head') return true
    return false
  }
  getAuthorizeQeDepartmentHead() {
    if (localStorage.getItem('authorize') == 'qe_department_head') return true
    return false
  }

  async getUserLogin() {
    const _id: any = localStorage.getItem('_id')
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
