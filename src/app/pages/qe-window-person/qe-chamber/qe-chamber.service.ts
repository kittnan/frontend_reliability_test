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
    item.reportTime = this.loopReport(item.reportTime, item.inspectionTime)
    item.reportQE = this.loopReport(item.reportQE, item.inspectionTime)
    const endDate: any = this.loopSum(item.inspectionTime, item.startDate)
    if (endDate) {
      item.endDate = endDate
    }
    return item
  }
  genEndDateWithActualTime(item: any, time: any, date: any) {
    item.inspectionTime = item.inspectionTime.map((t: any, i: any) => {
      if (t.at == time.at) {
        t.startDate = date
        if (i === 0) {
          t.endDate = moment(date).add(Number(t.hr), 'hour').add(Number(t.at)).toDate()
        } else {
          console.log(item.inspectionTime[i - 1], t);

          const newHR = this.calNewHR(item.inspectionTime[i - 1], t)
          console.log("🚀 ~ newHR:", newHR)
          // item.inspectionTime[i - 1].hr = newHR
          // item.inspectionTime[i - 1].endDate = moment(item.inspectionTime[i - 1].endDate).add(Number(t.hr), 'hours').add(diffAt, 'hours').toDate()

          // const diffAt = Number(t.at) - Number(item.inspectionTime[i - 1].at)
          // t.startDate = moment(item.inspectionTime[i - 1].endDate).add(diffAt, 'hours').toDate()
          // t.endDate = moment(item.inspectionTime[i - 1].endDate).add(Number(t.hr), 'hours').add(diffAt, 'hours').toDate()
        }

      } else {

      }

      return t
    })
    // console.log(item.inspectionTime);

  }
  calNewHR(time1: any, time2: any) {
    console.log(time1.endDate, time2.startDate);
    const m1: moment.Moment = moment(time1.endDate)
    const m2: moment.Moment = moment(time2.startDate)
    const newHR = m2.diff(m1, 'hour')
    return newHR
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

  private loopSum(time: TimeForm[] | any, startDate: Date | any) {
    return time[time.length - 1].endDate
  }


}
