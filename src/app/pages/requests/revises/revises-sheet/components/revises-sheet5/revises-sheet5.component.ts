import { HttpParams } from '@angular/common/http';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { ApproverForm } from 'src/app/pages/admin/approver/dialog-approver/dialog-approver.component';
import { UserApproveService } from 'src/app/services/user-approve.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogApproveComponent } from 'src/app/pages/shared/approve-form/dialog-approve/dialog-approve.component';
import { DialogApproveRevisesComponent } from 'src/app/pages/shared/approve-form-revises/dialog-approve-revises/dialog-approve-revises.component';

@Component({
  selector: 'app-revises-sheet5',
  templateUrl: './revises-sheet5.component.html',
  styleUrls: ['./revises-sheet5.component.scss']
})
export class RevisesSheet5Component implements OnInit {
  @Input() requestId: any
  userLogin: any
  date: Date = new Date()
  approve: ApproverForm = {
    groupList: null,
    groupStatus: null,
    level: null,
    name: null,
    selected: null,
    status: null
  }
  userApproveList: any[] = [];
  form: any = null
  step5: any = null
  approver: any = null
  authorize = 'request_approve'

  constructor(
    private _stepper: CdkStepper,
    private $revise: RevisesHttpService,
    private _userApprove: UserApproveService,
    public dialog: MatDialog
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  ngOnInit(): void {
    this.getUserApprove()
  }

  async getUserApprove() {

    const resForm = await this.$revise.getByRequestId(new HttpParams().set('id', this.requestId)).toPromise()
    this.form = resForm[0]
    this.step5 = this.form.step5
    this.userApproveList = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
    console.log("🚀 ~ this.userApproveList:", this.userApproveList)
    this.approver = await this._userApprove.approver(this.authorize, 0, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApproveList = [this.approver.selected]
      this.approve = this.approver
    } else {
      this.userApproveList = this.userApproveList.filter((u: any) => u._id != this.userLogin._id)
      const select = this.checkPrevApprove(this.form, 1)
      this.approve = {
        groupList: this.approver ? this.approver.groupList : [],
        groupStatus: null,
        level: this.form?.level ? this.form.level : null,
        name: null,
        selected: select ? select : this.userApproveList[0],
        status: this.form?.status ? this.form.status : null
      }
    }
  }
  private checkPrevApprove(data: any, level: number) {
    const prevUserApprove = data?.step5?.find((s: any) => s.level == level)
    if (prevUserApprove) {
      return this.userApproveList.find((u: any) => u._id == prevUserApprove.nextUser._id)
    } else {
      return null
    }
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  onBack() {
    this._stepper.previous();
  }
  onNext() {
    this.handleApprove()
  }
  handleApprove() {
    const dialogRef = this.dialog.open(DialogApproveRevisesComponent, {
      width: '500px',
      height: 'auto',
      data: {
        userApprove: this.approve,
        userLogin: this.userLogin,
        form: this.form
      }
    })

  }
}
