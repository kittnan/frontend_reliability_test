import { TableOperateRemainComponent } from './components/table-operate-remain/table-operate-remain.component';
import { interval, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { OperateItemsHttpService } from './../../http/operate-items-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { TableChamberComponent } from './components/table-chamber/table-chamber.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date: any = new Date()
  item: any
  corporate: any
  section: any
  dailyRemain: any
  chamber: any
  operate: any
  interval$!: Subscription;

  @ViewChild(TableOperateRemainComponent) childOperate!: TableOperateRemainComponent;
  @ViewChild(TableChamberComponent) childChamber!: TableChamberComponent;
  constructor(
    private $operate: OperateItemsHttpService,
    private _loading: NgxUiLoaderService,
    private $request: RequestHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    this._loading.start()
    this.getData()
  }

  setIntervalUpdate() {
    this.interval$ = interval(10000).subscribe(res => this.getData())
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
    this.clearInterval()
    this._loading.start()
    this.getData()
    setTimeout(() => {
      this._loading.stopAll()
      this.setIntervalUpdate()
    }, 1000);
  }

  async getData() {
    // alert(this.date)
    const param: HttpParams = new HttpParams().set('startDate', new Date(this.date).toISOString())
    this.getCorporateData(param)
    this.getSectionData(param)
    // this.getOperateItem(param)
    this.getDailyRemainData()
    this.getChamberData(param)
    this.getOperateData(param)
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
  async getDailyRemainData() {
    this.dailyRemain = await this.$request.dailyRemain().toPromise()
  }

  scrollTo(id: string) {
    let elem = document.getElementById(id) as HTMLElement
    elem.scrollIntoView()
  }


}
