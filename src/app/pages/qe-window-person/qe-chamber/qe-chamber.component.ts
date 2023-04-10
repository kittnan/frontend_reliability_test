import { ApproverForm } from './../../admin/approver/dialog-approver/dialog-approver.component';
import { UserApproveService } from './../../../services/user-approve.service';


import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestHttpService } from 'src/app/http/request-http.service';





export interface QueueForm {
  startDate: Date | null,
  endDate: Date | null,
  inspectionTime: TimeForm[] | null,
  reportQE: TimeForm[] | null,
  reportTime: TimeForm[] | null,
  work: WorkForm | null,
  condition: ConditionForm | null,
  operate: OperateForm | null,
  model: String | null,
  chamber?: ChamberForm,
  status: String | null,
  _id?: String | null,
  operateTable?: any

}
interface ChamberForm {
  code: String | undefined,
  name: String | undefined
}

export interface TimeForm {
  at: Number | null,
  startDate: Date | null,
  endDate: Date | null,
  hr: Number | null,
}
export interface WorkForm {
  requestId: String,
  qty: Number,
  controlNo: String,
}

export interface ConditionForm {
  name: String,
  value: Number
}

export interface OperateForm {
  power: ToolForm,
  attachment: ToolForm,
  checker: ToolForm,
  status: Boolean
}
export interface ToolForm {
  code?: String,
  name?: String,
  qty?: Number | String
}




@Component({
  selector: 'app-qe-chamber',
  templateUrl: './qe-chamber.component.html',
  styleUrls: ['./qe-chamber.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QeChamberComponent implements OnInit {
  dataSource: any
  form: any
  chamberTable!: QueueForm[]
  table: any
  nextApprove: any
  userLogin: any;
  authorize = 'qe_engineer'
  userApprove: any = [];

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
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private _userApprove: UserApproveService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    // const id: any = localStorage.getItem('RLS_id')
    // this.$user.getUserById(id).subscribe(res => this.userLogin = res)
  }
  ngOnInit(): void {
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { id } = params;
      const resData = await this.$request.get_id(id).toPromise()
      this.form = resData[0]
      // console.log("🚀 ~ this.form:", this.form)
      const temp = this.setDataTable();
      this.dataSource = temp
      this.getUserApprove()
    })
  }

  emitted(item: any) {
    this.chamberTable = item
  }

  setDataTable() {
    const conditions = this.form.step4.data;
    return conditions.map((condition: any) => {
      return {
        condition: condition,
        ...this.form
      }
    })
  }
  dataChange(e: any) {
    this.chamberTable = e
  }
  tableChange(e: any) {
    this.table = e
    this.form.table = this.table

  }
  approveChange(e: any) {
    this.nextApprove = e
  }



  validButtonSubmit() {
    // const r_find = this.chamberTable.find((d: any) => !d._id);
    // if (r_find) {
    //   return true
    // }
    return false

  }

  // async getUserApprove() {

  //   let userLoginStr: any = localStorage.getItem('RLS_userLogin')
  //   this.userLogin = JSON.parse(userLoginStr)
  //   // console.log(this.form);

  //   if (this.form.level === 7.8) {
  //     this.userApprove = await this._userApprove.getUserApprove(this.userLogin, ['request'])
  //     const prevUser = this.form.step5.find((s: any) => s.level === 7.8)
  //     if (prevUser) {
  //       const select = this.userApprove.find((u: any) => u._id === prevUser.prevUser._id)
  //       this.approve.patchValue(select)
  //     } else {
  //       this.approve.patchValue(this.userApprove[0])
  //     }
  //   } else {
  //     this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
  //     this.approve.patchValue(this.userApprove[0])
  //   }

  // }

  async getUserApprove() {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    let select
    if (this.form.level == 7.8) {
      this.userApprove = await this._userApprove.getUserApprove(this.userLogin, 'request')
      const prevUser = this.form?.step5?.find((s: any) => s.level == 1)?.prevUser
      select = this.userApprove.find((u: any) => u._id == prevUser._id)
    } else {
      if (this.form.status == 'qe_revise' || this.form.status == 'reject_qe_window_person') {
        if (this.form.level == 5.3 || this.form.level == 4.3) {
          this.userApprove = await this._userApprove.getUserApprove(this.userLogin, 'qe_engineer')
          console.log("🚀 ~ this.userApprove:", this.userApprove)
          const prevUser = this.form?.step5?.find((s: any) => s.level == 4)?.prevUser
          console.log("🚀 ~ prevUser:", prevUser)
          select = this.userApprove.find((u: any) => u._id == prevUser?._id)
          console.log("🚀 ~ select:", select)
        } else {
          this.userApprove = await this._userApprove.getUserApprove(this.userLogin, 'request')
          const prevUser = this.form?.step5?.find((s: any) => s.level == 1)?.prevUser
          select = this.userApprove.find((u: any) => u._id == prevUser._id)
        }

      } else {
        this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
        select = this.checkPrevApprove(this.form, 3)
      }
    }


    this.approver = await this._userApprove.approver(this.authorize, this.form.level, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApprove = [this.approver.selected]
      this.approve = this.approver
    } else {
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
    const prevUserApprove = data.step5.find((s: any) => s.level == level)
    if (prevUserApprove) {
      return this.userApprove.find((u: any) => u._id == prevUserApprove.nextUser._id)
    } else {
      return null
    }
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  validReject() {
    if (this.form.level === 7.8) return false
    if (this.form.level === 11) return false
    if (this.form.level === 11.5) return false
    return true
  }

  qeReceiveEmit(e_form: any) {
    this.form = e_form
  }

  chamberValid() {
    if (this.form?.step4?.data?.find((d: any) => d?.value == 0)) return false
    return true
  }

}
