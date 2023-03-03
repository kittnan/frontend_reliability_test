import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserApproveService } from 'src/app/services/user-approve.service';
import { ApproverForm } from '../../admin/approver/dialog-approver/dialog-approver.component';

@Component({
  selector: 'app-qe-section-head-approve',
  templateUrl: './qe-section-head-approve.component.html',
  styleUrls: ['./qe-section-head-approve.component.scss']
})
export class QeSectionHeadApproveComponent implements OnInit {


  userLogin: any;
  dateNow!: Date

  form: any
  authorize = 'request'
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
      this.form = resData[0];
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
    this.approver = await this._userApprove.approver(this.authorize, this.form.level, this.userLogin)
    if (this.approver && this.approver.groupStatus) {
      this.userApprove = [this.approver.selected]
      this.approve = this.approver
    } else {
      const select = this.checkPrevApprove(this.form, 1)
      console.log("🚀 ~ select:", select)
      this.userApprove = [select]
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
      // console.log(prevUserApprove);

      return this.userApprove.find((u: any) => u._id == prevUserApprove.prevUser._id)
    } else {
      return null
    }
  }

  // async getUserApprove() {
  //   let userLoginStr: any = localStorage.getItem('RLS_userLogin')
  //   this.userLogin = JSON.parse(userLoginStr)
  //   this.userApprove = await this._userApprove.getUserApprove(this.userLogin, this.authorize)
  //   this.approve.patchValue(this.userApprove[0])



  //   const qe_window_person = this.data.step5.find((u: any) => u.level == 1)
  //   if (qe_window_person) {
  //     const findOld = this.userApprove.find((u: any) => u._id == qe_window_person.prevUser._id)
  //     const selected = findOld ? findOld : this.userApprove[0]
  //     this.approve.patchValue(selected)
  //   }


  // }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

}
