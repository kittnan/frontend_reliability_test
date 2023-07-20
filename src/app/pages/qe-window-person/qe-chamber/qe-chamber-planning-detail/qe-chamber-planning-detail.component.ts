import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OperateGroupService } from 'src/app/http/operate-group.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { QueueService } from 'src/app/http/queue.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

import {
  DialogDateStartInspectionComponent,
} from '../components/dialog-date-start-inspection/dialog-date-start-inspection.component';
import { DialogDateComponent } from '../components/dialog-date/dialog-date.component';
import { DialogQeChamberComponent } from '../components/dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from '../components/dialog-qe-operate/dialog-qe-operate.component';
import { OperateForm, QueueForm } from '../qe-chamber.component';
import { QeChamberService } from '../qe-chamber.service';
import { GenInspectionTableService } from './gen-inspection-table.service';
import { DialogSelectDateComponent } from '../components/dialog-select-date/dialog-select-date.component';
import { ActivatedRoute, Params } from '@angular/router';

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
  // operateItems: any[] = []
  requestForm: any
  tableSource: any
  tableData: any = null
  userLogin: any;
  dateNow = new Date()
  minDateInitial = new Date()
  tempQueues: any[] = []
  editPlan: boolean = false
  shortMenuOption: any = null
  jump: boolean = false
  @Input() queues: any;
  @Input() formInput: any;
  @Output() queuesChange: EventEmitter<any> = new EventEmitter()
  @Output() tableChange: EventEmitter<any> = new EventEmitter()
  constructor(
    private dialog: MatDialog,
    private $qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService,
    private $queue: QueueService,
    private $operateGroup: OperateGroupService,
    private $request: RequestHttpService,
    private _qenInspectionTable: GenInspectionTableService,
    private _loading: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  async ngOnInit(): Promise<void> {
    try {
      this.route.queryParams.subscribe((params: Params) => {
        if (params['editPlan'] == 'true') {
          this.editPlan = true
        }
      })
      this._loading.start()
      this.tempQueues = [...this.queues]
      if (this.queues) {
        this.queues = await this.getQueuesDraft(this.queues)
        this.queues.map((d: any) => {
          this.onCal(d, 0)
        })
        this.tableData = await this.mapForTable(this.queues)
        this.shortMenuOption = this.queues.map((a: any, i: number) => {
          return {
            name: a.condition.name.substring(0, 50),
          }
        })
      }

    } catch (error) {
      console.log(error);
      this._loading.stop()
    } finally {
      setTimeout(() => {
        this._loading.stop()
      }, 500);
    }


  }



  async getQueuesDraft(queues: any) {
    const queueDraft = await this.$queue.getFormId(queues[0].work.requestId).toPromise()

    queues = queues.map((d: QueueForm) => {
      const draft = queueDraft.find((draft: QueueForm) => {
        return draft.condition?.name == d.condition?.name
      })
      if (draft) {
        const inspectionTime = d?.inspectionTime?.map((d: any) => {
          const a = draft.inspectionTime.find((g: any) => g.at == d.at)
          if (a) return a
          return d
        })
        const actualTime = d?.inspectionTime?.map((d: any, i: any) => {
          const a = draft.inspectionTime.find((g: any) => g.at == d.at)
          if (a) return { ...a, index: i, onPlan: a.onPlan == true || a.onPlan == false ? a.onPlan : true }
          return { ...d, index: i, onPlan: true }
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
        draft['actualTime'] = actualTime
        return {
          ...d,
          ...draft,
        }
      } else {
        return d
      }
    })


    this.requestForm = await this.$request.get_id(queues[0].work.requestId).toPromise()
    this.minDateInitial = new Date(this.requestForm[0].qeReceive.date)
    queues = await this.setOperateOnQueues(queues)
    return queues
  }
  async setOperateOnQueues(queues: any) {
    for (let i = 0; i < queues.length; i++) {
      if (queues[i]?.operate?.status) {
        queues[i]['operateTable'] = await this.getOperateToolTableAll(queues[i].startDate)
      }
    }
    return queues
  }
  dialogChamber(item: QueueForm) {
    if (item && item.startDate) {
      const dialogRef = this.dialog.open(DialogQeChamberComponent, {
        data: {
          value: item.condition?.value,
          startDate: item.startDate,
          qty: 0,
          // qty: item.work?.qty,
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

  async onCal(item: any, index: number) {
    const startDate: any = item.startDate
    if (startDate) {
      if (item.actualTime) {
        item = this.$qe_chamber.genEndDateActual(item)
      } else {
        item = this.$qe_chamber.genEndDate(item)
      }
      item.operateTable = await this.getOperateToolTableAll(startDate)
    }
  }
  onActionDelay(item: any, time: any) {
    try {
      if (time?.delay) {
        if (time.prev?.hr) {
          time.hr = Number(time.prev.hr) + Number(time.delay)
        } else {
          time.prev = { ...time }
          time.hr = Number(time.hr) + Number(time.delay)
        }
        const historyDelayTime = {
          work: item.work,
          condition: item.condition,
          beforeAction: {
            ...time.prev
          },
          nextAction: {
            ...time
          }
        }
        item.historyDelayTime = historyDelayTime
      } else {
        time['delay'] = 0
        time['hr'] = Number(time.prev.hr)
      }
      const startDate: any = item.startDate
      if (startDate) {
        item = this.$qe_chamber.genEndDate(item)
      }
    } catch (error) {
      console.log(error);

    }


  }

  // openDialogActual(item: any, time: any) {
  //   const dialogRef = this.dialog.open(DialogSelectDateComponent, {
  //     height: '500px',
  //     width: '500px',
  //     data: item
  //   })
  //   dialogRef.afterClosed().subscribe(selectedDate => {
  //     if (selectedDate) {
  //       time.startDate = selectedDate
  //       const foo = this.$qe_chamber.genEndDateWithActualTime(item, time, selectedDate)
  //       console.log(foo);
  //       item.actualTime = foo
  //       // console.clear()
  //       // console.log("🚀 ~ item:", item)
  //       // // this.onCal(item, 0)
  //     }
  //   })
  // }

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


      }
    })
  }

  async deleteQueue(item: any) {


    if (item._id) {
      // this.data = this.data.filter((d: any) => d != item)
      const r_delete = await this.$queue.delete(item._id).toPromise()
      if (r_delete && r_delete.acknowledged) {
        delete item._id
        const table = await this.mapForTable(this.queues)
        this.requestForm[0].table = table
        this.tableData = table
        this.getOperateToolTableAll(item.startDate)
        const resUpdate = await this.$request.update(this.requestForm[0]._id, this.requestForm[0]).toPromise()
        // this.getQueuesDraft(this.queues)
        Swal.fire('SUCCESS', '', 'success')


        // this.queues = [...this.tempQueues]
        // this.queues = await this.getQueuesDraft(this.queues)
        // console.log("🚀 ~ this.queues:", this.queues)
        // this.tableData = await this.mapForTable(this.queues)


        setTimeout(() => {
          // location.reload()


        }, 1000);
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
        this.insertDirect([item], index)

        // todo ignore check operate (operate tool is flex)
        // if (item.condition?.value == 0) {
        //   this.insertDirect([item], index)
        // } else {
        //   if (item.operate?.status) {
        //     this.validRemainOperate(item, startDate, index)
        //   } else {
        //     this.insertDirect([item], index)
        //   }
        // }

      }
    })

  }

  async getOperateToolTableAll(startDate: any) {
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
      status: true
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
      // if (item._id) {
      //   this.onEdit(item._id, item, index)
      // } else {
      //   this.onInsert(item, index)
      // }
      // console.log(item);

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
          this.queues[index] = r_insert[0]
          Swal.fire('SUCCESS', '', 'success')
          this.mapForTable(this.queues)
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
        this.queues[index] = r_insert[0]
        Swal.fire('SUCCESS', '', 'success')
        this.mapForTable(this.queues)

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
            this.mapForTable(this.queues)

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
          this.mapForTable(this.queues)
        } else {
          Swal.fire('', '', 'error')
        }
      }
    } else {
      Swal.fire(r_checkQueue, '', 'error')
    }

  }

  async insertDirect(item: any, index: number) {
    const newItem = item[0]
    if (newItem._id) {
      const r_update = await this.$queue.update(newItem._id, newItem).toPromise()
      if (r_update && r_update.acknowledged) {
        const table = await this.mapForTable(this.queues)
        this.tableData = table
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          location.reload()
        })
        // Swal.fire('SUCCESS', '', 'success')
        // this.queues[index].operateTable = await this.getOperateToolTableAll(newItem.startDate)
      } else {
        Swal.fire('', '', 'error')
      }
    } else {

      if (newItem.condition?.value == 0) {
        newItem.chamber = {
          "code": null,
          "name": null
        }
      }

      const r_insert = await this.$queue.insert(newItem).toPromise()
      this.queues[index] = r_insert[0]
      const table = await this.mapForTable(this.queues)
      this.tableData = table
      this.queues[index].operateTable = await this.getOperateToolTableAll(newItem.startDate)
      this.requestForm[0].table = this.tableData
      const resUpdate = await this.$request.update(this.requestForm[0]._id, this.requestForm[0]).toPromise()
      this.tableChange.emit(table)
      if (resUpdate && resUpdate.acknowledged) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          location.reload()
        })
        // Swal.fire('SUCCESS', '', 'success')
        // setTimeout(() => {
        // }, 1000);
      }

    }
  }



  showOperateItemChecker(operateItems: any) {
    if (operateItems && operateItems.length > 0) {
      return operateItems.filter((item: any) => item.type === 'checker')
    } else {
      return []
    }
  }
  showOperateItemPower(operateItems: any) {
    if (operateItems && operateItems.length > 0) {
      return operateItems.filter((item: any) => item.type === 'power')
    } else {
      return []
    }
  }
  showOperateItemAttachment(operateItems: any) {
    if (operateItems && operateItems.length > 0) {
      return operateItems.filter((item: any) => item.type === 'attachment')
    } else {
      return []
    }
  }




  public async mapForTable(queues: any) {
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
    this.queuesChange.emit(this.queues)
  }



  async operateAll(startDate: any) {
    const param: HttpParams = new HttpParams().set('startDate', startDate)
    return await this.$operateItems.condition(param).toPromise()

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0
  };

  onConfirmActual(item: any, index: number) {
    Swal.fire({
      title: 'Do you want to confirm actual time?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        item.inspectionTime = [...item.actualTime]
        this.insertDirect([item], index)

      }
    })
  }

  jumpTo(i: number) {
    let elements: any = document.querySelectorAll('.jump')
    const elements2: any = [...elements]
    const ids = elements2.map((a: any) => a.id)
    // console.log("🚀 ~ ids:", ids)
    // ids.sort()
    const id: any = ids[i]
    console.log(id);
    (document.getElementById(id) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    setTimeout(() => {
      this.jump = false
    }, 100);
  }


}
