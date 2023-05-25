import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperateGroupService } from 'src/app/http/operate-group.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { QueueService } from 'src/app/http/queue.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { GenInspectionTableService } from '../../../qe-chamber/qe-chamber-planning-detail/gen-inspection-table.service';
import { QeChamberService } from '../../../qe-chamber/qe-chamber.service';
import { OperateForm, QueueForm } from '../../../qe-chamber/qe-chamber.component';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { DialogDateStartInspectionComponent } from '../../../qe-chamber/components/dialog-date-start-inspection/dialog-date-start-inspection.component';
import { DialogDateComponent } from '../../../qe-chamber/components/dialog-date/dialog-date.component';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { DialogQeChamberComponent } from '../../../qe-chamber/components/dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from '../../../qe-chamber/components/dialog-qe-operate/dialog-qe-operate.component';
import { QueuesRevisesService } from 'src/app/http/queues-revises.service';

@Component({
  selector: 'app-planning-queues',
  templateUrl: './planning-queues.component.html',
  styleUrls: ['./planning-queues.component.scss']
})
export class PlanningQueuesComponent implements OnInit {

  @Input() queues: any = null
  tempQueues: any = null
  userLogin: any = null
  requestForm: any = null
  minDateInitial = new Date()
  @Input() formInput: any;
  tableData: any = null

  hourList: any[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]

  @Output() canApprove: EventEmitter<boolean> = new EventEmitter(false)

  constructor(
    private dialog: MatDialog,
    private $qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService,
    private $queue: QueueService,
    private $queues_revises: QueuesRevisesService,
    private $request: RequestHttpService,
    private _qenInspectionTable: GenInspectionTableService,
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }


  async ngOnInit(): Promise<void> {
    this.tempQueues = [...this.queues]
    if (this.queues) {
      this.queues = await this.getQueuesDraft(this.queues)
      console.log("🚀 ~ this.queues:", this.queues)
      this.tableData = await this.mapForTable(this.queues)
      console.log("🚀 ~ this.tableData:", this.tableData)
      this.queues.map((d: any) => {
        this.onCal(d)
      })
      this.handleValidApprove()
    }
  }

  private async getQueuesDraft(newQueues: any) {
    const queueDraft = await this.$queue.getFormId(newQueues[0].work.requestId).toPromise()
    const queueDraftRevises = await this.$queues_revises.getFormId(newQueues[0].work.requestId).toPromise()
    const mergeQueues = [...queueDraft, ...queueDraftRevises]

    newQueues = newQueues.map((d: QueueForm) => {
      const draft = mergeQueues.find((draft: QueueForm) => {
        return draft.condition?.name == d.condition?.name
      })
      if (draft) {
        const inspectionTime = d?.inspectionTime?.map((d: any) => {
          const a = draft.inspectionTime.find((g: any) => g.at == d.at)
          if (a) return a
          return d
        })
        const reportQE = d?.reportQE?.map((d: any) => {
          const a = draft.reportQE.find((g: any) => g.at == d.at)
          if (a) return a
          return d
        })
        const reportTime = d?.reportTime?.map((d: any) => {
          const a = draft.reportTime.find((g: any) => g.at == d.at)
          if (a) return a
          return d
        })
        draft['inspectionTime'] = inspectionTime
        draft['reportQE'] = reportQE
        draft['reportTime'] = reportTime
        return {
          ...d,
          ...draft,
          _id: d._id
        }
      } else {
        return d
      }
    })


    this.requestForm = await this.$request.get_id(newQueues[0].work.requestId).toPromise()
    this.minDateInitial = new Date(this.requestForm[0].qeReceive.date)
    newQueues = await this.setOperateOnQueues(newQueues)
    return newQueues
  }

  async onCal(item: QueueForm) {
    const startDate: any = item.startDate
    if (startDate) {
      item = this.$qe_chamber.genEndDate(item)
      item.operateTable = await this.getOperateToolTableAll(startDate)
    }
  }

