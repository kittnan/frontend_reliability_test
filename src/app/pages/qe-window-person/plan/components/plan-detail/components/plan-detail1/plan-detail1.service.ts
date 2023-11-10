import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TimeForm } from 'src/app/pages/qe-window-person/qe-chamber/qe-chamber.component';

@Injectable({
  providedIn: 'root',
})
export class PlanDetail1Service {
  constructor() {}
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

  private loopSum(time: TimeForm[] | any, startDate: Date | any) {
    return time[time.length - 1].endDate;
  }
}
