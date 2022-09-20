import { Component, Input, OnInit } from '@angular/core';
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
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      console.log(params['id']);
      const id = params['id']
      this.request = await this._request.getRequest_formById(id).toPromise()
      console.log(this.request);
    })

    // if (localStorage.getItem('request_id')) {
    //   const id: any = localStorage.getItem('request_id')
    //   this.request = this._request.getRequest_formById(id).toPromise()
    // }
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
        let ourAccess = this.request.step4.find((a: any) => a.name._id === this.userLogin._id)
        if (ourAccess) {
          this.rejectRequest(ourAccess, value.value)

        } else {
          Swal.fire(`Do not access !!!`, '', 'warning');
          setTimeout(() => {
            this.router.navigate(['/approve'])
          }, 500);
        }
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
        let ourAccess = this.request.step4.find((a: any) => a.name._id === this.userLogin._id)
        if (ourAccess) {
          this.updateRequest(ourAccess, value.value)
        } else {
          Swal.fire(`Do not access !!!`, '', 'warning');
          setTimeout(() => {
            this.router.navigate(['/approve'])
          }, 500);
        }

      }
    })

  }

  async rejectRequest(ourAccess: any, confirmValue: any) {
    ourAccess.time = null
    ourAccess.status = true;
    this.request.status = 'reject_request';
    await this._request.updateRequest_form(this.request._id, this.request).toPromise();
    await (await this.$share.insertLogFlow('request_approve', this.request.step1.controlNo, confirmValue, this.userLogin)).toPromise()
    this._toast.success();
    setTimeout(() => {
      this.router.navigate(['/approve']);
    }, 500);
  }
  async updateRequest(ourAccess: any, confirmValue: any) {
    ourAccess.time = new Date();
    ourAccess.status = true;
    this.request.status = 'request_approved';
    await this._request.updateRequest_form(this.request._id, this.request).toPromise();
    await (await this.$share.insertLogFlow('request_approve', this.request.step1.controlNo, confirmValue, this.userLogin)).toPromise();
    this._toast.success();
    setTimeout(() => {
      this.router.navigate(['/approve']);
    }, 500);
  }



}
