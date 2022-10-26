import { Injectable } from '@angular/core';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TableRequestService {

  constructor(
    private _login: LoginService,
    private _request: RequestHttpService
  ) { }


  getRequestTableManage(params:any){
    return this._request.getRequestTable(params).toPromise()
  }
  getTable(params:any){
    return this._request.getTable(params).toPromise()
  }


  async getRequest({ ...data }) {
    // console.log(data);
    const resultCondition: any = await this.setCondition(data['selected_status'])
    // console.log(resultCondition);
    return this.getRequestCondition(data['user']._id, resultCondition['status'], resultCondition['action'])

  }

  private setCondition(status: string) {
    return new Promise(resolve => {
      let conStr: any[] = [];
      let action = ''
      if (status === 'ongoing') {
        conStr = [
          'close_job',
          'cancel'
        ];
        action = 'nin'
      }
      if (status === 'closed') {
        conStr = [
          'close_job'
        ];
        action = 'in'
      }
      if (status === 'all') {
        conStr = [];
        action = 'all'
      }
      resolve({
        status: conStr,
        action: action
      })
    })
  }

  private getRequestCondition(_id: string, status: any[], action: string) {
    return this._request.getByCondition({ _id: _id, status: status, action: action }).toPromise()
  }
}
