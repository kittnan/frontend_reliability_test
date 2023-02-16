import { ApproverForm } from './../../../../admin/approver/dialog-approver/dialog-approver.component';
import { UserApproveService } from './../../../../../services/user-approve.service';
import { Step5HttpService } from './../../../../../http/step5-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ApproveService } from 'src/app/pages/shared/approve-form/approve.service';

@Component({
  selector: 'app-sheet-step5',
  templateUrl: './sheet-step5.component.html',
  styleUrls: ['./sheet-step5.component.css']
})
export class SheetStep5Component implements OnInit {
  @Input() formId: any;
  userLogin: any
  date: Date = new Date()

  userApprove: any[] = [];
  authorize = 'request_approve'
  resStep5: any[] = []
  form: any
  request: any
  approve: ApproverForm = {
    groupList: null,
    groupStatus: null,
    level: null,
    name: null,
    selected: null,
    status: null
  }
  approver: any

  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step5: Step5HttpService,
    private $request: RequestHttpService,
    private _router: Router,
    private _approve: ApproveService,
    private _userApprove: UserApproveService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.formId) {
      this.request = await this.$request.get_id(this.formId).toPromise()
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      this.resStep5 = await this.$step5.get(params).toPromise()
      // const level2 = this.resStep5.find((s: any) => s.level == 2)

      // this.form = level2
      // if (level2) {
      //   const temp = this.userApprove.find((u: any) => u._id == level2.userId)
      //   this.approve = temp
      // }
    }
    this.getUserApprove()
  }


  async getUserApprove() {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
    this.approver = await this._userApprove.approver(this.authorize, 0, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApprove = [this.approver.selected]
      this.approve = this.approver
    } else {
      this.approve = {
        groupList: this.approver ? this.approver.groupList : [],
        groupStatus: null,
        level: this.form?.level ? this.form.level : null,
        name: null,
        selected: this.checkPrevApprove(this.form, 2) ? this.checkPrevApprove(this.form, 2) : this.userApprove[0],
        status: this.form?.status ? this.form.status : null
      }
      console.log(this.approve);

    }
  }

  private checkPrevApprove(data: any, level: number) {
    const prevUserApprove = data?.step5?.find((s: any) => s.level == level)
    if (prevUserApprove) {
      return prevUserApprove
    } else {
      return null
    }
  }
  // async getUserApprove() {
  //   let userLoginStr: any = localStorage.getItem('RLS_userLogin')
  //   this.userLogin = JSON.parse(userLoginStr)
  //   this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
  //   this.selected = this.userApprove[0]

  // }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  onNext() {
    Swal.fire({
      title: 'Do you want to submit?',
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        if (this.formId) {
          this.request = await this.$request.get_id(this.formId).toPromise()
        }
        this.comment()
      }
    })

  }

  async comment() {
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
        this._approve.send(this.userLogin, this.approve, this.request[0], value.value)
      }
    })
  }

  onBack() {
    this._stepper.previous();
  }

}
