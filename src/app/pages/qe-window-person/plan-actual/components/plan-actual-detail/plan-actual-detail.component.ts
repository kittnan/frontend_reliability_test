import { Component, Input, OnInit } from '@angular/core';
import { QeChamberService } from '../../../qe-chamber/qe-chamber.service';
import * as moment from 'moment';

@Component({
  selector: 'app-plan-actual-detail',
  templateUrl: './plan-actual-detail.component.html',
  styleUrls: ['./plan-actual-detail.component.scss'],
})
export class PlanActualDetailComponent implements OnInit {
  @Input() queues: any;
  constructor(private $qe_chamber: QeChamberService) {}

  ngOnInit(): void {
    console.log(this.queues);
  }

  jump2(id: string) {
    setTimeout(() => {
      (document.getElementById(id) as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 500);
  }

  handleOverPlan(time: any) {
    if (!time.onPlan) {
      const endM = moment(time.endDate);
      const startM = moment(time.startDate);
      const diffHr = moment().diff(startM, 'hour');

      if (diffHr > 0) {
        time.overPlanHr = diffHr;
        time.startDate = moment().toDate();
      }
      // this.onCalActual(time);
    }
  }

  onCalActual(item: any) {
    const today = moment();

    // item.startDate = moment()
  }
  onConfirmActual(item: any, index: number) {}

  validateOnPlan(endDate: any) {
    if (endDate) {
      const endM = moment(endDate);
      if (moment().isAfter(endM)) {
        return true;
      }
    } else {
      true;
    }
    return false;
  }
}
