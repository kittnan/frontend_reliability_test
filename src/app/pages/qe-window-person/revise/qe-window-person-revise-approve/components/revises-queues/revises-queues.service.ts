import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { QueueForm } from 'src/app/pages/qe-window-person/qe-chamber/qe-chamber.component';

@Injectable({
  providedIn: 'root'
})
export class RevisesQueuesService {
  formRevise: any = null
  minDateInitial: any = null
  constructor(
    private $operateItems: OperateItemsHttpService
  ) { }

  mergeOldQueues(oldQueues: any, newQueues: any, formRevise: any) {
    this.formRevise = formRevise
    const foo = newQueues.map((d: QueueForm) => {
      const draft = oldQueues.find((draft: QueueForm) => draft.condition?.name == d.condition?.name)
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
        }
      } else {
        return d
      }
    })
    console.log("🚀 ~ foo:", foo)
    this.minDateInitial = new Date(this.formRevise.qeReceive.date)
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
}
