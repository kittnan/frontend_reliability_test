import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-daily-remain2',
  templateUrl: './daily-remain2.component.html',
  styleUrls: ['./daily-remain2.component.scss']
})
export class DailyRemain2Component implements OnInit {
  @Input() daily: any
  constructor() { }

  ngOnInit(): void {
    this.daily = this.daily.sort((a: any, b: any) => {
      const a_date = moment(a.atItem.endDate)
      const b_date = moment(b.atItem.endDate)
      if (a_date.isAfter(b_date)) return b
      return a
    })
  }

}
