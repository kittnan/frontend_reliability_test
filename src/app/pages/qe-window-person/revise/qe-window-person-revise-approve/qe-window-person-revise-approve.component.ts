import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { ApproverForm } from 'src/app/pages/admin/approver/dialog-approver/dialog-approver.component';
import { DialogApproveRevisesComponent } from 'src/app/pages/shared/approve-form-revises/dialog-approve-revises/dialog-approve-revises.component';
import { DialogRejectRevisesComponent } from 'src/app/pages/shared/approve-form-revises/dialog-reject-revises/dialog-reject-revises.component';
import { UserApproveService } from 'src/app/services/user-approve.service';
import { QeWindowPersonReviseApproveService } from './qe-window-person-revise-approve.service';
import { RequestHttpService } from 'src/app/http/request-http.service';

@Component({
  selector: 'app-qe-window-person-revise-approve',
  templateUrl: './qe-window-person-revise-approve.component.html',
  styleUrls: ['./qe-window-person-revise-approve.component.scss']
})
export class QeWindowPersonReviseApproveComponent implements OnInit {
  formRevise: any = null
  userLogin: any;
  dataSource: any = null
  queuesForm: any = null
  table: any = null
  nextApprove: any = null
  approve: ApproverForm = {
    groupList: null,
    groupStatus: null,
    level: null,
    name: null,
    selected: null,
    status: null
  }
  userApproveList: any = [];
  authorize = 'qe_engineer'
  approver: any = null
  REQUEST: any = null
  constructor(
    private routeActive: ActivatedRoute,
    private $revise: RevisesHttpService,
    private _userApprove: UserApproveService,
    public dialog: MatDialog,
    private $qeWindowPersonRevise: QeWindowPersonReviseApproveService,
    private $request: RequestHttpService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  ngOnInit(): void {
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { id } = params;
      const resData = await this.$revise.getByRequestId(new HttpParams().set('id', id)).toPromise()
      this.formRevise = resData[0]
      this.formRevise = {
        ...this.formRevise,
        ...this.formRevise.step1
      }
      this.dataSource = this.$qeWindowPersonRevise.setDataTable(this.formRevise)
      this.getUserApprove()
      this.queuesForm = this.$qeWindowPersonRevise.genPlan(this.dataSource)
      const resRequest = await this.$request.get_id(this.formRevise.step1.requestId).toPromise()
      this.REQUEST = resRequest[0]
    })
  }

  async getUserApprove() {

    const resForm = await this.$revise.getByRequestId(new HttpParams().set('id', this.formRevise.requestId)).toPromise()
    this.formRevise = resForm[0]
    // this.step5 = this.formRevise.step5
    this.userApproveList = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
    this.approver = await this._userApprove.approver(this.authorize, 0, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApproveList = [this.approver.selected]
      this.approve = this.approver
    } else {
      this.userApproveList = this.userApproveList.filter((u: any) => u._id != this.userLogin._id)
      const select = this.checkPrevApprove(this.formRevise, 3)
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

  async updateQEReceive() {
    await this.$revise.updateByRequestId(this.formRevise.requestId, this.formRevise).toPromise()
    this.dataSource = []
    this.queuesForm = []
    setTimeout(() => {
      const temp = this.$qeWindowPersonRevise.setDataTable(this.formRevise)
      this.dataSource = temp
    }, 200);
  }


  dataChange(e: any) {
    this.queuesForm = e
  }
  tableChange(e: any) {
    this.table = e
    this.formRevise.table = this.table
  }
  approveChange(e: any) {
    this.nextApprove = e
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

  private generateOptionReject(level: any) {
    let request_user
    if (level == "request_approve_revise") {
      request_user = this.formRevise.historyApprove.filter((s: any) => s.level == 13)
    }
    const arrayUniqueByKey = [...new Map(request_user.map((item: any) =>
      [item._id, item])).values()];
    return arrayUniqueByKey
  }

  onNext() {
    this.handleApprove()
  }
  private handleApprove() {
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


  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  private checkPrevApprove(data: any, level: number) {
    const prevUserApprove = data?.step5?.find((s: any) => s.level == level)
    if (prevUserApprove) {
      return this.userApproveList.find((u: any) => u._id == prevUserApprove.nextUser._id)
    } else {
      return null
    }
  }


}
