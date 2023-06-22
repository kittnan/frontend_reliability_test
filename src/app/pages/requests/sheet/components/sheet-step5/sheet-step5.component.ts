import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { DialogApproveComponent } from 'src/app/pages/shared/approve-form/dialog-approve/dialog-approve.component';

import { UserApproveService } from './../../../../../services/user-approve.service';
import { ApproverForm } from './../../../../admin/approver/dialog-approver/dialog-approver.component';

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
    private $request: RequestHttpService,
    private _userApprove: UserApproveService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.formId) {
      const resForm = await this.$request.get_id(this.formId).toPromise()
      this.form = resForm[0]
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
      this.userApprove = this.userApprove.filter((u: any) => u._id != this.userLogin._id)
      const select = this.checkPrevApprove(this.form, 1)
      this.approve = {
        groupList: this.approver ? this.approver.groupList : [],
        groupStatus: null,
        level: this.form?.level ? this.form.level : null,
        name: null,
        selected: select ? select : this.userApprove[0],
        status: this.form?.status ? this.form.status : null
      }
    }
  }

  private checkPrevApprove(data: any, level: number) {
    const prevUserApprove = data?.step5?.find((s: any) => s.level == level)
    if (prevUserApprove) {
      return this.userApprove.find((u: any) => u._id == prevUserApprove.nextUser._id)
    } else {
      return null
    }
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  async onNext() {

    if (this.formId) {
      const resForm = await this.$request.get_id(this.formId).toPromise()
      this.form = resForm[0]
    }
    this.handleApprove()
  }

  handleApprove() {
    const dialogRef = this.dialog.open(DialogApproveComponent, {
      width: '500px',
      height: 'auto',
      data: {
        userApprove: this.approve,
        userLogin: this.userLogin,
        form: this.form
      }
    })
  }


  onBack() {
    this._stepper.previous();
  }

}
