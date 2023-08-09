import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardHttpService } from 'src/app/http/dashboard-http.service';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {

  date = new Date()

  corporate: any = null
  section: any = null
  daily: any = null
  report: any = null
  chamber: any = null
  operate: any = null
  testPurpose: any = null
  constructor(
    private $dashboard: DashboardHttpService,
    private $load: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  changeDate(date: any) {
    console.log(date);
    this.date = date
    this.getData()
  }

  getData() {
    this.$load.start()
    const params: HttpParams = new HttpParams().set('date', moment(this.date).toISOString())
    this.corporateFn(params)
    this.sectionFn(params)
    this.dailyFn(params)
    this.reportFn(params)
    this.chamberFn(params)
    this.operateFn(params)
    this.testPurposeFn(params)
    setTimeout(() => {
      this.$load.stop()
    }, 1000);
  }
  async corporateFn(params: HttpParams) {
    const res: any = await this.$dashboard.corporate(params).toPromise()
    this.corporate = null
    this.corporate = res
  }
  async sectionFn(params: HttpParams) {
    const res: any = await this.$dashboard.section(params).toPromise()
    this.section = null
    this.section = res
  }
  async dailyFn(params: HttpParams) {
    const res: any = await this.$dashboard.daily(params).toPromise()
    this.daily = null
    this.daily = res
  }
  async reportFn(params: HttpParams) {
    const res: any = await this.$dashboard.report(params).toPromise()
    this.report = null
    this.report = res
  }
  async chamberFn(params: HttpParams) {
    const res: any = await this.$dashboard.chamber(params).toPromise()
    this.chamber = null
    setTimeout(() => {
      this.chamber = res
    }, 1000);
  }
  async operateFn(params: HttpParams) {
    const res: any = await this.$dashboard.operate(params).toPromise()
    this.operate = null
    setTimeout(() => {
      this.operate = res
    }, 1000);
  }
  async testPurposeFn(params: HttpParams) {
    const res: any = await this.$dashboard.testPurpose(params).toPromise()
    this.testPurpose = null
    this.testPurpose = res
  }

}
