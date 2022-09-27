import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { LogFlowService } from 'src/app/services/log-flow.service';
import { ShareFunctionService } from 'src/app/services/share-function.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.scss']
})
export class ApproveRequestComponent implements OnInit {

  request: any;
  userLogin: any;
  userApprove = new FormControl('', Validators.required)
  config_auth = 'qe_window_person'
  userApproveList: any = [];
  dateNow!: Date
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _request: RequestHttpService,
    private _toast: ToastService,
    private _user: UserHttpService,
    private _loading: NgxUiLoaderService,
    private $share: ShareFunctionService

  ) {
    const id: any = localStorage.getItem('_id')
    this._user.getUserById(id).subscribe(res => this.userLogin = res)
    this.dateNow = new Date()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      console.log(params['id']);
      const id = params['id']
      this.request = await this._request.getRequest_formById(id).toPromise()
      const findRequestApprove = this.request.step4.find((r: any) => r.access == 'request_approve')
      if (findRequestApprove) findRequestApprove.time = new Date();
      this.getUserApprove()
    })

    // if (localStorage.getItem('request_id')) {
    //   const id: any = localStorage.getItem('request_id')
    //   this.request = this._request.getRequest_formById(id).toPromise()
    // }
  }
  async getUserApprove() {
    const temp = await this._user.getUserBySection(this.userLogin.section).toPromise();
    this.userApproveList = await this.filterRequestApprove(temp)

  }
  filterRequestApprove(userList: any) {
    return new Promise(resolve => {
      resolve(
        userList.filter((user: any) =>
          user.authorize.find((auth: any) => auth === this.config_auth)
        )

      )
    })
  }
  ngAfterViewInit(): void {
    this._loading.stopAll();
  }

  onClickBack() {
    this.router.navigate(['/approve'])
  }
  onClickReject() {
    Swal.fire({
      title: 'Do you want to reject ?',
      icon: 'question',
      showCancelButton: true,
      input: 'textarea',
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.rejectRequest(value.value)
      }
    })
  }

  onClickApprove() {
    Swal.fire({
      title: 'Do you want to approve ?',
      icon: 'question',
      showCancelButton: true,
      input: 'textarea',
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.updateRequest(value.value)
      }
    })

  }

  async rejectRequest(confirmValue: any) {
    this.request.status = 'reject_request';
    await this._request.updateRequest_form(this.request._id, this.request).toPromise();
    await (await this.$share.insertLogFlow('reject_request', this.request.step1.controlNo, confirmValue, this.userLogin)).toPromise()
    this._toast.success();
    setTimeout(() => {
      this.router.navigate(['/approve']);
    }, 500);
  }
  async updateRequest(confirmValue: any) {
    this.request.status = 'request_approve';
    this.request.step4.push({
      access: 'qe_window_person',
      name: this.userApprove.value,
      status: false,
      time: null
    })
    const resultFind :any= await this.findMe(this.request.step4)
    resultFind.status = true;
    resultFind.time = new Date();
    await this._request.updateRequest_form(this.request._id, this.request).toPromise();
    await (await this.$share.insertLogFlow('request_approve', this.request.step1.controlNo, confirmValue, this.userLogin)).toPromise();
    this._toast.success();
    setTimeout(() => {
      this.router.navigate(['/approve']);
    }, 500);
  }

  findMe(step4:any){
    return new Promise((resolve,reject)=>{
      const resultFind = step4.find((u:any)=> u.access =='request_approve')
      if(resultFind){
        resolve(resultFind)
      }else{
        reject('you not access')
      }
    })
  }

  


}
