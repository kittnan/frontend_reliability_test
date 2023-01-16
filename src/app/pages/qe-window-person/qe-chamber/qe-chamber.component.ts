import { UserHttpService } from 'src/app/http/user-http.service';
import { ApproveService } from 'src/app/pages/shared/approve-form/approve.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueueService } from 'src/app/http/queue.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';



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
  userLogin: any;
  approve = new FormControl(null, Validators.required)
  authorize = 'qe_engineer'
  userApprove: any = [];


  constructor(
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private $queue: QueueService,
    private _approve: ApproveService,
    private $user: UserHttpService
  ) {
    const id: any = localStorage.getItem('_id')
    this.$user.getUserById(id).subscribe(res => this.userLogin = res)
  }
  ngOnInit(): void {
    this.getUserApprove()
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { id } = params;
      const resData = await this.$request.get_id(id).toPromise()
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
  }
  tableChange(e: any) {
    this.table = e
    this.form.table = this.table

  }
  approveChange(e: any) {
    this.nextApprove = e
  }



  validButtonSubmit() {
    // const r_find = this.chamberTable.find((d: any) => !d._id);
    // if (r_find) {
    //   return true
    // }
    return false

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
