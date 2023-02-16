import { ApproverForm } from './../../admin/approver/dialog-approver/dialog-approver.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserApproveService } from 'src/app/services/user-approve.service';

@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.scss']
})
export class ApproveRequestComponent implements OnInit {

  userLogin: any;
  dateNow!: Date

  data: any
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
    private route: ActivatedRoute,
    private $request: RequestHttpService,
    private _loading: NgxUiLoaderService,
    private _userApprove: UserApproveService

  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    // const id: any = localStorage.getItem('RLS_id')
    // this.$user.getUserById(id).subscribe(res => this.userLogin = res)
    this.dateNow = new Date()
  }

  ngOnInit(): void {
    this._loading.start();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const resData = await this.$request.get_id(id).toPromise()
      this.data = resData[0]
      this.getUserApprove()

    })


  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }


  async getUserApprove() {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
    this.approver = await this._userApprove.approver(this.authorize, this.data.level, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApprove = [this.approver.selected]
      this.approve = this.approver
    } else {
      this.approve = {
        groupList: this.approver ? this.approver.groupList : [],
        groupStatus: null,
        level: this.data.level,
        name: null,
        selected: this.checkPrevApprove(this.data, 2) ? true : this.userApprove[0],
        status: this.data.status
      }
    }
  }

  private checkPrevApprove(data: any, level: number) {
    const prevUserApprove = data.step5.find((s: any) => s.level == level)
    if (prevUserApprove) {
      return prevUserApprove
    } else {
      return null
    }
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }


}
