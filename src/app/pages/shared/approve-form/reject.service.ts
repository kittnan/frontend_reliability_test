import { LogFlowService } from './../../../http/log-flow.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
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
    private $sendMail: SendMailService,
  ) { }

  async sendReject(prevUser: any, nextUserApprove: any, form: any, comment: any, rejectToStatus: any) {
    this._loading.start()
    const targetStep5 = form.step5.find((s: any) => s.prevStatusForm == rejectToStatus)
    const upperLevel = form.step5.filter((s: any) => Number(s.level) >= targetStep5.level)
    const level = this.findNextLevel(form.status, rejectToStatus)
    const nextStatusForm = this.findNextStatus(rejectToStatus)

    let newComment = [comment]
    if (typeof form.comment === 'string') {
      newComment = [form.comment, comment]
    }
    if (typeof form.comment === 'object') {
      newComment = [...form.comment, comment]
    }
    const newForm = {
      ...form,
      status: nextStatusForm,
      nextApprove: {
        _id: nextUserApprove.prevUser._id,
        name: nextUserApprove.prevUser.name
      },
      comment: newComment,
      level: level
    }
    if (form.status !== 'request_confirm') this.clearStep5UpperTarget(upperLevel)
    // console.log('update request', newForm);
    await this.$request.update(newForm._id, newForm).toPromise()
    const logData = {
      formId: newForm._id,
      action: newForm.status,
      user: prevUser
    }
    this.sendLog(logData)

    let ccUser: string[] = []
    ccUser = form.followUp.map((f: any) => f._id)
    ccUser = [...new Set(ccUser)]

    this.sendMail([newForm.nextApprove._id], newForm.status, newForm._id, ccUser, form.controlNo)
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
      // console.log('update step5', newStep);
      await this.$step5.update(newStep._id, newStep).toPromise()

      setTimeout(() => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
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
      // console.log('insert step5', newStep);
      await this.$step5.insert(newStep).toPromise()
      setTimeout(() => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })

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

  async sendMail(to: any[], status: string, formId: string, cc: string[], controlNo: string) {
    const body = {
      to: to,
      status: status,
      formId: formId,
      cc: cc

    }
    const resSendMail = await this.$sendMail.send(body).toPromise()
    // console.log(resSendMail);
    const logData = {
      formId: formId,
      action: `send mail ${status}`,
      detail: JSON.stringify(resSendMail)
    }
    this.sendLog(logData)
  }



  private findNextLevel(formStatus: any, to: any) {
    // console.log(formStatus, to);

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
            if (formStatus == 'qe_engineer2' && to == 'request_approve') {
              return 5.2
            }
            else
              if (formStatus == 'qe_engineer2' && to == 'qe_window_person') {
                return 5.3
              }
              else
                if (formStatus == 'qe_section_head' && to == 'request') {
                  return 6.1
                }
                else
                  if (formStatus == 'qe_section_head' && to == 'qe_window_person') {
                    return 6.3
                  }
                  else
                    if (formStatus == 'qe_section_head' && to == 'qe_engineer') {
                      return 6.4
                    }
                    else
                      if (formStatus == 'request_confirm' && to == 'qe_window_person') {
                        return 7.8
                      }
                      else
                        if (formStatus == 'request_confirm_edited' && to == 'qe_window_person') {
                          return 7.8
                        } else
                          if (formStatus == 'request_confirm_revise' && to == 'qe_window_person') {
                            return 11.5
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

    if (status == 'request_confirm') {
      str = 'request-confirm'
    }
    this._router.navigate([`/${str}`])
  }

  sendLog(data: any) {
    this.$log.insertLogFlow(data).subscribe(res => console.log(res))
  }

}
