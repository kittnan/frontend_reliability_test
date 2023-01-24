import { async } from '@angular/core/testing';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { OperateGroupService } from 'src/app/http/operate-group.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { QueueService } from 'src/app/http/queue.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { DialogQeChamberComponent } from '../../dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from '../../dialog-qe-operate/dialog-qe-operate.component';
import { QueueForm, OperateForm, TimeForm } from '../../qe-chamber.component';
import { QeChamberService } from '../../qe-chamber.service';
import { GenInspectionTableService } from './gen-inspection-table.service';
import { HttpParams } from '@angular/common/http';
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
  requestForm: any
  tableSource: any

  tableData: any = null

  userLogin: any;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  @Output() tableChange: EventEmitter<any> = new EventEmitter()
  constructor(
    private dialog: MatDialog,
    private $qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService,
    private $queue: QueueService,
    private $operateGroup: OperateGroupService,
    private $request: RequestHttpService,
    private $user: UserHttpService,
    private _qenInspectionTable: GenInspectionTableService,
  ) {
    this.$operateItems.get().subscribe(res => this.operateItems = res);
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    // const id: any = localStorage.getItem('RLS_id')
    // this.$user.getUserById(id).subscribe(res => this.userLogin = res)

  }

  ngOnInit(): void {
    // console.log(this.data);

    this.getDraft()
  }

  async getDraft() {
    if (this.data) {
      const queueDraft = await this.$queue.getFormId(this.data[0].work.requestId).toPromise()
      this.data = this.data.map((d: QueueForm) => {
        const draft = queueDraft.find((draft: QueueForm) => draft.condition?.name == d.condition?.name)
        if (draft) {
          return {
            ...d,
            ...draft,
          }
        } else {
          return d
        }
      })
      // console.log(this.data);


      this.requestForm = await this.$request.get_id(this.data[0].work.requestId).toPromise()
      this.mapForTable(this.data)
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
          // console.log(res);

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

  async onCal(item: QueueForm, index: number) {
    const startDate: any = item.startDate
    if (startDate) {
      item = this.$qe_chamber.genEndDate(item)
      const param: HttpParams = new HttpParams().set('startDate', new Date(startDate).toISOString())
      item.operateTable = await this.$operateItems.remain(param).toPromise()
    }
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

  onDelete(item: QueueForm, index: number) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.deleteQueue(item)
        this.getOperateToolTableAll(item, item.startDate)
      }
    })
  }

  async deleteQueue(item: any) {
    if (item._id) {
      const r_delete = await this.$queue.delete(item._id).toPromise()
      if (r_delete && r_delete.acknowledged) {
        Swal.fire('SUCCESS', '', 'success')
        delete item._id
      }
    } else {
    }
  }

  onDraft(item: QueueForm, index: number, startDate: any) {
    Swal.fire({
      title: 'Do you want to save?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        // const body = [item]
        // // console.log(body);



        this.validRemainOperate(item, startDate, index)
      }
    })

  }

  async getOperateToolTableAll(item: any, startDate: any) {
    const param: HttpParams = new HttpParams().set('startDate', new Date(startDate).toISOString())
    item.operateTable = await this.$operateItems.remain(param).toPromise()
    return item.operateTable
  }

  async validRemainOperate(item: any, startDate: any, index: any) {
    item.operateTable = await this.getOperateToolTableAll(item, startDate)
    const operateUse = item.operate
    const attachment: any = item.operateTable.find((t: any) => t.code === operateUse.attachment.code)
    const checker: any = item.operateTable.find((t: any) => t.code === operateUse.checker.code)
    const power: any = item.operateTable.find((t: any) => t.code === operateUse.power.code)
    const obj = {
      data: {
        attachment: 0,
        checker: 0,
        power: 0,
      },
      status: true
    }
    obj.data.attachment = attachment.remain
    obj.data.checker = checker.remain
    obj.data.power = power.remain

    if ((attachment?.remain - operateUse?.attachment?.qty) < 0) {
      obj.status = false;
    }
    if ((checker?.remain - operateUse?.checker?.qty) < 0) {
      obj.status = false;
    }
    if ((power?.remain - operateUse?.power?.qty) < 0) {
      obj.status = false;
    }
    if (obj.status) {
      // if (item._id) {
      //   this.onEdit(item._id, item, index)
      // } else {
      //   this.onInsert(item, index)
      // }
      this.insertDirect([item], index)
    } else {
      const html = `
      <p>
        attachment remain: ${obj.data.attachment}
      </p>
      <p>
        checker remain: ${obj.data.checker}
      </p>
      <p>
        power remain: ${obj.data.power}
      </p>`
      Swal.fire({
        title: `Operate tool!!`,
        icon: 'error',
        html: html
      })
    }
  }

  // ! ยังไม่ใช้
  async onInsert(item: any, index: number) {
    const r_checkQueue = await this.$queue.check(item).toPromise()
    if (r_checkQueue.status) {
      const data = r_checkQueue.text[0]
      const operateStr = JSON.stringify(data.operate)

      if (data.operate.status) {
        const r_checkOperate = await this.$operateGroup.getReady(data.startDate, operateStr).toPromise()
        if (r_checkOperate.status) {
          const data_insert = {
            ...item[0],
            status: 'draft'
          }
          const r_insert = await this.$queue.insert(data_insert).toPromise()
          this.data[index] = r_insert[0]
          Swal.fire('SUCCESS', '', 'success')
          this.mapForTable(this.data)
        } else {
          Swal.fire({
            html: r_checkOperate.text,
            icon: 'error'
          })
        }
      } else {
        const data_insert = {
          ...item[0],
          status: 'draft'
        }
        const r_insert = await this.$queue.insert(data_insert).toPromise()
        this.data[index] = r_insert[0]
        Swal.fire('SUCCESS', '', 'success')
        this.mapForTable(this.data)

      }

    } else {
      Swal.fire({
        html: r_checkQueue,
        icon: 'error'
      })
    }

  }
  async onEdit(id: any, item: any, index: number) {
    const r_checkQueue = await this.$queue.check([item]).toPromise()
    if (r_checkQueue.status) {
      const data = r_checkQueue.text[0]
      const operateStr = JSON.stringify(data.operate)
      if (data.operate.status) {
        const r_checkOperate = await this.$operateGroup.getReady(data.startDate, operateStr).toPromise()
        if (r_checkOperate.status) {
          const r_update = await this.$queue.update(item._id, item).toPromise()
          if (r_update && r_update.acknowledged) {
            Swal.fire('SUCCESS', '', 'success')
            this.mapForTable(this.data)

          } else {
            Swal.fire('', '', 'error')
          }
        } else {
          Swal.fire({
            html: r_checkOperate.text,
            icon: 'error'
          })
        }
      } else {
        const r_update = await this.$queue.update(item._id, item).toPromise()
        if (r_update && r_update.acknowledged) {
          Swal.fire('SUCCESS', '', 'success')
          this.mapForTable(this.data)
        } else {
          Swal.fire('', '', 'error')
        }
      }
    } else {
      Swal.fire(r_checkQueue, '', 'error')
    }

  }
  // ! ยังไม่ใช้

  async insertDirect(item: any, index: number) {
    const newItem = item[0]
    if (newItem._id) {
      const r_update = await this.$queue.update(newItem._id, newItem).toPromise()
      if (r_update && r_update.acknowledged) {
        Swal.fire('SUCCESS', '', 'success')
        this.mapForTable(this.data)
        this.data[index].operateTable = await this.getOperateToolTableAll(newItem, newItem.startDate)

      } else {
        Swal.fire('', '', 'error')
      }
    } else {
      const r_insert = await this.$queue.insert(newItem).toPromise()
      // console.log(r_insert);
      this.data[index] = r_insert[0]
      Swal.fire('SUCCESS', '', 'success')
      this.mapForTable(this.data)
      this.data[index].operateTable = await this.getOperateToolTableAll(newItem, newItem.startDate)

    }
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




  async mapForTable(data: any) {
    const header = data.reduce((prev: any, now: any) => {
      const temp: any = prev
      temp.push(now.condition.name)
      return temp
    }, [])
    const receive = header.map((h: any) => moment(this.requestForm[0].step1.sampleSentToQE_withinDate).format('ddd, D/M/YY h:mm a'))
    const times_inspection = await this.mapTime(data, 'inspectionTime')
    const times_report = await this.mapTime(data, 'reportTime')
    const table_inspection: any = await this._qenInspectionTable.genTable(times_inspection, data, header, 'inspectionTime', times_report)
    this.tableData = {
      header: header,
      receive: receive,
      data: table_inspection
    }
    this.emit()

  }


  mapTime(data: any, key: any) {
    return new Promise(resolve => {
      let times = data.reduce((prev: any, now: any) => {
        const foo = prev.concat(now[key])
        return foo
      }, [])
      times = Object.values(times.reduce((acc: any, cur: any) => Object.assign(acc, { [cur.at]: cur }), {}))
      times.sort((a: any, b: any) => a.at - b.at)
      times.push({ at: -1 })
      resolve(times)
    })
  }

  emit() {
    this.tableChange.emit(this.tableData)
    this.dataChange.emit(this.data)
  }



  async operateAll(startDate: any) {
    const param: HttpParams = new HttpParams().set('startDate', startDate)
    return await this.$operateItems.condition(param).toPromise()

  }





}
