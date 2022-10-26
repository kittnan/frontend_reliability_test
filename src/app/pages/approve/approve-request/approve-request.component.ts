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
  // userApprove = new FormControl('', Validators.required)
  config_auth = 'qe_window_person'
  dateNow!: Date


  data: any
  authorize = 'qe_window_person'
  userApprove: any = [];
  approve = new FormControl(null, Validators.required)
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
      const resData = await this._request.getRequest_formById(id).toPromise()
      console.log(resData);

      this.data = resData[0];
      this.getUserApprove()

    })


  }


  async getUserApprove() {
    const _id: any = localStorage.getItem("_id")
    this.userLogin = await this._user.getUserById(_id).toPromise();
    console.log(this.userLogin);
    const section = [this.userLogin.section]
    const temp_section = JSON.stringify(section)
    const level = [this.authorize]
    const temp_level = JSON.stringify(level)
    this.userApprove = await this._user.getUserBySection(temp_section, temp_level).toPromise();
    console.log(this.userApprove);
    this.approve.patchValue(this.userApprove[0])
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }


}
