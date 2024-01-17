import { Injectable } from '@angular/core';
import { QueueForm, TimeForm } from './qe-chamber.component';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class QeChamberService {
  constructor() {}

  generateQueue(chamber: any, e: any) {}
  genInspectionTime(time: TimeForm[]) {
    return time.map((t: any) => {
      const temp: TimeForm = {
        at: t,
        startDate: null,
        endDate: null,
        hr: 0,
      };
      return temp;
    });
  }
  genOperateStatus(str: String) {
    if (str == 'operate') return true;
    return false;
  }
  genEndDate(item: any) {
    item.inspectionTime = this.loopTime(item.inspectionTime, item.startDate);
    item.reportTime = this.loopReport(item.reportTime, item.inspectionTime);
    item.reportQE = this.loopReport(item.reportQE, item.inspectionTime);
    const endDate: any = this.loopSum(item.inspectionTime, item.startDate);
    if (endDate) {
      item.endDate = endDate;
    }
    console.log('🚀 ~ item:', item);
    return item;
  }
  genEndDateActual(item: any) {
    item.inspectionTime = this.loopTime(item.inspectionTime, item.startDate);
    item.actualTime = this.loopTime(item.actualTime, item.startDate);

    item.reportTime = this.loopReport(item.reportTime, item.inspectionTime);
    item.reportQE = this.loopReport(item.reportQE, item.inspectionTime);
    const endDate: any = this.loopSum(item.actualTime, item.startDate);
    if (endDate) {
      item.endDate = endDate;
    }
    return item;
  }
  genEndDateWithActualTime(item: any, time: any, date: any) {
    const foo = item.actualTime.map((actualTime: any, i: number) => {
      if (actualTime.at == time.at) {
        actualTime.startDate = date;
        if (i === 0) {
          actualTime.endDate = moment(actualTime.startDate)
            .add(Number(actualTime.hr), 'hour')
            .toDate();
        } else {
          actualTime.endDate = moment(actualTime.startDate)
            .add(Number(actualTime.hr), 'hour')
            .toDate();
        }
      } else {
        if (i === 0) {
          actualTime.endDate = moment(actualTime.startDate)
            .add(Number(actualTime.hr), 'hour')
            .toDate();
        } else {
          const prevItem = item.actualTime[i - 1];
          const diff = actualTime.at - prevItem.at;
          actualTime.startDate = moment(prevItem.endDate)
            .add(diff, 'hours')
            .toDate();
          actualTime.endDate = moment(prevItem.endDate)
            .add(Number(actualTime.hr), 'hours')
            .add(diff, 'hours')
            .toDate();
        }
      }
      return actualTime;
    });
    const endDate: any = this.loopSum(foo, item.startDate);
    if (endDate) {
      item.endDate = endDate;
    }
    return foo;
  }
  // genEndDateWithActualTime(item: any, time: any, date: any) {
  //   item.actualTime = item.actualTime.map((t: any, i: any) => {
  //     if (t.at == time.at) {
  //       t.startDate = date

  //       if (i === 0) {
  //         t.endDate = moment(date).add(Number(t.hr), 'hour').add(Number(t.at)).toDate()
  //       } else {
  //         console.log(item.actualTime[i - 1]);

  //         const newHR = this.calNewHR(item.actualTime[i - 1], t)
  //         item.actualTime[i - 1].hr = newHR
  //         const diffAt = Number(t.at) - Number(item.actualTime[i - 1].at)
  //         item.actualTime[i - 1].endDate = moment(item.actualTime[i - 1].endDate).add(Number(t.hr), 'hours').add(diffAt, 'hours').toDate()

  //         // t.startDate = moment(item.actualTime[i - 1].endDate).add(diffAt, 'hours').toDate()
  //         // t.endDate = moment(item.actualTime[i - 1].endDate).add(Number(t.hr), 'hours').add(diffAt, 'hours').toDate()
  //       }

  //     } else {
  //       console.log(t);

  //       if (i === 0) {
  //         t.startDate = moment(date).add(Number(t.at), 'hour').toDate()
  //         t.endDate = moment(date).add(Number(t.hr), 'hour').add(Number(t.at)).toDate()
  //       } else {
  //         const diffAt = Number(t.at) - Number(item.actualTime[i - 1].at)
  //         t.startDate = moment(item.actualTime[i - 1].endDate).add(diffAt, 'hours').toDate()
  //         t.endDate = moment(item.actualTime[i - 1].endDate).add(Number(t.hr), 'hours').add(diffAt, 'hours').toDate()
  //       }
  //     }

  //     return t
  //   })
  //   console.log(item);
  //   return item

  // }
  calNewHR(time1: any, time2: any) {
    const m1: moment.Moment = moment(time1.endDate);
    const m2: moment.Moment = moment(time2.startDate);
    const newHR = m2.diff(m1, 'hour');
    return time1.hr + newHR;
  }

  private loopTime(time: TimeForm[] | any, startDate: Date | any) {
    if (time) {
      return time.map((t: TimeForm, index: number) => {
        if (index === 0) {
          t.startDate = moment(startDate).add(Number(t.at), 'hour').toDate();
          t.endDate = moment(startDate)
            .add(Number(t.hr), 'hour')
            .add(Number(t.at))
            .toDate();
        } else {
          const diffAt = Number(t.at) - Number(time[index - 1].at);
          t.startDate = moment(time[index - 1].endDate)
            .add(diffAt, 'hours')
            .toDate();
          t.endDate = moment(time[index - 1].endDate)
            .add(Number(t.hr), 'hours')
            .add(diffAt, 'hours')
            .toDate();
        }

        return t;
      });
    } else {
      return time;
    }
  }
  private loopReport(
    report: TimeForm[] | any,
    inspectionTime: TimeForm[] | null
  ) {
    if (report) {
      return report.map((t: TimeForm) => {
        const foundItem = inspectionTime?.find((i: TimeForm) => i.at === t.at);
        if (foundItem) {
          return {
            at: t.at,
            hr: t.hr ? t.hr : 0,
            startDate: foundItem.startDate,
            endDate: foundItem.startDate,
            resultDetail: '',
          };
        } else {
          return {};
        }
      });
    }
  }
  compareDate(d1: any, d2: any) {
    console.log('🚀 ~ d1:', d1);
    console.log('🚀 ~ d2:', d2);
    console.log(moment(d1).diff(moment(d2), 'hour'));
    if (moment(d1).diff(moment(d2), 'hour') >= 0) {
      return moment(d1).toDate();
    }
    if (moment(d1).diff(moment(d2), 'hour') < 0) {
      return moment(d2).toDate();
    }
    return moment(d2).toDate();
  }

  private loopSum(time: TimeForm[] | any, startDate: Date | any) {
    return time[time.length - 1].endDate;
  }
}
