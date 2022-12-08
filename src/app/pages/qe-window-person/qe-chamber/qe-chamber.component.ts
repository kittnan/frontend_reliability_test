import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueueService } from 'src/app/http/queue.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import Swal from 'sweetalert2';
import { ApproveFormService } from '../../shared/approve-form/approve-form.service';



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
  status: String | null,
  _id?: String | null

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
  table: any
  nextApprove: any

  constructor(
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private $queue: QueueService,
    private _approve: ApproveFormService
  ) {

  }
  ngOnInit(): void {
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { requestId } = params;
      const resData = await this.$request.get_id(requestId).toPromise()
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
  dataChange(e: any) {
    this.chamberTable = e
    console.log(this.chamberTable);

  }
  tableChange(e: any) {
    this.table = e
    console.log(this.table);
  }
  approveChange(e: any) {
    console.log('@$$$$$', e);
    this.nextApprove = e
  }

  async submit() {
    try {
      console.clear()
      console.log(this.chamberTable);
      console.log('@@@@@@@', this.table);
      console.log('form', this.form);
      await this.$request.update(this.form._id, {
        table: this.table
      }).toPromise()
      this._approve.submit('approve', this.form, '', this.nextApprove)
      await this.$queue.updateMany(this.chamberTable).toPromise()
      // Swal.fire('SUCCESS', '', 'success')
    } catch (error) {
      Swal.fire(error?.toString(), '', 'error')
    }
  }


  onUpdate(data: any) {
    this.$queue.updateMany(data).subscribe(res => {
      console.log(res);

    })

  }
  validButtonSubmit() {
    const r_find = this.chamberTable.find((d: any) => !d._id);
    if (r_find) {
      return true
    }
    return false

  }



}