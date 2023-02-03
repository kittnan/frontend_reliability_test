import { interval, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { OperateItemsHttpService } from './../../http/operate-items-http.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';

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
  interval$!: Subscription;
  constructor(
    private $operate: OperateItemsHttpService,
    private _loading: NgxUiLoaderService,
    private $request: RequestHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    this._loading.start()
    this.getData()
    this.setIntervalUpdate()
  }

  setIntervalUpdate() {
    this.interval$ = interval(60000).subscribe(res => this.getData())
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
    const param: HttpParams = new HttpParams().set('startDate', new Date(this.date).toISOString())
    this.getCorporateData(param)
    this.getSectionData(param)
    this.getOperateItem(param)
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
    this.corporate = await this.$request.sectionRemain(param).toPromise()
  }

}
