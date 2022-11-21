import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { QueueService } from 'src/app/http/queue.service';
import Swal from 'sweetalert2';
import { DialogQeChamberComponent } from '../../dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from '../../dialog-qe-operate/dialog-qe-operate.component';
import { QueueForm, OperateForm } from '../../qe-chamber.component';
import { QeChamberService } from '../../qe-chamber.service';

@Component({
  selector: 'app-qe-chamber-planning-detail',
  templateUrl: './qe-chamber-planning-detail.component.html',
  styleUrls: ['./qe-chamber-planning-detail.component.scss']
})
export class QeChamberPlanningDetailComponent implements OnInit {
  chamberTable!: QueueForm[]
  hourList: any[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]
  operateItems: any[] = []

  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  constructor(
    private dialog: MatDialog,
    private $qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService,
    private $queue: QueueService
  ) {
    this.$operateItems.get().subscribe(res => this.operateItems = res)
  }

  ngOnInit(): void {
    this.getDraft()
  }

  async getDraft() {
    console.log('test@', this.data);
    if (this.data) {
      const queueDraft = await this.$queue.getFormId(this.data[0].work.requestId).toPromise()
      this.data = this.data.map((d: QueueForm) => {
        const draft = queueDraft.find((draft: QueueForm) => draft.condition?.name == d.condition?.name)
        if (draft) {
          return {
            ...d,
            ...draft
          }
        } else {
          return d
        }
      })
      console.log('!!', this.data);

    }
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
          item.chamber = res
        }

      })
    } else {
      Swal.fire('PLEASE SELECT DATE START!!!', '', 'warning')
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
      Swal.fire('PLEASE SELECT DATE START!!!', '', 'warning')
    }

  }

  onSelectHour(item: QueueForm, e: any) {
    item.startDate = moment(item.startDate).set('hour', e.value).toDate()
    this.onCal(item, 0)
  }

  onCal(item: QueueForm, index: number) {
    item = this.$qe_chamber.genEndDate(item)
  }

  compareSelect(a: any, b: any) {
    if (a && b) {
      return a.code === b.code;
    }
    return false
  }

  onSelectChecker(e: any, item: OperateForm) {
    item.checker = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }
  }
  onSelectPower(e: any, item: OperateForm) {
    item.power = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }

  }
  onSelectAttachment(e: any, item: OperateForm) {
    item.attachment = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }

  }

  onDraft(item: QueueForm, index: number) {
    console.log(item);

    const body = [item]
    if (item._id) {
      this.onEdit(item._id, item)
    } else {
      this.onInsert(body, index)
    }

  }

  onInsert(item: any, index: number) {
    this.$queue.insert(item).subscribe(res => {
      if (res && res.status) {
        this.data[index] = res.text
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res.text, '', 'error')
      }
    })
  }
  onEdit(id: any, item: any) {
    this.$queue.update(id, item).subscribe(res => {
      if (res && res.acknowledged) {
        Swal.fire('SUCCESS', '', 'success')
      } else {
        Swal.fire(res.text, '', 'error')
      }
    })
  }



  showOperateItemChecker(operateItems: any) {
    return operateItems.filter((item: any) => item.type === 'checker')
  }
  showOperateItemPower(operateItems: any) {
    return operateItems.filter((item: any) => item.type === 'power')
  }
  showOperateItemAttachment(operateItems: any) {
    return operateItems.filter((item: any) => item.type === 'attachment')
  }



  async submit() {
    const ff = this.data.find((d: any) => !d._id)
    console.log(ff);
    if (ff) {
      Swal.fire('SOME CONDITION NOT READY', '', 'error')
    } else {
      this.$queue.updateMany(this.data).subscribe(res => {
        console.log(res);
        if (res && res.status) {
          Swal.fire('SUCCESS', '', 'success')
        } else {
          Swal.fire(res.text, '', 'error')
        }
      })
    }




  }


}
