import { RejectService } from './reject.service';
import { ApproveService } from './approve.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserApproveHttpService } from 'src/app/http/user-approve-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-approve-form',
  templateUrl: './approve-form.component.html',
  styleUrls: ['./approve-form.component.scss']
})
export class ApproveFormComponent implements OnInit {


  @Input() reject: boolean = true
  @Input() back: boolean = true
  @Input() data: any
  @Input() userApprove: any
  @Input() disable: boolean = true

  userLogin: any

  constructor(
    private _router: Router,
    private _user: UserHttpService,
    private _approve: ApproveService,
    private _loading: NgxUiLoaderService,
    private _reject: RejectService

  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  async ngOnInit(): Promise<void> {
    // const id: any = localStorage.getItem('RLS_id');
    // this.userLogin = await this._user.getUserById(id).toPromise()

  }
  onApprove() {
    if (this.data.status == "qe_window_person_report") {
      Swal.fire({
        title: `Do you want to finish job ?`,
        icon: 'question',
        showCancelButton: true
      }).then(async (value: SweetAlertResult) => {
        if (value.isConfirmed) {
          this._approve.finishJob(this.data, this.userLogin)
        }
      })
    } else {
      Swal.fire({
        title: `Do you want to approve ?`,
        icon: 'question',
        showCancelButton: true
      }).then(async (value: SweetAlertResult) => {
        if (value.isConfirmed) {
          this.comment('approve')
        }
      })

    }
  }

  async comment(key: any) {
    await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      (value);
      if (value.isConfirmed) {
        if (key == 'approve') {
          this._approve.send(this.userLogin, this.userApprove, this.data, value.value)
        }
      }
    })
  }

  async onReject() {
    const option: any = this.genOption(this.data.status)
    const { value: key } = await Swal.fire({
      title: 'REJECT ',
      input: 'select',
      inputOptions: option,
      inputPlaceholder: 'SEND REJECT TO',
      showCancelButton: true,

    })
    if (key) {
      await Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      }).then((value: SweetAlertResult) => {
        if (value.isConfirmed) {
          const findUserApprove = this.data.step5.find((s: any) => s.prevStatusForm == key)
          // console.log(findUserApprove);
          this._reject.send(this.userLogin, findUserApprove, this.data, value.value, key)
        }
      })


    }


  }

  genOption(status: any) {
    let request_user
    if (status == 'request_approve') {
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

    if (status == 'request_confirm' || status == 'request_confirm_edited') {
      request_user = this.data.step5.filter((s: any) => s.prevStatusForm == 'qe_window_person')
    }


    const arrayUniqueByKey = [...new Map(request_user.map((item: any) =>
      [item['prevStatusForm'], item])).values()];
    return arrayUniqueByKey.reduce((prev: any, now: any) => {
      const newKey: any = now.prevStatusForm
      prev[newKey] = `${now.prevStatusForm} ➢ ${now.prevUser.name}`
      return prev
    }, {})

  }

  onBack() {
    this._router.navigate(['/'])
  }


  validAuth() {
    if (this.data.status === 'request_confirm') {
      if (localStorage.getItem('RLS_authorize') === 'request') return false
      return true
    } else {
      if (this.data.status.includes(localStorage.getItem('RLS_authorize'))) return false
      return true
    }
  }




}
