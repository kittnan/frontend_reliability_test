import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ChamberTableComponent } from '../../shared/chamber-table/chamber-table.component';
import { DialogQeChamberComponent } from './dialog-qe-chamber/dialog-qe-chamber.component';
import { QeChamberService } from './qe-chamber.service';


export interface QueueForm {
  startDate: Date | null,
  endDate: Date | null,
  inspectionTime: TimeForm[] | null,
  reportTime: TimeForm[] | null,
  work: WorkForm | null,
  condition: ConditionForm | null,
  operate: OperateForm | null

}

interface TimeForm {
  at: Number,
  startDate: Date,
  endDate: Date,
  min: Number,
}
interface WorkForm {
  requestId: String,
  qty: Number
}

interface ConditionForm {
  name: String,
  value: Number
}

interface OperateForm {
  code: String,
  tool: ToolForm
}
interface ToolForm {
  power: {},
  attachment: {},
  checker: []
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
  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private $master: MasterHttpService,
    private dialog: MatDialog,
    private _qe_chamber: QeChamberService
  ) { }




  ngOnInit(): void {
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { requestId } = params;
      const resData = await this.$request.getRequest_formById(requestId).toPromise()
      this.form = resData[0]
      const temp = this.setDataTable();
      this.dataSource = new MatTableDataSource(temp)


    })
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
        inspectionTime: null,
        reportTime: null,
        operate: null,
        work: {
          requestId: selected.step1.requestId,
          qty: selected.condition.data.qty
        },
        condition: {
          name: selected.condition.dataTable.name,
          value: selected.condition.value
        }

      }
      return temp
    })
  }

  async dialogChamber(element: any) {
    console.log(element);
    const value = element.condition.value
    const resData = await this.$master.getChamberByValue(value).toPromise()
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogQeChamberComponent, {
      data: resData
    })
    dialogRef.afterClosed().subscribe(chamber => {
      // console.clear()
      // console.log(chamber);
      // console.log(element);
      const condition = element.condition;
      this._qe_chamber.generateQueue(chamber, element)



      // if (chamber) {
      //   this.chamberTable.push(
      //     {
      //       chamber: {
      //         capacity: Number(chamber.capacity) - Number(element.condition.data.qty),
      //         use: Number(chamber.use) + Number(element.condition.data.qty),
      //         running: {
      //           name: element.condition.name,
      //           value: element.condition.value
      //         },
      //         code: chamber.code,
      //       },
      //       element: element,
      //       que:{
      //         startDate:'',

      //       }
      //     }
      //   )
      //   console.log(this.chamberTable);

      // }
    })
  }


  onStartDate(){

  }

}
