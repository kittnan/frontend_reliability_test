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
  authorize = 'qe_engineer'
  userApprove: any = [];
  approve = new FormControl(null, Validators.required)
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  constructor(
    private dialog: MatDialog,
    private $qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService,
    private $queue: QueueService,
    private $operateGroup: OperateGroupService,
    private $request: RequestHttpService,
    private $user: UserHttpService
  ) {
    this.$operateItems.get().subscribe(res => this.operateItems = res);
    const id: any = localStorage.getItem('_id')
    this.$user.getUserById(id).subscribe(res => this.userLogin = res)

  }

  ngOnInit(): void {
    this.getDraft()
    this.getUserApprove()
  }

  async getDraft() {
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

      this.requestForm = await this.$request.getRequest_formById(this.data[0].work.requestId).toPromise()
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
      const r_delete = await this.$queue.delete(item._id).toPromise()
      if (r_delete && r_delete.acknowledged) {
        Swal.fire('SUCCESS', '', 'success')
        delete item._id
      }
    } else {
    }
  }

  onDraft(item: QueueForm, index: number) {
    Swal.fire({
      title: 'Do you want to save?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        const body = [item]
        if (item._id) {
          this.onEdit(item._id, item, index)
        } else {
          this.onInsert(body, index)
        }
      }
    })

  }

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



  showOperateItemChecker(operateItems: any) {
    return operateItems.filter((item: any) => item.type === 'checker')
  }
  showOperateItemPower(operateItems: any) {
    return operateItems.filter((item: any) => item.type === 'power')
  }
  showOperateItemAttachment(operateItems: any) {
    return operateItems.filter((item: any) => item.type === 'attachment')
  }


  validButtonSubmit() {
    const r_find = this.data.find((d: any) => !d._id);
    if (r_find) {
      return true
    }
    return false

  }

  async mapForTable(data: any) {
    console.log(data);
    console.log(this.requestForm);


    const header = data.reduce((prev: any, now: any) => {
      const temp: any = prev
      temp.push(now.condition.name)
      return temp
    }, [])

    const receive = header.map((h: any) => moment(this.requestForm[0].step1.sampleSentToQE_withinDate).format('ddd, D/M/YY h:mm a'))
    let time = data.reduce((prev: any, now: any) => {
      return this.loopTime2(now.inspectionTime, prev)
    }, [])
    time.sort((a: any, b: any) => a.at - b.at)
    console.log(time);
    let r_loop: any = await this.loopTable(time, data, header)
    r_loop = r_loop.filter((r: any) => r.length != 0)
    this.tableData = {
      header: header,
      receive: receive,
      data: r_loop
    }

  }

  loopTime2(arr: any, prev: any) {
    return arr.filter((a: any) => {
      const found = prev.find((p: any) => p.at == a.at)
      if (found) {
        return found
      } else {
        return a
      }
    });
  }

  async loopTable(time: any, data: any, header: any) {
    return new Promise(async resolve => {
      let row: any[] = []
      for (let i = 0; i < time.length; i++) {
        const r_loop = await this.loopDataFilter(data, time[i], header)
        row = row.concat(r_loop)
        if (i + 1 == time.length) {
          row.push(['END DATE',...data.map((d:any)=>  d?.endDate? moment(d.endDate).format('ddd, D/M/YY h:mm a'):'-' )])
          resolve(row)
        }
      }
    })
  }

  loopDataFilter(data: any, t: any, header: any) {
    return new Promise(resolve => {
      let row1: any[] = []
      let row2: any[] = []
      let row3: any[] = []

      let row1_test = []

      for (let col = 0; col < data.length; col++) {
        const r_find = data[col].inspectionTime.find((inspec: any) => inspec.at == t.at && header[col] == data[col].condition.name)



        const r_find_test = data[col].reportTime.find((report: any) => report.at == t.at && header[col] == data[col].condition.name)
        const start_test = r_find_test?.startDate ? moment(r_find_test.startDate).format('ddd, D/M/YY h:mm a') : '-'





        const start = r_find?.startDate ? moment(r_find.startDate).format('ddd, D/M/YY h:mm a') : '-'
        const end = r_find?.endDate ? moment(r_find.endDate).format('ddd, D/M/YY h:mm a') : '-'
        const between = start == '-' ? ' - ' : `${start}-${end}`
        if (r_find && r_find.at == 0 && col == 0) {
          row1.push('Inspection of Initial')
          row1.push(between)

          row2.push('Input to Chamber')
          row2.push(end)

          row1_test.push('Report of Initial')
          row1_test.push(start_test?start_test:'-')


        } else if (r_find && r_find.at == 0 && col != 0) {
          row1.push(between)

          row2.push(end)

          row1_test.push(start_test?start_test:'-')

        } else if (r_find && col == 0) {
          row1.push(`${r_find.at}hrs`)

          row2.push(`Inspection after ${r_find.at}hrs`);

          row3.push(`Input to Chamber`);

          row1.push(`${start}`)

          row2.push(between)

          row3.push(end)

          row1_test.push(`Report after ${r_find.at}hrs`);
          row1_test.push(start_test?start_test:'-')

        } else if (r_find && col != 0) {
          row1.push(`${start}`)

          row2.push(between)

          row3.push(end)

          row1_test.push(start_test?start_test:'-')

        } else {
          row1.push('-')

          row2.push('-')

          row3.push('-')

          row1_test.push(start_test?start_test:'-')

        }

        if (col + 1 == data.length) {
          let arr = [row1, row2, row3]
          console.log('!!!!!!!',row1);
          console.log('@@@@@@@@@@@@@@@',row1_test);

          resolve(arr)
        }

      }

    })
  }




  loopTime(arr: any, items: QueueForm | any, key: any) {
    const inspectionTime: any = items[key]
    for (let i = 0; i < inspectionTime.length; i++) {
      const r_find = arr.data.find((inspec: any) => inspec.at == inspectionTime[i].at)
      const r_findHead = arr.header.find((h: any) => h == items.condition.name)
      if (r_find) {
        r_find['data'].push({
          ...inspectionTime[i],
          name: items.condition?.name,
          value: items.condition?.value
        })
      } else {
        arr.data.push({
          at: inspectionTime[i].at,
          data: [{
            ...inspectionTime[i],
            name: items.condition?.name,
            value: items.condition?.value

          }]
        })
      }

      if (!r_findHead) {
        arr.header.push(items.condition.name)
      }

      if (i + 1 == inspectionTime.length) {
        return arr
      }
    }
  }

  async submit() {

    console.log(this.data);

    // const ff = this.data.find((d: any) => !d._id)
    // if (ff) {
    //   Swal.fire('SOME CONDITION NOT READY', '', 'error')
    // } else {
    //   this.$queue.updateMany(this.data).subscribe(res => {
    //     if (res && res.status) {
    //       Swal.fire('SUCCESS', '', 'success')
    //     } else {
    //       Swal.fire(res.text, '', 'error')
    //     }
    //   })
    // }
  }

  async getUserApprove() {
    const _id: any = localStorage.getItem("_id")
    this.userLogin = await this.$user.getUserById(_id).toPromise();
    const section = [this.userLogin.section]
    const temp_section = JSON.stringify(section)
    const level = [this.authorize]
    const temp_level = JSON.stringify(level)
    this.userApprove = await this.$user.getUserBySection(temp_section, temp_level).toPromise();
    this.approve.patchValue(this.userApprove[0])
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

}
