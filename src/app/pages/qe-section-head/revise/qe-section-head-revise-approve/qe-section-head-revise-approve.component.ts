import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { ApproverForm } from 'src/app/pages/admin/approver/dialog-approver/dialog-approver.component';
import { DialogApproveRevisesComponent } from 'src/app/pages/shared/approve-form-revises/dialog-approve-revises/dialog-approve-revises.component';
import { DialogRejectRevisesComponent } from 'src/app/pages/shared/approve-form-revises/dialog-reject-revises/dialog-reject-revises.component';
import { UserApproveService } from 'src/app/services/user-approve.service';

@Component({
  selector: 'app-qe-section-head-revise-approve',
  templateUrl: './qe-section-head-revise-approve.component.html',
  styleUrls: ['./qe-section-head-revise-approve.component.scss']
})
export class QeSectionHeadReviseApproveComponent implements OnInit {

  userLogin: any

  formRevise: any = null
  approve: ApproverForm = {
    groupList: null,
    groupStatus: null,
    level: null,
    name: null,
    selected: null,
    status: null
  }
  userApproveList: any[] = [];
  approver: any = null
  authorize = 'request'

  constructor(
    private _route: ActivatedRoute,
    private $revise: RevisesHttpService,
    private _userApprove: UserApproveService,
    public dialog: MatDialog
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (res: any) => {
      const resQuery = await this.$revise.getByRequestId(new HttpParams().set('id', res['id'])).toPromise()
      this.formRevise = resQuery[0]
      this.getUserApprove()
    })
  }

  async getUserApprove() {
    let levelStep4 = 1


    this.userApproveList = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
    this.userApproveList = this.userApproveList.filter((a: any) => a.username != 'admin')
    // console.log("🚀 ~ this.userApprove:", this.userApprove)
    this.approver = await this._userApprove.approver(this.authorize, 0, this.userLogin)

    if (this.approver && this.approver.groupStatus) {
      this.userApproveList = [this.approver.selected]
      this.approve = this.approver
    } else {
      const select = this.checkPrevApprove(this.formRevise, levelStep4)
      this.approve = {
        groupList: this.approver ? this.approver.groupList : [],
        groupStatus: null,
        level: this.formRevise?.level ? this.formRevise.level : null,
        name: null,
        selected: select ? select : this.userApproveList[0],
        status: this.formRevise?.status ? this.formRevise.status : null
      }
    }
  }
  private checkPrevApprove(data: any, level: number) {
    const prevUserApprove = data?.step5?.find((s: any) => s.level == level)
    if (prevUserApprove) {
      return this.userApproveList.find((u: any) => u._id == prevUserApprove.prevUser._id)
    } else {
      return null
    }
  }


  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  onReject() {
    const dialogRef = this.dialog.open(DialogRejectRevisesComponent, {
      width: '500px',
      height: 'auto',
      data: {
        userApprove: this.userApproveList,
        userLogin: this.userLogin,
        form: this.formRevise,
        option: this.generateOptionReject(this.formRevise.status)
      }
    })

  }

  generateOptionReject(level: any) {
    let request_user = []
    if (level == 'qe_engineer_revise2') {
      request_user = this.formRevise.historyApprove.filter((s: any) => s.level == 13 || s.level == 15)
    }
    const arrayUniqueByKey = [...new Map(request_user.map((item: any) =>
      [item._id, item])).values()];
    return arrayUniqueByKey ? arrayUniqueByKey.reverse() : arrayUniqueByKey
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
        form: this.formRevise
      }
    })

  }


}
