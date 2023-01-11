import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { ShareFunctionService } from 'src/app/services/share-function.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-qe-window-report',
  templateUrl: './qe-window-report.component.html',
  styleUrls: ['./qe-window-report.component.scss']
})
export class QeWindowReportComponent implements OnInit {

  request: any;
  userLogin: any;
  // userApprove = new FormControl('', Validators.required)
  dateNow!: Date


  data: any
  authorize = 'qe_engineer'
  userApprove: any = [];
  approve = new FormControl(null, Validators.required)
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _request: RequestHttpService,
    private _toast: ToastService,
    private _user: UserHttpService,
    private _loading: NgxUiLoaderService,
    private $share: ShareFunctionService

  ) {
    const id: any = sessionStorage.getItem('_id')
    this._user.getUserById(id).subscribe(res => this.userLogin = res)
    this.dateNow = new Date()
  }

  ngOnInit(): void {
    this._loading.start();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const resData = await this._request.get_id(id).toPromise()
      this.data = resData[0];
      this.getUserApprove()

    })


  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }


  async getUserApprove() {
    const _id: any = sessionStorage.getItem("_id")
    this.userLogin = await this._user.getUserById(_id).toPromise();
    const section = [this.userLogin.section]
    const temp_section = JSON.stringify(section)
    const level = [this.authorize]
    const temp_level = JSON.stringify(level)
    this.userApprove = await this._user.getUserBySection(temp_section, temp_level).toPromise();
    this.approve.patchValue(this.userApprove[0])
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }




}
