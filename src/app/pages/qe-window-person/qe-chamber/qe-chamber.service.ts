import { Injectable } from '@angular/core';
import { QueueForm, TimeForm } from './qe-chamber.component';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class QeChamberService {

  constructor() { }


  generateQueue(chamber: any, e: any) {

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
    // console.log("🚀 ~ item.inspectionTime:", item.inspectionTime)
    item.reportTime = this.loopReport(item.reportTime, item.inspectionTime)
    item.reportQE = this.loopReport(item.reportQE, item.inspectionTime)
    console.log("🚀 ~ item:", item)
    const endDate: any = this.loopSum(item.inspectionTime, item.startDate)
    if (endDate) {
      item.endDate = endDate
    }
    return item
  }

  private loopTime(time: TimeForm[] | any, startDate: Date | any) {
    if (time) {
      return time.map((t: TimeForm, index: number) => {
        if (index === 0) {
          t.startDate = moment(startDate).add(Number(t.at), 'hour').toDate()
          t.endDate = moment(startDate).add(Number(t.hr), 'hour').add(Number(t.at)).toDate()
        } else {
          const diffAt = Number(t.at) - Number(time[index - 1].at)
          t.startDate = moment(time[index - 1].endDate).add(diffAt, 'hours').toDate()
          t.endDate = moment(time[index - 1].endDate).add(Number(t.hr), 'hours').add(diffAt, 'hours').toDate()
        }

        return t
      })
    } else {
      return time
    }
  }
  private loopReport(report: TimeForm[] | any, inspectionTime: TimeForm[] | null) {
    if (report) {
      return report.map((t: TimeForm) => {
        const foundItem = inspectionTime?.find((i: TimeForm) => i.at === t.at)
        if (foundItem) {
          return {
            at: t.at,
            hr: 0,
            startDate: foundItem.startDate,
            endDate: foundItem.startDate,
            resultDetail: ''
          }
        } else {
          return {

          }
        }


      })
    }
  }
  private loopReportQE(time: TimeForm[] | any, startDate: Date | any) {
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

  private loopSum(time: TimeForm[] | any, startDate: Date | any) {
    return time[time.length - 1].endDate
    // if (time) {
    //   return time.reduce((prev: any, now: TimeForm) => {
    //     const d = moment(prev)
    //     d.add(Number(now.at), 'hour');
    //     d.add(Number(now.hr), 'hour');
    //     return d.toDate()
    //   }, startDate)
    // }
  }


}
