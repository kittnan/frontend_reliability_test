import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChamberHttpService } from 'src/app/http/chamber-http.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { QueueService } from 'src/app/http/queue.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import Swal from 'sweetalert2';
import { QeChamberService } from './qe-chamber.service';



export interface QueueForm {
  startDate: Date | null,
  endDate: Date | null,
  inspectionTime: TimeForm[] | null,
  reportTime: TimeForm[] | null,
  work: WorkForm | null,
  condition: ConditionForm | null,
  operate: OperateForm | null,
  model: String | null,
  chamber?: ChamberForm,
  status:String |null,
  _id?:String |null

}
interface ChamberForm {
  code: String | undefined,
  name: String | undefined
}

export interface TimeForm {
  at: Number | null,
  startDate: Date | null,
  endDate: Date | null,
  hr: Number | null,
}
export interface WorkForm {
  requestId: String,
  qty: Number,
  controlNo: String,
}

export interface ConditionForm {
  name: String,
  value: Number
}

export interface OperateForm {
  power: ToolForm,
  attachment: ToolForm,
  checker: ToolForm,
  status: Boolean
}
export interface ToolForm {
  code?: String,
  name?: String,
  qty?: Number | String
}




@Component({
  selector: 'app-qe-chamber',
  templateUrl: './qe-chamber.component.html',
  styleUrls: ['./qe-chamber.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QeChamberComponent implements OnInit {
  dataSource: any
  form: any
  chamberTable!: QueueForm[]


  constructor(
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private $queue: QueueService
  ) {

  }
  ngOnInit(): void {
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { requestId } = params;
      const resData = await this.$request.getRequest_formById(requestId).toPromise()
      this.form = resData[0]
      const temp = this.setDataTable();
      this.dataSource = temp
    })
  }

  emitted(item: any) {
    this.chamberTable = item
  }

  setDataTable() {
    const conditions = this.form.step4.data;
    return conditions.map((condition: any) => {
      return {
        condition: condition,
        ...this.form
      }
    })
  }





}
