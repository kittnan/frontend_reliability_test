import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';

@Component({
  selector: 'app-revise-qe-report',
  templateUrl: './revise-qe-report.component.html',
  styleUrls: ['./revise-qe-report.component.scss']
})
export class ReviseQeReportComponent implements OnInit {
  data: any
  userLogin: any;

  constructor(
    private route: ActivatedRoute,
    private _request: RequestHttpService,
    private _loading: NgxUiLoaderService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  ngOnInit(): void {
    this._loading.start();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const resData = await this._request.get_id(id).toPromise()
      this.data = resData[0];
      console.log("🚀 ~ this.data:", this.data)
    })
  }
  ngAfterViewChecked(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }
}
