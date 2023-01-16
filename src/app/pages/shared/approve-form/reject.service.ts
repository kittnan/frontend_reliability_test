import { LogFlowService } from './../../../http/log-flow.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Step5HttpService } from './../../../http/step5-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SendMailService } from 'src/app/http/send-mail.service';

@Injectable({
  providedIn: 'root'
})
export class RejectService {

  constructor(
    private $request: RequestHttpService,
    private $step5: Step5HttpService,
    private _loading: NgxUiLoaderService,
    private _router: Router,
    private $log: LogFlowService,
    private $sendMail: SendMailService
  ) { }

  async send(prevUser: any, nextUserApprove: any, form: any, comment: any, rejectToStatus: any) {
    this._loading.start()
    const targetStep5 = form.step5.find((s: any) => s.prevStatusForm == rejectToStatus)
    const upperLevel = form.step5.filter((s: any) => Number(s.level) >= targetStep5.level)
    const level = this.findNextLevel(form.status, rejectToStatus)
    const nextStatusForm = this.findNextStatus(rejectToStatus)
    const newForm = {
      ...form,
      status: nextStatusForm,
      nextApprove: {
        _id: nextUserApprove.prevUser._id,
        name: nextUserApprove.prevUser.name
      },
      comment: comment,
      level: level
    }
    this.clearStep5UpperTarget(upperLevel)
    await this.$request.update(newForm._id, newForm).toPromise()
    const logData = {
      formId: newForm._id,
      action: newForm.status,
      user: prevUser
    }
    this.sendLog(logData)
    const oldStepReject = form.step5.find((step: any) => step.level == level)
    if (oldStepReject) {
      const newStep = {
        ...oldStepReject,
        date: new Date(),
        nextUser: {
          _id: nextUserApprove.prevUser._id,
          name: nextUserApprove.prevUser.name
        },
        prevUser: {
          _id: prevUser._id,
          name: prevUser.name
        },
        comment: [comment]
      }

      await this.$step5.update(newStep._id, newStep).toPromise()

      setTimeout(() => {
        Swal.fire('SUCCESS', '', 'success')
        this._loading.stopAll()
        this.link(prevUser.authorize)
      }, 1000);
    } else {
      const newStep = {
        date: new Date(),
        comment: [comment],
        nextStatusForm: this.findNextStatus(rejectToStatus),
        prevStatusForm: form.status,
        nextUser: {
          _id: nextUserApprove.prevUser._id,
          name: nextUserApprove.prevUser.name
        },
        prevUser: {
          _id: prevUser._id,
          name: prevUser.name
        },
        level: level,
        requestId: form._id,
      }
      await this.$step5.insert(newStep).toPromise()
      setTimeout(() => {
        Swal.fire('SUCCESS', '', 'success')
        this._loading.stopAll()
        this.link(prevUser.authorize)
      }, 1000);

    }


  }
  private async clearStep5UpperTarget(upperLevel: any) {
    let arr = []
    arr = await upperLevel.map(async (up: any) => {
      return await this.$step5.update(up._id, { ...up, status: false }).toPromise()
    })
    const results = await Promise.all(arr.map((p: any) => p.catch((e: any) => e)));
    const findError = results.find((r: any) => r.reason)
    if (findError) {
      Swal.fire('some thing is wrong', '', 'error')
      const arr2 = await upperLevel.map(async (up: any) => {
        return await this.$step5.update(up._id, { ...up, status: true }).toPromise()
      })
      Promise.all(arr2)
    }
  }


  private findNextLevel(formStatus: any, to: any) {
    console.log(formStatus, to);

    if (formStatus == 'request_approve' && to == 'request') {
      return 2.1
    }
    else
      if (formStatus == 'qe_window_person' && to == 'request') {
        return 3.1
      }
      else
        if (formStatus == 'qe_engineer' && to == 'request_approve') {
          return 4.2
        }
        else
          if (formStatus == 'qe_engineer' && to == 'qe_window_person') {
            return 4.3
          }
          else
            if (formStatus == 'qe_section_head' && to == 'request') {
              return 5.1
            }
            else
              if (formStatus == 'qe_section_head' && to == 'qe_window_person') {
                return 5.3
              }
              else
                if (formStatus == 'qe_section_head' && to == 'qe_engineer') {
                  return 5.4
                }
    return 0

  }

  private findNextStatus(status: any) {
    return 'reject_' + status
  }

  private link(status: any) {
    let str = ''

    if (status == 'request') {
      str = 'request'
    }

    if (status == 'request_approve') {
      str = 'approve'
    }

    if (status == 'qe_window_person') {
      str = 'qe-window-person'
    }

    if (status == 'qe_engineer') {
      str = 'qe-engineer'
    }

    if (status == 'qe_section_head') {
      str = 'qe-section-head'
    }
    this._router.navigate([`/${str}`])
  }

  sendLog(data: any) {
    this.$log.insertLogFlow(data).subscribe(res => console.log(res))
  }

}
