import { Injectable } from '@angular/core';
import { QueueForm, TimeForm } from './qe-chamber.component';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class QeChamberService {

  constructor() { }


  generateQueue(chamber: any, e: any) {
    console.log(chamber, e);


  }
  genInspectionTime(time: TimeForm[]) {
    return time.map((t: any) => {
      const temp: TimeForm = {
        at: t,
        startDate: null,
        endDate: null,
        hr: 0
      }
      return temp
    })
  }
  genOperateStatus(str: String) {
    if (str == 'operate') return true
    return false
  }
  genEndDate(item: QueueForm) {
    item.inspectionTime = this.loopTime(item.inspectionTime, item.startDate)
    item.reportTime = this.loopReport(item.reportTime, item.startDate)
    const endDate: any = this.loopSum(item.inspectionTime, item.startDate)
    if (endDate) {
      item.endDate = endDate
    }
    return item
  }

  private loopTime(time: TimeForm[] | any, startDate: Date | any) {
    if (time) {
      return time.map((t: TimeForm, index: number) => {
        t.startDate = moment(startDate).add(Number(t.at), 'hour').toDate()
        t.endDate = moment(t.startDate).add(Number(t.hr), 'hour').toDate()
        return t
      })
    } else {
      return time
    }
  }
  private loopReport(time: TimeForm[] | any, startDate: Date | any) {
    if (time) {
      return time.map((t: TimeForm) => {
        return {
          at: t.at,
          hr: 0,
          startDate: moment(startDate).add(Number(t.at), 'hour').toDate(),
          endDate: moment(startDate).add(Number(t.at), 'hour').toDate()
        }

      })
    }
  }

  private loopSum(time: TimeForm[] | any, startDate: Date | any) {
    if (time) {
      return time.reduce((prev: any, now: TimeForm) => {
        const d = moment(prev)
        d.add(Number(now.at), 'hour');
        d.add(Number(now.hr), 'hour');
        return d.toDate()
      }, startDate)
    }
  }


}
