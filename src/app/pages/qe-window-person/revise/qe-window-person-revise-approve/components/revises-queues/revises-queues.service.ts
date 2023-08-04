import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { GenInspectionTableService } from 'src/app/pages/qe-window-person/qe-chamber/qe-chamber-planning-detail/gen-inspection-table.service';
import { QueueForm } from 'src/app/pages/qe-window-person/qe-chamber/qe-chamber.component';

@Injectable({
  providedIn: 'root'
})
export class RevisesQueuesService {
  formRevise: any = null
  minDateInitial: any = null
  constructor(
    private $operateItems: OperateItemsHttpService,
    private _qenInspectionTable: GenInspectionTableService
  ) { }

  mergeOldQueues(oldQueues: any, newQueues: any, formRevise: any) {
    this.formRevise = formRevise
    let tempOldQueues = oldQueues
    const foo = newQueues.map((d: QueueForm) => {
      const draft = tempOldQueues.find((draft: QueueForm) => {
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
        tempOldQueues = tempOldQueues.filter((a: any) => a != draft)
        return {
          ...d,
          ...draft,
          confirm: draft?.confirm ? draft.confirm : false
        }
      } else {
        return d
      }
    })
    this.minDateInitial = new Date(this.formRevise.qeReceive?.date)
    return this.setOperateOnQueues(foo)
  }
  private async setOperateOnQueues(queues: any) {
    for (let i = 0; i < queues.length; i++) {
      if (queues[i]?.operate?.status) {
        queues[i]['operateTable'] = await this.getOperateToolTableAll(queues[i].startDate)
      }
    }
    return queues
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

  async mapForTable(queues: any, formRevise: any) {
    const header = queues.reduce((prev: any, now: any) => {
      const temp: any = prev
      temp.push(now.condition.name)
      return temp
    }, [])
    const receive = header.map((h: any) => formRevise.qeReceive?.date ? moment(formRevise.qeReceive.date).format('ddd, D-MMM-YY,h:mm a') : '-')
    const times_inspection = await this.mapTime(queues, 'inspectionTime')
    const times_report = await this.mapTime(queues, 'reportTime')
    let reportStatus = formRevise?.step4?.data[0]?.reportStatus ? formRevise.step4.data[0].reportStatus : formRevise.step4.data[0].data.reportStatus
    if (formRevise.step4.data[0].data.report.length > 0) {
      reportStatus = true
    }

    const table_inspection: any = await this._qenInspectionTable.genTable(times_inspection, queues, header, 'inspectionTime', times_report, ['Sample Receive', ...receive], reportStatus, this.formRevise.step4)
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

}
