import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ChamberHttpService } from 'src/app/http/chamber-http.service';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ChamberTableComponent } from '../../shared/chamber-table/chamber-table.component';
import { DialogQeChamberComponent } from './dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from './dialog-qe-operate/dialog-qe-operate.component';
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
  chamber?: ChamberForm

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
  qty: Number
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

  dataSource: any;
  displayedColumns = ['select', 'reqNo', 'userRequest', 'requestDate', 'sendDate', 'condition', 'operate', 'qty', 'action'];
  selection = new SelectionModel<any>(true, []);
  form: any
  chamberTable!: QueueForm[]
  selected: any[] = []
  hourList: any[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]

  operateItems: any[] = []
  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private $chamber: ChamberHttpService,
    private dialog: MatDialog,
    private _qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService
  ) {
    this.$operateItems.get().subscribe(res => this.operateItems = res)
  }




  ngOnInit(): void {
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { requestId } = params;
      const resData = await this.$request.getRequest_formById(requestId).toPromise()
      this.form = resData[0]
      const temp = this.setDataTable();
      this.dataSource = new MatTableDataSource(temp)
    })
  }

  foo(item:any){
    console.log(item);

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

  htmlUserRequest(element: any) {
    return element.step5.find((item: any) => item.level == 1).userName || ''
  }
  htmlCondition(element: any) {
    return element.dataTable.name
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  createPlaning() {
    console.log(this.selection.selected);
    this.selected = [...this.selection.selected]
    this.chamberTable = this.selected.map((selected: any) => {
      const temp: QueueForm = {
        startDate: null,
        endDate: null,
        inspectionTime: this._qe_chamber.genInspectionTime(selected.condition.data.timeInspection),
        reportTime: this._qe_chamber.genInspectionTime(selected.condition.data.timeReport),
        operate: {
          attachment: {},
          checker: {},
          power: {},
          status: this._qe_chamber.genOperateStatus(selected.condition.data.operate)
        },
        work: {
          requestId: selected.step1.requestId,
          qty: selected.condition.data.qty
        },
        condition: {
          name: selected.condition.dataTable.name,
          value: selected.condition.value
        },
        model: selected.step1.modelNo

      }
      return temp
    })
    console.log(this.chamberTable);
  }



  // async dialogChamber(element: any) {
  //   console.log(element);
  //   const value = element.condition.value
  //   const resData = await this.$chamber.getChamberByValue(value).toPromise()
  //   const dialogRef: MatDialogRef<any> = this.dialog.open(DialogQeChamberComponent, {
  //     data: resData
  //   })
  //   dialogRef.afterClosed().subscribe(chamber => {
  //     // console.clear()
  //     // console.log(chamber);
  //     // console.log(element);
  //     const condition = element.condition;
  //     this._qe_chamber.generateQueue(chamber, element)



  //     // if (chamber) {
  //     //   this.chamberTable.push(
  //     //     {
  //     //       chamber: {
  //     //         capacity: Number(chamber.capacity) - Number(element.condition.data.qty),
  //     //         use: Number(chamber.use) + Number(element.condition.data.qty),
  //     //         running: {
  //     //           name: element.condition.name,
  //     //           value: element.condition.value
  //     //         },
  //     //         code: chamber.code,
  //     //       },
  //     //       element: element,
  //     //       que:{
  //     //         startDate:'',

  //     //       }
  //     //     }
  //     //   )
  //     //   console.log(this.chamberTable);

  //     // }
  //   })
  // }

  dialogChamber(item: QueueForm) {
    const dialogRef = this.dialog.open(DialogQeChamberComponent, {
      data: item.condition?.value
    })
    dialogRef.afterClosed().subscribe(async res => {
      console.log(res);
      if (res) {
        item.chamber = res
      }
      // await this.$chamber.createQueue({
      //   foo: item,
      //   doo: res
      // }).toPromise()
    })
  }

  dialogOperate(item: QueueForm) {
    const dialogRef = this.dialog.open(DialogQeOperateComponent, {
      data: ''
    })
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      item.operate = {
        attachment: res.attachment,
        checker: res.checker,
        power: res.power,
        status: true
      }
      console.log(item);

    })
  }

  onSelectHour(item: QueueForm, e: any) {
    item.startDate = moment(item.startDate).set('hour', e.value).toDate()
    this.onCal(item, 0)
  }

  onCal(item: QueueForm, index: number) {
    this._qe_chamber.genEndDate(item)
  }

  compareSelect(a:any,b:any){
    return a.code === b.code;
  }

  onSelectChecker(e:any,item:OperateForm){
    item.checker = {
      code:e.value.code,
      name:e.value.name,
      qty:1
    }
  }
  onSelectPower(e:any,item:OperateForm){
    item.power = {
      code:e.value.code,
      name:e.value.name,
      qty:1
    }
  }
  onSelectAttachment(e:any,item:OperateForm){
    item.attachment = {
      code:e.value.code,
      name:e.value.name,
      qty:1
    }
  }

  showOperateItemChecker(operateItems:any){
    return operateItems.filter((item:any)=>item.type==='checker')
  }
  showOperateItemPower(operateItems:any){
    return operateItems.filter((item:any)=>item.type==='power')
  }
  showOperateItemAttachment(operateItems:any){
    return operateItems.filter((item:any)=>item.type==='attachment')
  }

}
