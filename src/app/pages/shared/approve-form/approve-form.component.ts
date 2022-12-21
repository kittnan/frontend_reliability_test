import { RejectService } from './reject.service';
import { ApproveService } from './approve.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserApproveHttpService } from 'src/app/http/user-approve-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ApproveFormService } from './approve-form.service';

@Component({
  selector: 'app-approve-form',
  templateUrl: './approve-form.component.html',
  styleUrls: ['./approve-form.component.scss']
})
export class ApproveFormComponent implements OnInit {


  @Input() reject: boolean = true
  @Input() data: any
  @Input() userApprove: any

  userLogin: any

  constructor(
    private _router: Router,
    private _user: UserHttpService,
    // private _approve: ApproveFormService,
    private _approve: ApproveService,
    private _loading: NgxUiLoaderService,
    private _reject: RejectService

  ) { }

  async ngOnInit(): Promise<void> {
    const id: any = sessionStorage.getItem('_id');
    this.userLogin = await this._user.getUserById(id).toPromise()

  }
  onApprove() {
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
          // console.log(this.userLogin,this.userApprove, this.data, value.value);
          this._approve.send(this.userLogin,this.userApprove, this.data, value.value)
        } else {

        }
        // this._approve.submit('approve', this.data, this.userLogin, this.userApprove,value.value)
      }
    })
  }

  async onReject() {
    const option = this.genOption(this.data.status)
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
          const findUserApprove = this.data.step5.find((s:any)=> s.prevStatusForm==key)
          this._reject.send(this.userLogin,findUserApprove, this.data, value.value,key)
          // const nextUserApprove = {
          //   _id:findUserApprove.userId,
          //   name:findUserApprove.userName
          // }
          // this._reject.send(key,nextUserApprove,this.data,value.value)
          // Swal.fire(key)
          // Swal.fire(value.value)
          // this._approve.reject('reject', this.data, this.userLogin,key,value.value)
        }
      })


    }


  }

  genOption(status: any) {
    console.log(status);

    const request_user = this.data.step5.find((s: any) => s.prevStatusForm == 'request' || s.prevStatusForm == 'draft')

    if (status == 'request_approve') {
      return {
        'request': request_user ? 'request ➢ ' + request_user.prevUser.name : '-'
      }

    }
    if (status == 'qe_window_person') {
      return {
        'request': request_user ? 'request ➢ ' + request_user.prevUser.name : '-'
      }

    }
    // if (status == 'qe_engineer') {
    //   return {
    //     'request_approve': request_user ? 'request_approve ➢ ' + request_user.prevUser.name : '-'
    //   }

    // }
    return {

    }
  }

  onBack() {
    this._router.navigate(['/'])
  }







}
