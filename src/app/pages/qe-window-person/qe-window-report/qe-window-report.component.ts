import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';

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

  disableBtn: boolean = true
  constructor(
    private route: ActivatedRoute,
    private _request: RequestHttpService,
    private _loading: NgxUiLoaderService,

  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    // const id: any = localStorage.getItem('RLS_id')
    // this._user.getUserById(id).subscribe(res => this.userLogin = res)
    this.dateNow = new Date()
  }

  ngOnInit(): void {
    this._loading.start();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const resData = await this._request.get_id(id).toPromise()
      this.data = resData[0];
    })


  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }



  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  outDisable(e: any) {
    // console.log(e);
    this.disableBtn = e
  }


}
