import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserApproveHttpService } from 'src/app/http/user-approve-http.service';
import Swal from 'sweetalert2';
import { ApproveFunctionService } from './approve-function.service';

@Injectable({
  providedIn: 'root'
})
export class ApproveFormService {

  constructor(
    private _userApprove: UserApproveHttpService,
    private $request: RequestHttpService,
    private _router: Router,
    private _fn: ApproveFunctionService
  ) { }

  async submit(action: string, data: any, userLogin: any, userApprove: any) {
    const statusForm = this._fn.genStatusForm(action, data.status)
    const body_form = {
      nextApprove: userApprove,
      status: statusForm
    }
    const currentStep = this._fn.currentStep(statusForm, data)
    const nextStep = this._fn.nextStep(statusForm, data, userApprove)
    let arr = []
    arr.push(
      this.$request.update(data._id, body_form).toPromise()
    )
    if (currentStep) {
      arr.push(
        this._userApprove.updateUserApprove(currentStep._id, currentStep).toPromise()
      )
    }
    if (nextStep && nextStep.new) {
      arr.push(
        this._userApprove.insertUserApprove(nextStep).toPromise()
      )
    } else {
      this._userApprove.updateUserApprove(nextStep._id, nextStep).toPromise()
    }

    Promise.all(arr).then((value: any) => {
       (value);
      Swal.fire('Success', '', 'success')
      setTimeout(() => {
        // this._router.navigate(['/'])
      }, 1000);
    }).catch(err =>  (err))
  }



  async reject(action: string, data: any, userLogin: any, key: any, value: any) {
    let flowNow = data.step5.find((s: any) => s.userId == userLogin._id)
    flowNow.comment = flowNow.comment && flowNow.comment.length ? [...flowNow.comment, value] : [value]
    let upperReject = data.step5.filter((s: any) => s.authorize != key)
    let arr: any[] = this.pushUpdateUserApprove(upperReject)
    const userApprove = this.findUserReject(key, data.step5)
    const statusForm = 'reject_' + key
    const body_form = {
      nextApprove: {
        ...userApprove,
        name: userApprove.userName,
        _id: userApprove.userId
      },
      status: statusForm
    }

    arr.push(
      this.$request.update(data._id, body_form).toPromise()
    )
    Promise.all(arr).then((value)=>{
       (value);

    })
    // !

  }

  pushUpdateUserApprove(data: any) {
    return data.map((d: any) => {
      d = {
        ...d,
        dateReject: new Date(),
        statusApprove: false
      }
      return this._userApprove.updateUserApprove(d._id, d).toPromise()
    })
  }

  findUserReject(target_status: any, step5: any) {
    return step5.find((u: any) => u.authorize == target_status)
  }

}
