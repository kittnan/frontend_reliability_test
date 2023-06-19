import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { DialogDateStartInspectionComponent } from 'src/app/pages/qe-window-person/qe-chamber/components/dialog-date-start-inspection/dialog-date-start-inspection.component';
import { DialogDateComponent } from 'src/app/pages/qe-window-person/qe-chamber/components/dialog-date/dialog-date.component';
import { DialogQeChamberComponent } from 'src/app/pages/qe-window-person/qe-chamber/components/dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from 'src/app/pages/qe-window-person/qe-chamber/components/dialog-qe-operate/dialog-qe-operate.component';
import { QueueForm } from 'src/app/pages/qe-window-person/qe-chamber/qe-chamber.component';
import { QeChamberService } from 'src/app/pages/qe-window-person/qe-chamber/qe-chamber.service';
import Swal from 'sweetalert2';
import { RevisesQueuesService } from './revises-queues.service';


@Component({
  selector: 'app-revises-queues',
  templateUrl: './revises-queues.component.html',
  styleUrls: ['./revises-queues.component.scss']
})
export class RevisesQueuesComponent implements OnInit {
  @Input() queuesForm: any = null
  @Input() formRevise: any = null
  hourList: any[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]
  queues: any = null
  constructor(
    private dialog: MatDialog,
    private $qe_chamber: QeChamberService,
    private $reviseQueues: RevisesQueuesService
  ) { }
  ngOnInit(): void {
    console.log(this.formRevise);
    this.queues = this.$reviseQueues.mergeOldQueues(this.formRevise.queues, this.queuesForm, this.formRevise)
    console.log("🚀 ~ this.queues:", this.queues)
    // this.queues.map((d: any) => {
    //   this.onCal(d, 0)
    // })
  }

  openDialogInitial(item: any) {
    const dialogRef = this.dialog.open(DialogDateStartInspectionComponent, {
      height: '500px',
      width: '500px',
      data: item
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        item.startDate = res.startDate
        item.h = null
        this.onCal(item, 0)
      }
    })
  }
  async onCal(item: QueueForm, index: number) {
    const startDate: any = item.startDate
    if (startDate) {
      item = this.$qe_chamber.genEndDate(item)
      // item.operateTable = await this.getOperateToolTableAll(startDate)
    }
  }
  // async getOperateToolTableAll(startDate: any) {
  //   const param: HttpParams = new HttpParams().set('startDate', new Date(startDate).toISOString())
  //   const resOperate = await this.$operateItems.remain(param).toPromise()
  //   const mapOperate = resOperate.map((t: any, i: any) => {
  //     return {
  //       position: i + 1,
  //       code: t.code,
  //       type: t.type,
  //       name: t.name,
  //       used: t.stock - t.remain,
  //       remain: t.remain,
  //       total: t.stock,
  //     }
  //   })
  //   return mapOperate

  // }

  openDialogCalendar(time: any, item: QueueForm, i: any, indexTime: any) {
    if (time?.startDate) {
      const dialogRef = this.dialog.open(DialogDateComponent, {
        height: '500px',
        width: '500px',
        data: time
      })
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          time = res
          time.h = null
          // this.onCal(item, i)
        }
      })
    } else {
      Swal.fire('PLEASE SELECT DATE INSPECTION INITIAL !!!', '', 'warning')
    }
  }

  onSelectHour(item: QueueForm, e: any) {
    item.startDate = moment(item.startDate).set('hour', e.value).toDate()
    this.onCal(item, 0)
  }

  onSelectHourEndDate(time: any, item: QueueForm, i: any, e: any) {
    time.endDate = moment(time.endDate).set('hour', e.value).toDate()
    const startMo = moment(new Date(time.startDate))
    const endMo = moment(new Date(time.endDate))
    time.hr = moment(endMo).diff(startMo, 'hour')

    // this.onCal(item, i)
  }

  dialogChamber(item: QueueForm) {
    if (item && item.startDate) {
      const dialogRef = this.dialog.open(DialogQeChamberComponent, {
        data: {
          value: item.condition?.value,
          startDate: item.startDate,
          qty: item.work?.qty
        },

      })
      dialogRef.afterClosed().subscribe(async res => {
        if (res) {
          // console.log(res);

          item.chamber = res
        }

      })
    } else {
      Swal.fire('PLEASE SELECT DATE INSPECTION INITIAL !!!', '', 'warning')

    }

  }

  dialogOperate(item: QueueForm) {
    if (item && item.startDate) {
      const dialogRef = this.dialog.open(DialogQeOperateComponent, {
        data: {
          startDate: item.startDate,
          operate: item.operate
        }
      })
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          item.operate = {
            attachment: res.attachment,
            checker: res.checker,
            power: res.power,
            status: true
          }
        }
      })
    } else {
      Swal.fire('PLEASE SELECT DATE INSPECTION INITIAL !!!', '', 'warning')
    }

  }

  compareSelect(a: any, b: any) {
    if (a && b) {
      return a.code === b.code;
    }
    return false
  }


}