  private async getOperateToolTableAll(startDate: any) {
    const param: HttpParams = new HttpParams().set('startDate', new Date(startDate).toISOString())
    const resOperate = await this.$operateItems.remain(param).toPromise()
    const mapOperate = resOperate.map((t: any, i: any) => {
      return {
        position: i + 1,
        code: t.code,
        type: t.type,
        name: t.name,
        used: t.stock - t.remain,
        remain: t.remain,
        total: t.stock,
      }
    })
    return mapOperate
  }

  private async setOperateOnQueues(queues: any) {
    for (let i = 0; i < queues.length; i++) {
      if (queues[i]?.operate?.status) {
        queues[i]['operateTable'] = await this.getOperateToolTableAll(queues[i].startDate)
      }
    }
    return queues
  }

  private async mapForTable(queues: any) {
    const header = queues.reduce((prev: any, now: any) => {
      const temp: any = prev
      temp.push(now.condition.name)
      return temp
    }, [])
    const receive = header.map((h: any) => this.requestForm[0].qeReceive?.date ? moment(this.requestForm[0].qeReceive.date).format('ddd, D-MMM-YY,h:mm a') : '-')
    const times_inspection = await this.mapTime(queues, 'inspectionTime')
    const times_report = await this.mapTime(queues, 'reportTime')
    let reportStatus = this.formInput?.step4?.data[0]?.reportStatus ? this.formInput.step4.data[0].reportStatus : this.formInput.step4.data[0].data.reportStatus
    if (this.formInput.step4.data[0].data.report.length > 0) {
      reportStatus = true
    }

    const table_inspection: any = await this._qenInspectionTable.genTable(times_inspection, queues, header, 'inspectionTime', times_report, ['Sample Receive', ...receive], reportStatus, this.formInput.step4)
    return {
      header: header,
      data: table_inspection
    }
  }
  private mapTime(data: any, key: any) {
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
        this.onCal(item)
      }
    })
  }
  onSelectHour(item: QueueForm, e: any) {
    item.startDate = moment(item.startDate).set('hour', e.value).toDate()
    this.onCal(item)
  }

  openDialogCalendar(time: any) {
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
        }
      })
    } else {
      Swal.fire('PLEASE SELECT DATE INSPECTION INITIAL !!!', '', 'warning')
    }
  }
  onSelectHourEndDate(time: any, e: any) {
    time.endDate = moment(time.endDate).set('hour', e.value).toDate()
    const startMo = moment(new Date(time.startDate))
    const endMo = moment(new Date(time.endDate))
    time.hr = moment(endMo).diff(startMo, 'hour')
  }
  dialogChamber(item: QueueForm) {
    if (item && item.startDate) {
      const dialogRef = this.dialog.open(DialogQeChamberComponent, {
        data: {
          value: item.condition?.value,
          startDate: item.startDate,
          qty: item.work?.qty,
          revise: true
        },

      })
      dialogRef.afterClosed().subscribe(async res => {
        if (res) {
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

  onSelectChecker(e: any, item: OperateForm) {
    item.checker = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }
    item.change = true

  }

  showOperateItemChecker(operateItems: any) {
    if (operateItems && operateItems.length > 0) {
      return operateItems.filter((item: any) => item.type === 'checker')
    } else {
      return []
    }
  }
  onSelectPower(e: any, item: OperateForm) {
    item.power = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }
    item.change = true
  }
  showOperateItemPower(operateItems: any) {
    if (operateItems && operateItems.length > 0) {
      return operateItems.filter((item: any) => item.type === 'power')
    } else {
      return []
    }
  }
  onSelectAttachment(e: any, item: OperateForm) {
    item.attachment = {
      code: e.value.code,
      name: e.value.name,
      qty: 1
    }
    item.change = true

  }
  showOperateItemAttachment(operateItems: any) {
    if (operateItems && operateItems.length > 0) {
      return operateItems.filter((item: any) => item.type === 'attachment')
    } else {
      return []
    }
  }

  onDraft(item: QueueForm, index: number, startDate: any) {
    console.log(item);

    Swal.fire({
      title: 'Do you want to save?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        // const body = [item]
        // console.log(item);

        if (item.condition?.value == 0) {
          this.insertDirect([item], index)
        } else {
          if (item.operate?.status && item.operate.change) {
            // this.insertDirect([item], index)
            this.validRemainOperate(item, startDate, index)
          } else {
            this.insertDirect([item], index)
          }
        }

      }
    })

  }

  async validRemainOperate(item: any, startDate: any, index: any) {
    item.operateTable = await this.getOperateToolTableAll(startDate)
    const operateUse = item.operate
    const attachment: any = item.operateTable.find((t: any) => t.code === operateUse.attachment.code)
    const checker: any = item.operateTable.find((t: any) => t.code === operateUse.checker.code)
    const power: any = item.operateTable.find((t: any) => t.code === operateUse.power.code)
    const obj = {
      data: {
        attachment: attachment.remain || 0,
        checker: checker.remain || 0,
        power: power.remain || 0,
      },
      status: true,
      change: false
    }



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

  async insertDirect(item: any, index: number) {
    const newItem = item[0]
    if (newItem._id) {
      newItem['status'] = "submit_revise"
      const r_update = await this.$queues_revises.update(newItem._id, newItem).toPromise()
      if (r_update && r_update.acknowledged) {
        Swal.fire('SUCCESS', '', 'success')
        this.tableData = await this.mapForTable(this.queues)
        this.queues[index].operateTable = await this.getOperateToolTableAll(newItem.startDate)
        this.handleValidApprove()

      } else {
        Swal.fire('', '', 'error')
      }
    } else {

      // if (newItem.condition?.value == 0) {
      //   newItem.chamber = {
      //     "code": null,
      //     "name": null
      //   }
      // }

      // const r_insert = await this.$queues_revises.insert(newItem).toPromise()
      // this.queues[index] = r_insert[0]
      // const table = await this.mapForTable(this.queues)
      // this.tableData = table
      // this.queues[index].operateTable = await this.getOperateToolTableAll(newItem.startDate)
      // this.requestForm[0].table = this.tableData
      // // const resUpdate = await this.$request.update(this.requestForm[0]._id, this.requestForm[0]).toPromise()
      // // this.tableChange.emit(table)
      // // if (resUpdate && resUpdate.acknowledged) {
      // Swal.fire('SUCCESS', '', 'success')
      // setTimeout(() => {
      // }, 1000);
      // // }

    }
  }
  onDelete(item: QueueForm) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.deleteQueue(item)
      }
    })
  }
  async deleteQueue(item: any) {
    if (item._id) {
      item.status = 'draft_revise'
      await this.$queues_revises.update(item._id, item).toPromise()
      const table = await this.mapForTable(this.queues)
      this.requestForm[0].table = table
      this.tableData = table
      this.getOperateToolTableAll(item.startDate)
      Swal.fire('SUCCESS', '', 'success')
      this.handleValidApprove()

      // const r_delete = await this.$queues_revises.delete(item._id).toPromise()
      // if (r_delete && r_delete.acknowledged) {
      //   delete item._id
      //   const table = await this.mapForTable(this.queues)
      //   this.requestForm[0].table = table
      //   this.tableData = table
      //   this.getOperateToolTableAll(item.startDate)
      //   // await this.$request.update(this.requestForm[0]._id, this.requestForm[0]).toPromise()
      //   Swal.fire('SUCCESS', '', 'success')
      // }
    }
  }

  handleValidApprove() {
    const dataNotComplete = this.queues.find((q: any) => q.status === 'draft_revise')
    if (!dataNotComplete) {
      this.canApprove.emit(true)
    } else {
      this.canApprove.emit(false)
    }
  }

}
