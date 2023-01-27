import { SendMailService } from './../../../http/send-mail.service';
import { LogFlowService } from './../../../http/log-flow.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Step5HttpService } from './../../../http/step5-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  constructor(
    private $request: RequestHttpService,
    private $step5: Step5HttpService,
    private _loading: NgxUiLoaderService,
    private _router: Router,
    private $log: LogFlowService,
    private $sendMail: SendMailService
  ) { }

  async finishJob(form: any, userLogin: any) {
    this._loading.start()
    let newForm = {
      ...form,
      status: 'finish',
      level: 9,
      nextApprove: null,
    }


    const logData = {
      formId: newForm._id,
      action: 'finish form',
      user: userLogin
    }

    const newStep = {
      date: new Date(),
      comment: [],
      nextStatusForm: this.findNextStatus(form.status, form.level),
      prevStatusForm: form.status,
      nextUser: null,
      prevUser: {
        _id: userLogin._id,
        name: userLogin.name
      },
      level: 9,
      requestId: form._id,
    }
    // console.log('insert step', newStep);
    await this.$step5.insert(newStep).toPromise()

    // console.log('finish', newForm);
    await this.$request.update(newForm._id, newForm).toPromise()
    const user = newForm.step5.find((s: any) => s.level === 1)
    const eng = newForm.step5.find((s: any) => s.level === 4)
    const eng2 = newForm.step5.find((s: any) => s.level === 5)
    this.sendLog(logData)
    this.sendMail([user.prevUser._id, eng._id, eng2._id], newForm.status, newForm._id)
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this.link('qe_window_person')
    }, 1000);
  }





  async send(prevUser: any, nextUserApprove: any, form: any, comment: any) {
    this._loading.start()
    // console.log(nextUserApprove, form, comment);
    const nextStatusForm = this.findNextStatus(form.status, form.level)
    // console.log(form.status, nextStatusForm);
    const level = this.findNextLevel(form.status, form.level)

    if (form.status == 'draft') {
      let step5Prev = this.findStep5(form.step5, 'draft')
      step5Prev = {
        ...step5Prev,
        date: new Date(),
        comment: [comment],
        nextStatusForm: 'request_approve',
        prevStatusForm: 'request',
        nextUser: {
          _id: nextUserApprove._id,
          name: nextUserApprove.name
        },
        prevUser: {
          _id: prevUser._id,
          name: prevUser.name
        },
        status: true
      }
      const newForm = {
        ...form,
        status: 'request_approve',
        nextApprove: {
          _id: nextUserApprove._id,
          name: nextUserApprove.name
        },
        comment: comment,
        level: level
      }

      const resUpdateStep5: any = await this.$step5.update(step5Prev._id, step5Prev).toPromise()
      const resUpdateForm: any = await this.$request.update(newForm._id, newForm).toPromise()
      const logData = {
        formId: newForm._id,
        action: 'request_approve',
        user: prevUser
      }
      this.sendLog(logData)
      this.sendMail([newForm.nextApprove._id], newForm.status, newForm._id)
      setTimeout(() => {
        Swal.fire('SUCCESS', '', 'success')
        this._loading.stopAll()
        this.link(prevUser.authorize)
      }, 1000);
    } else {


      const oldStep = form.step5.find((step: any) => step.nextStatusForm == nextStatusForm)

      if (oldStep) {
        const prev = {
          ...oldStep,
          date: new Date(),
          comment: [comment],
          nextUser: {
            _id: nextUserApprove._id,
            name: nextUserApprove.name
          },
          prevUser: {
            _id: prevUser._id,
            name: prevUser.name
          },
          level: level,
        }
        // console.log('update prev step', prev);
        await this.$step5.update(prev._id, prev).toPromise()
      } else {
        const newStep = {
          date: new Date(),
          comment: [comment],
          nextStatusForm: this.findNextStatus(form.status, form.level),
          prevStatusForm: form.status,
          nextUser: {
            _id: nextUserApprove._id,
            name: nextUserApprove.name
          },
          prevUser: {
            _id: prevUser._id,
            name: prevUser.name
          },
          level: level,
          requestId: form._id,
        }
        // console.log('insert step', newStep);
        await this.$step5.insert(newStep).toPromise()
      }
      const newForm = {
        ...form,
        status: this.findNextStatus(form.status, form.level),
        nextApprove: {
          _id: nextUserApprove._id,
          name: nextUserApprove.name
        },
        comment: comment,
        level: level
      }
      // console.log('update request', newForm);
      await this.$request.update(newForm._id, newForm).toPromise()
      const logData = {
        formId: newForm._id,
        action: newForm.status,
        user: prevUser
      }
      this.sendLog(logData)
      this.sendMail([newForm.nextApprove._id], newForm.status, newForm._id)

      setTimeout(() => {
        this._loading.stopAll()
        Swal.fire('SUCCESS', '', 'success')
        this.link(prevUser.authorize)
      }, 1000);


    }

  }

  sendLog(data: any) {
    this.$log.insertLogFlow(data).subscribe(res => console.log(res))
  }

  async sendMail(to: any[], status: string, formId: string) {
    const body = {
      to: to,
      status: status,
      formId: formId
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


  private findStep5(step5: any, statusForm: any) {
    return step5.find((s: any) => s.prevStatusForm == statusForm)
  }
  private findNextLevel(status: any, level: number) {
    switch (status) {
      case 'draft':
        return 0

      case 'request':
        return 1

      case 'request_approve':
        return 2

      case 'qe_window_person':
        return 3

      case 'qe_engineer':
        return 4

      case 'qe_engineer2':
        return 5

      case 'qe_section_head':
        return 6

      case 'request_confirm':
        return 7

      case 'request_confirm_edited':
        return 7

      case 'qe_window_person_report':
        return 10




      case 'reject_request':
        return 1

      case 'reject_request_approve':
        return 2

      case 'reject_qe_window_person':
        if (level === 7.8) return 8
        return 3

      case 'reject_qe_engineer':
        return 4

      case 'reject_qe_section_head':
        return 5

      case 'reject_request_confirm':
        return 8


      default:
        return ''
    }
  }

  private findNextStatus(status: any, level: any) {
    switch (status) {

      case 'draft':
        return 'request_approve'

      case 'request_approve':
        return 'qe_window_person'

      case 'qe_window_person':
        return 'qe_engineer'

      case 'qe_engineer':
        return 'qe_engineer2'

      case 'qe_engineer2':
        return 'qe_section_head'

      case 'qe_section_head':
        return 'request_confirm'

      case 'qe_window_person_edit_plan':
        return 'request_confirm'

      case 'request_confirm':
        return 'qe_window_person_report'

      case 'request_confirm_edited':
        return 'qe_window_person_report'

      case 'qe_window_person_report':
        return 'finish'

      case 'reject_request':
        return 'request_approve'

      case 'reject_request_approve':
        return 'qe_window_person'

      case 'reject_qe_window_person':
        if (level === 7.8) return 'request_confirm_edited'
        return 'qe_engineer'

      case 'reject_qe_engineer':
        return 'qe_engineer2'

      case 'reject_qe_section_head':
        return 'qe_window_person'

      case 'reject_request_confirm':
        return 'qe_window_person_edit_plan'

      case 'reject_qe_window_person':
        return 'finish'

      default:
        return ''
    }
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

    if (status == 'qe_engineer2') {
      str = 'qe-engineer'
    }

    if (status == 'qe_section_head') {
      str = 'qe-section-head'
    }
    setTimeout(() => {
      this._router.navigate([`/${str}`])
    }, 1000);
  }




}
