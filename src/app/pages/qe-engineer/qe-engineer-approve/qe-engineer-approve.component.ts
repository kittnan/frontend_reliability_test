import { ApproverForm } from './../../admin/approver/dialog-approver/dialog-approver.component';
import { UserApproveService } from './../../../services/user-approve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ToastService } from 'src/app/services/toast.service';
import { ApproveService } from '../../shared/approve-form/approve.service';

@Component({
  selector: 'app-qe-engineer-approve',
  templateUrl: './qe-engineer-approve.component.html',
  styleUrls: ['./qe-engineer-approve.component.scss']
})
export class QeEngineerApproveComponent implements OnInit {

  userLogin: any;
  dateNow!: Date

  form: any
  authorize = 'qe_section_head'
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
  auth: any = localStorage.getItem('RLS_authorize')
  selectedFlow: any = 1
  constructor(
    private route: ActivatedRoute,
    private $request: RequestHttpService,
    private _toast: ToastService,
    private _loading: NgxUiLoaderService,
    private _userApprove: UserApproveService,
    private __approve: ApproveService

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
      this.form = resData[0];
      this.getUserApprove()
    })

  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }

  handleUserApprove() {
    if (this.selectedFlow === 1) {
      this.getUserApprove()
    } else {
      this.getUserApproveRequest()
    }
  }


  async getUserApprove() {
    const ses_authorize = localStorage.getItem('RLS_authorize')
    if (ses_authorize == 'qe_engineer') {
      this.authorize = 'qe_engineer2'
    }
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
    this.approver = await this._userApprove.approver(this.authorize, this.form.level, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApprove = [this.approver.selected]
      this.approve = this.approver
    } else {
      const select = this.checkPrevApprove(this.form, this.authorize == 'qe_engineer' ? 4 : 5)
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
  async getUserApproveRequest() {
    this.userApprove = await this._userApprove.getUserApprove(this.userLogin, 'request')
    const requestor = this.form.step5.find((a: any) => a.level === 1)
    const select = this.userApprove.find((a: any) => a._id == requestor.prevUser._id)
    this.approve = {
      groupList: [],
      groupStatus: null,
      level: 5,
      name: null,
      selected: select ? select : this.userApprove[0],
      status: 'qe_section_head'
    }
  }

  handleApprove() {
    let formUp = {
      ...this.form,
      status: 'qe_section_head',
      level: 6
    }
    this.__approve.send(this.userLogin, this.approve, formUp, '')
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

  // async getUserApprove() {
  //   const ses_authorize = localStorage.getItem('RLS_authorize')
  //   if (ses_authorize == 'qe_engineer') {
  //     this.authorize = 'qe_engineer2'
  //   }
  //   let userLoginStr: any = localStorage.getItem('RLS_userLogin')
  //   this.userLogin = JSON.parse(userLoginStr)
  //   this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
  //   this.approve.patchValue(this.userApprove[0])
  // }

  // public objectComparisonFunction = function (option: any, value: any): boolean {
  //   return option._id === value._id;
  // }


}
