import { UserApproveService } from './../../../services/user-approve.service';
import { RequestHttpService } from './../../../http/request-http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, Validators } from '@angular/forms';
import { ApproverForm } from '../../admin/approver/dialog-approver/dialog-approver.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  userLogin: any;
  form: any
  authorize = 'qe_window_person'
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
    private _loading: NgxUiLoaderService,
    private route: ActivatedRoute,
    private $request: RequestHttpService,
    private _userApprove: UserApproveService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  ngOnInit(): void {
    this._loading.start();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const resData = await this.$request.get_id(id).toPromise()
      this.form = resData[0]
      this.getUserApprove()

    })
  }

  async getUserApprove() {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
    this.approver = await this._userApprove.approver(this.authorize, this.form.level, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApprove = [this.approver.selected]
      this.approve = this.approver
    } else {
      const select = this.checkPrevApprove(this.form, 2)
      console.log('select', select);

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
      console.log(prevUserApprove);

      return this.userApprove.find((u: any) => u._id == prevUserApprove.nextUser._id)
    } else {
      return null
    }
  }
  // async getUserApprove() {
  //   let userLoginStr: any = localStorage.getItem('RLS_userLogin')
  //   this.userLogin = JSON.parse(userLoginStr)
  //   this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)

  //   const prevUser = this.data.step5.find((s: any) => s.level === 3)
  //   if (prevUser) {
  //     const select = this.userApprove.find((u: any) => u._id === prevUser.prevUser._id)
  //     this.approve.patchValue(select)
  //   } else {
  //     this.approve.patchValue(this.userApprove[0])
  //   }

  // }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }
}
