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
    private _router: Router
  ) { }

  async send(prevUser: any, nextUserApprove: any, form: any, comment: any) {
    this._loading.start()
    // console.log(nextUserApprove, form, comment);
    const nextStatusForm = this.findNextStatus(form.status)
    // console.log(form.status, nextStatusForm);
    const level = this.findNextLevel(form.status)

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
      setTimeout(() => {
        Swal.fire('SUCCESS', '', 'success')
        this._loading.stopAll()
        this.link(prevUser.authorize)
      }, 1000);
    } else {


      console.log(nextStatusForm);
      const oldStep = form.step5.find((step: any) => step.nextStatusForm == nextStatusForm)
      console.log(oldStep);

      if (oldStep) {
        const newStep = {
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
        console.log(newStep);
        await this.$step5.update(newStep._id, newStep).toPromise()
      } else {
        const newStep = {
          date: new Date(),
          comment: [comment],
          nextStatusForm: this.findNextStatus(form.status),
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
        console.log(newStep);
        await this.$step5.insert(newStep).toPromise()
      }
      const newForm = {
        ...form,
        status: this.findNextStatus(form.status),
        nextApprove: {
          _id: nextUserApprove._id,
          name: nextUserApprove.name
        },
        comment: comment,
        level: level
      }

      console.log(newForm);
      const resUpdateForm: any = await this.$request.update(newForm._id, newForm).toPromise()
      setTimeout(() => {
        Swal.fire('SUCCESS', '', 'success')
        this._loading.stopAll()
        this.link(prevUser.authorize)
      }, 1000);


    }

  }

  findStep5(step5: any, statusForm: any) {
    return step5.find((s: any) => s.prevStatusForm == statusForm)
  }
  private findNextLevel(status: any) {
    switch (status) {
      case 'draft':
        return 0

      case 'request':
        return 1
      case 'reject_request':
        return 1

      case 'request_approve':
        return 2

      case 'qe_window_person':
        return 3

      case 'qe_engineer':
        return 4

      case 'qe_section_head':
        return 5

      case 'qe_window_person_report':
        return 6

      default:
        return ''
    }
  }

  private findNextStatus(status: any) {
    switch (status) {

      case 'draft':
        return 'request_approve'

      case 'request_approve':
        return 'qe_window_person'

      case 'qe_window_person':
        return 'qe_engineer'

      case 'qe_engineer':
        return 'qe_section_head'

      case 'qe_section_head':
        return 'qe_window_person_report'

      case 'qe_window_person_report':
        return 'finish'

      case 'reject_request':
        return 'request_approve'

      case 'reject_request_approve':
        return 'qe_window_person'

      case 'reject_qe_window_person':
        return 'qe_engineer'

      case 'reject_qe_engineer':
        return 'qe_section_head'

      case 'reject_qe_section_head':
        return 'qe_window_person'

      case 'reject_qe_window_person':
        return 'finish'

      default:
        return ''
    }
  }


  private nextStep5(newStep5: any, nextStatus: any, formId: any, nextUser: any) {
    if (newStep5) {
      alert('1')
      return {
        ...newStep5,
        statusApprove: false,
        dateApprove: null
      }
    } else {
      return {
        requestId: formId,
        authorize: nextStatus,
        userId: nextUser._id,
        userName: nextUser.name,
        statusApprove: false,
        dateApprove: null,
        dateReject: null,
        comment: [],
        level: 2,
      }
    }

  }

  private link(status: any) {
    let str = ''

    if(status =='request'){
      str= 'request'
    }

    if(status =='request_approve'){
      str= 'approve'
    }

    if(status =='qe_window_person'){
      str= 'qe-window-person'
    }

    if(status =='qe_engineer'){
      str= 'qe-engineer'
    }

    if(status =='qe_section_head'){
      str= 'qe-section-head'
    }
    this._router.navigate([`/${str}`])
  }




}
