import { Injectable } from '@angular/core';
import { RequestHttpService } from '../http/request-http.service';
import { LogFlowService } from './log-flow.service';

@Injectable({
  providedIn: 'root'
})
export class ShareFunctionService {

  constructor(
    private _logFlow: LogFlowService,
    private _request: RequestHttpService
  ) { }

  async insertLogFlow(actionText: any, controlNo: any, comment: any, userLogin: any) {
    return await this._logFlow.insertLogFlow({
      user: userLogin,
      action: actionText,
      request_no: controlNo,
      comment: comment
    })
  }

}
