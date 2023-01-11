import { Injectable } from '@angular/core';
import { RequestHttpService } from '../http/request-http.service';
// import { LogFlowService } from './log-flow.service';

@Injectable({
  providedIn: 'root'
})
export class ShareFunctionService {

  constructor(
    private _request: RequestHttpService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  // async insertLogFlow(actionText: any, controlNo: any, comment: any, userLogin: any) {
  //   return await this._logFlow.insertLogFlow({
  //     user: userLogin,
  //     action: actionText,
  //     request_no: controlNo,
  //     comment: comment
  //   })
  // }

}
