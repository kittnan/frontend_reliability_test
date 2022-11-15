import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
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
    private _qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService
  ) {
    this.$operateItems.get().subscribe(res => this.operateItems = res)
  }

  ngOnInit(): void {
  }

  dialogChamber(item: QueueForm) {
    const dialogRef = this.dialog.open(DialogQeChamberComponent, {
      data: item.condition?.value
    })
    dialogRef.afterClosed().subscribe(async res => {
      if (res) {
        item.chamber = res
        this.emit()
      }

    })
  }

  dialogOperate(item: QueueForm) {
    const dialogRef = this.dialog.open(DialogQeOperateComponent, {
      data: ''
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        item.operate = {
          attachment: res.attachment,
          checker: res.checker,
          power: res.power,
          status: true
        }
        this.emit()
      }
    })
  }

  onSelectHour(item: QueueForm, e: any) {
    item.startDate = moment(item.startDate).set('hour', e.value).toDate()
    this.onCal(item, 0)
  }

  onCal(item: QueueForm, index: number) {
    item = this._qe_chamber.genEndDate(item)
    this.emit()
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
    this.emit()
  }
  onSelectPower(e: any, item: OperateForm) {
    item.power = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }
    this.emit()

  }
  onSelectAttachment(e: any, item: OperateForm) {
    item.attachment = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }
    this.emit()

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
  emit() {
    this.dataChange.emit(this.data)
  }

}
