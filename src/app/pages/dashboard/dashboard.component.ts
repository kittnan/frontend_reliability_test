import { TableOperateRemainComponent } from './components/table-operate-remain/table-operate-remain.component';
import { interval, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { OperateItemsHttpService } from './../../http/operate-items-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { TableChamberComponent } from './components/table-chamber/table-chamber.component';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  date: any = moment().startOf('days').toISOString()
  item: any
  corporate: any
  section: any
  dailyRemain: any
  chamber: any
  operate: any
  reportStatus: any
  interval$!: Subscription;

  show = true

  @ViewChild(TableOperateRemainComponent) childOperate!: TableOperateRemainComponent;
  @ViewChild(TableChamberComponent) childChamber!: TableChamberComponent;
  constructor(
    private $operate: OperateItemsHttpService,
    private _loading: NgxUiLoaderService,
    private $request: RequestHttpService
  ) {
    this.range.setValue({
      start: new Date(moment().startOf('day').toISOString()),
      end: new Date(moment().endOf('day').toISOString())
    })
  }

  async ngOnInit(): Promise<void> {
    this._loading.start()
    this.getData()
  }

  setIntervalUpdate() {
    this.interval$ = interval(30000).subscribe(res => this.getData())
  }
  clearInterval() {
    this.interval$.unsubscribe()
  }
  ngOnDestroy(): void {
    this.clearInterval()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll()
      this.setIntervalUpdate()
    }, 1000);
  }

  changeDate() {
    this.range.patchValue({
      start: new Date(moment(this.date).startOf('day').toISOString()),
      end: new Date(moment(this.date).endOf('day').toISOString()),
    })
    if (this.range.value.start && this.range.value.end) {
      this.show = false
      this.clearInterval()
      this._loading.start()
      // this.date = moment(this.date).startOf('days').toISOString()
      this.getData()
      setTimeout(() => {
        this.show = true
        this.setIntervalUpdate()
        this._loading.stopAll()
      }, 1000);
    }

  }

  async getData() {
    // alert(this.date)
    const start = moment(this.range.value.start).startOf('day').toISOString()
    const end = moment(this.range.value.end).endOf('day').toISOString()
    const param: HttpParams = new HttpParams().set('startDate', start).set('endDate', end)
    this.getCorporateData(param)
    this.getSectionData(param)
    // this.getOperateItem(param)
    this.getDailyRemainData(param)
    this.getChamberData(param)
    this.getOperateData(param)
    this.getReportStatus(param)
  }

  async getOperateItem(param: HttpParams) {
    const res = await this.$operate.remain(param).toPromise()
    this.item = res.map((t: any, i: any) => {
      return {
        position: i + 1,
        code: t.code,
        type: t.type,
        name: t.name,
        used: t.stock - t.remain,
        remain: t.remain,
        total: t.stock,
      }
    })
  }

  async getCorporateData(param: HttpParams) {
    this.corporate = await this.$request.corporateRemain(param).toPromise()
  }
  async getSectionData(param: HttpParams) {
    this.section = await this.$request.sectionRemain(param).toPromise()
  }
  async getChamberData(param: HttpParams) {
    this.chamber = await this.$request.chamberRemain(param).toPromise()
    if (this.childChamber) {
      this.childChamber.ngOnInit()
      this.childChamber.ngAfterViewInit()
    }
  }
  async getOperateData(param: HttpParams) {
    this.operate = await this.$request.operateRemain(param).toPromise()
    if (this.childOperate) {
      this.childOperate.ngOnInit()
      this.childOperate.ngAfterViewInit()
    }
  }
  async getDailyRemainData(param: HttpParams) {
    const prevData = this.dailyRemain ? [...this.dailyRemain] : []
    const res: any = await this.$request.dailyRemain(param).toPromise()
    if (res && res.length != prevData.length) {
      this.dailyRemain = undefined
      this.dailyRemain = res
    } else {
      this.dailyRemain = prevData
    }
  }
  async getReportStatus(param: HttpParams) {
    const prevData = this.reportStatus ? [...this.reportStatus] : []
    const res: any = await this.$request.reportStatus(param).toPromise()
    if (res && res.length != prevData.length) {
      this.reportStatus = undefined
      this.reportStatus = res
    } else {
      this.reportStatus = prevData
    }
  }

  scrollTo(id: string) {
    let elem = document.getElementById(id) as HTMLElement
    elem.scrollIntoView()
  }


}
