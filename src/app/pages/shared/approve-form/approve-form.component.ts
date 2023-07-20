import { RejectService } from './reject.service';
import { ApproveService } from './approve.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserHttpService } from 'src/app/http/user-http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogApproveComponent } from './dialog-approve/dialog-approve.component';
import { DialogRejectComponent } from './dialog-reject/dialog-reject.component';
import Swal from 'sweetalert2';
import { DialogSendmailComponent } from './dialog-sendmail/dialog-sendmail.component';

@Component({
  selector: 'app-approve-form',
  templateUrl: './approve-form.component.html',
  styleUrls: ['./approve-form.component.scss']
})
export class ApproveFormComponent implements OnInit {


  @Input() reject: boolean = true
  @Input() back: boolean = true
  @Input() approve: boolean = true
  @Input() data: any
  @Input() userApprove: any
  @Input() disable: boolean = true
  @Input() editPlan: boolean = false

  userLogin: any

  constructor(
    private _router: Router,
    public dialog: MatDialog

  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  async ngOnInit(): Promise<void> {
  }

  handleApprove() {
    const dialogRef = this.dialog.open(DialogApproveComponent, {
      width: '500px',
      height: 'auto',
      data: {
        userApprove: this.userApprove,
        userLogin: this.userLogin,
        form: this.data
      }
    })

  }



  handleReject() {
    const dialogRef = this.dialog.open(DialogRejectComponent, {
      width: '500px',
      height: 'auto',
      data: {
        userApprove: this.userApprove,
        userLogin: this.userLogin,
        form: this.data,
        option: this.generateOptionReject(this.data.status)
      }
    })
  }

  handleSendMail() {
    const to = this.data.step5.filter((a: any) => a.level == 1 || a.level == 2)
    const mapTo = to.map((a: any) => a.prevUser._id)
    const mapFollowUp = this.data.followUp.map((a: any) => a._id)

    const mergeFollowup = [...mapTo, ...mapFollowUp]
    const dialogRef = this.dialog.open(DialogSendmailComponent, {
      width: '500px',
      height: 'auto',
      data: {
        to: mergeFollowup,
        cc: [],
        formId: this.data.step1.requestId,
        comment: ''
      }
    })
  }


  generateOptionReject(status: any) {
    let request_user
    if (status == 'request_approve' || status == 'reject_request_approve') {
      request_user = this.data.step5.filter((s: any) => s.prevStatusForm == 'request' || s.prevStatusForm == 'draft')

    }
    if (status == 'qe_window_person' || status == 'reject_qe_window_person') {
      request_user = this.data.step5.filter((s: any) => s.prevStatusForm == 'request' || s.prevStatusForm == 'draft')
    }

    if (status == 'qe_engineer' || status == 'reject_qe_engineer') {
      request_user = this.data.step5.filter((s: any) => s.prevStatusForm == 'qe_window_person' || s.prevStatusForm == 'request_approve')
    }
    if (status == 'qe_engineer2' || status == 'reject_qe_engineer') {
      request_user = this.data.step5.filter((s: any) => s.prevStatusForm == 'qe_window_person' || s.prevStatusForm == 'request_approve')
    }

    if (status == 'qe_section_head' || status == 'reject_qe_section_head') {
      request_user = this.data.step5.filter((s: any) => s.prevStatusForm == 'qe_engineer' || s.prevStatusForm == 'qe_window_person' || s.prevStatusForm == 'request')
    }

    if (status == 'request_confirm' || status == 'request_confirm_edited' || status == 'request_confirm_revise') {
      request_user = this.data.step5.filter((s: any) => s.prevStatusForm == 'qe_window_person')
    }
    const arrayUniqueByKey = [...new Map(request_user.map((item: any) =>
      [item.prevUser._id, item])).values()];
    return arrayUniqueByKey
  }


  onBack() {
    this._router.navigate(['/'])
  }


  validAuth() {
    if (this.data.status === 'request_confirm') {
      if (localStorage.getItem('RLS_authorize') === 'request') return false
      return true
    } else {
      if (this.data.status.includes('qe_engineer2')) {
        if (localStorage.getItem('RLS_authorize') == 'qe_engineer2') return false
        return true
      } else {
        if (this.data.status.includes('qe_engineer')) {
          if (localStorage.getItem('RLS_authorize') == 'qe_engineer') return false
          return true
        } else {
          if (this.data.status.includes('qe_revise')) {
            if (localStorage.getItem('RLS_authorize') == 'qe_window_person') return false
            return true
          } else {
            if (this.data.status.includes(localStorage.getItem('RLS_authorize'))) return false
            return true
          }
        }
      }
    }
  }


  validFinish() {
    if (this.data.status == 'qe_window_person_report' && this.fullReportStatus()) return false
    return true
  }
  fullReportStatus() {
    const queues = this.data.queues
    const maxCorrectReportLen = queues.reduce((prev: any, now: any) => {
      const currentReportLen = now.reportQE.length
      if (prev < currentReportLen) return currentReportLen
      return prev
    }, 0)
    const maxUploadedReportLen = queues.reduce((prev: any, now: any) => {
      const currentReportLen = now.reportQE.filter((r: any) => r.files.length != 0).length
      if (prev < currentReportLen) return currentReportLen
      return prev
    }, 0)
    if (maxCorrectReportLen == maxUploadedReportLen) return true
    return false
  }
  // fullReportStatus() {
  //   const queues = this.data.queues
  //   const findReport = queues.find((q: any) => {
  //     const currentReportLen = q.reportQE.filter((r: any) => r.files.length != 0).length
  //     if (q.reportQE.length == currentReportLen) return true
  //     return false
  //   })
  //   if (findReport) return true
  //   return false
  // }

}
