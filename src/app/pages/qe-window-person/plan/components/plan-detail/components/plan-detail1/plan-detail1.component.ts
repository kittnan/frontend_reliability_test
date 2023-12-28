import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { DialogDateStartInspectionComponent } from 'src/app/pages/qe-window-person/qe-chamber/components/dialog-date-start-inspection/dialog-date-start-inspection.component';
import { DialogDateComponent } from 'src/app/pages/qe-window-person/qe-chamber/components/dialog-date/dialog-date.component';
import Swal from 'sweetalert2';
import { PlanDetail1Service } from './plan-detail1.service';

@Component({
  selector: 'app-plan-detail1',
  templateUrl: './plan-detail1.component.html',
  styleUrls: ['./plan-detail1.component.scss'],
})
export class PlanDetail1Component implements OnInit {
  @Input() index!: number;
  @Input() item: any;
  @Input() formInput: any;

  hourList: any[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  constructor(
    private dialog: MatDialog,
    private planDetail1$: PlanDetail1Service
  ) {}

  ngOnInit(): void {
    // console.log(this.item);
    // console.log(this.formInput);

  }

  openDialogInitial(item: any) {
    const dialogRef = this.dialog.open(DialogDateStartInspectionComponent, {
      height: '500px',
      width: '500px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        item.startDate = res.startDate;
        item.h = null;
        this.onCalNormal(item);
      }
    });
  }

  onCalNormal(item: any) {
    setTimeout(async () => {
      const startDate: any = item.startDate;
      if (startDate) {
        item = this.planDetail1$.genEndDate(item);
        // item.operateTable = await this.getOperateToolTableAll(startDate);
      }
    }, 200);
  }

  onSelectHour(item: any, e: any) {
    item.startDate = moment(item.startDate).set('hour', e.value).toDate();
    this.onCalNormal(item);
  }

  openDialogCalendar(time: any) {
    console.log("🚀 ~ time:", time)
    if (time?.startDate) {
      const dialogRef = this.dialog.open(DialogDateComponent, {
        height: '500px',
        width: '500px',
        data: time,
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          time = res;
          time.h = null;
          // this.onCal(item, i)
        }
      });
    } else {
      Swal.fire('PLEASE SELECT DATE INSPECTION INITIAL !!!', '', 'warning');
    }
  }

  onSelectHourEndDate(time: any, item: any, i: any, e: any) {
    time.endDate = moment(time.endDate).set('hour', e.value).toDate();
    const startMo = moment(new Date(time.startDate));
    const endMo = moment(new Date(time.endDate));
    time.hr = moment(endMo).diff(startMo, 'hour');

    // this.onCal(item, i)
  }
}
