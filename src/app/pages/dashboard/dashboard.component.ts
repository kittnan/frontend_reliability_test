import { interval, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { OperateItemsHttpService } from './../../http/operate-items-http.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date: any = new Date()
  item: any

  interval$!: Subscription;
  constructor(
    private $operate: OperateItemsHttpService,
    private _loading: NgxUiLoaderService
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
    const res = await this.$operate.remain(new HttpParams().set('startDate', new Date(this.date).toISOString())).toPromise()
    this.item = res.map((t: any, i: any) => {
      return {
        position: i + 1,
        code: t.code,
        type: t.type,
        name: t.name,
        total: ` ${t.remain} / ${t.stock}`
      }
    })

  }

}
