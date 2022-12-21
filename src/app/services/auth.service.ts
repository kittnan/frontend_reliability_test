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
    const token = sessionStorage.getItem('token');
    if (token) return true
    return false
  }

  getAuthorizeRequest() {
    if (sessionStorage.getItem('authorize') == 'request') return true
    return false
  }
  getAuthorizeApprove() {
    if (sessionStorage.getItem('authorize') == 'request_approve') return true
    return false
  }
  getAuthorizeAdmin() {
    if (sessionStorage.getItem('authorize') == 'admin') return true
    return false
  }
  getAuthorizeQeWindowPerson() {
    if (sessionStorage.getItem('authorize') == 'qe_window_person') return true
    return false
  }
  getAuthorizeQeEngineer() {
    if (sessionStorage.getItem('authorize') == 'qe_engineer') return true
    return false
  }
  getAuthorizeQeSectionHead() {
    if (sessionStorage.getItem('authorize') == 'qe_section_head') return true
    return false
  }
  getAuthorizeQeDepartmentHead() {
    if (sessionStorage.getItem('authorize') == 'qe_department_head') return true
    return false
  }

  async getUserLogin() {
    const _id: any = sessionStorage.getItem('_id')
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
