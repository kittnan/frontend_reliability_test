import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserApproveHttpService } from 'src/app/http/user-approve-http.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApproveFormService {

  constructor(
    private _userApprove: UserApproveHttpService,
    private _request: RequestHttpService,
    private _router: Router
  ) { }

  async submit(action: string, data: any, userLogin: any, userApprove: any) {
    const statusForm = this.genStatusForm(action, data.status)
    const body_form = {
      nextApprove: userApprove,
      status: statusForm
    }
    console.log("🚀 ~ file: approve-form.service.ts ~ line 30 ~ ApproveFormService ~ submit ~ body_form", body_form)
    const currentStep = this.currentStep(statusForm, data)
    console.log("🚀 ~ file: approve-form.service.ts ~ line 32 ~ ApproveFormService ~ submit ~ currentStep", currentStep)
    const nextStep = this.nextStep(statusForm, data, userApprove)
    console.log("🚀 ~ file: approve-form.service.ts ~ line 34 ~ ApproveFormService ~ submit ~ nextStep", nextStep)

    let arr = []
    arr.push(
      this._request.update(data._id, body_form).toPromise()
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
      console.log(value);
      Swal.fire('Success', '', 'success')
      setTimeout(() => {
        // this._router.navigate(['/'])
      }, 1000);
    }).catch(err => console.log(err))
  }


  currentStep(curStatus: string, data: any) {
    const foo = data.step5.find((d: any) => d.authorize == curStatus)
    return {
      ...foo,
      dateApprove: new Date(),
      statusApprove: true
    }

  }

  nextStep(curStatus: string, data: any, userApprove: any) {
    console.log(curStatus);

    if (curStatus == 'request_approve') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_window_person')
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_window_person',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 3,
        new: true

      }
    }
    if (curStatus == 'qe_window_person') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_engineer')
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_engineer',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 4,
        new: true

      }
    }
    if (curStatus == 'qe_engineer') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_section_head')
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_section_head',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 5,
        new: true

      }
    }
    if (curStatus == 'qe_section_head') {
      const foo = data.step5.find((d: any) => d.authorize == 'qe_window_person' && d.level==6)
      if (foo) {
        return {
          ...foo,
          dateApprove: new Date(),
          statusApprove: false,
          new: false
        }
      }
      return {
        requestId: data._id,
        authorize: 'qe_window_person',
        userId: userApprove._id,
        userName: userApprove.name,
        statusApprove: false,
        dateApprove: null,
        level: 6,
        new: true

      }
    }
    return {}
  }

  private genStatusForm(action: string, prevStatus: string) {
    if (action == 'approve') {
      if (prevStatus == 'request') return 'request_approve'
      if (prevStatus == 'request_approve') return 'qe_window_person'
      if (prevStatus == 'qe_window_person') return 'qe_engineer'
      if (prevStatus == 'qe_engineer') return 'qe_section_head'
      if (prevStatus == 'qe_section_head') return 'qe_window_person_report'
    }
    if (action == 'reject') {
      if (prevStatus == 'request') return 'reject_' + prevStatus;
    }
    return ''
  }

}
