import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogQeChamberComponent } from '../dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from '../dialog-qe-operate/dialog-qe-operate.component';
import { QueueForm } from '../qe-chamber.component';
import { QeChamberService } from '../qe-chamber.service';

@Component({
  selector: 'app-qe-chamber-planning',
  templateUrl: './qe-chamber-planning.component.html',
  styleUrls: ['./qe-chamber-planning.component.scss']
})
export class QeChamberPlanningComponent implements OnInit {

  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  dataSource: any;
  displayedColumns = ['select', 'reqNo', 'userRequest', 'requestDate', 'sendDate', 'condition', 'operate', 'qty'];
  selection = new SelectionModel<any>(true, []);
  selected: any[] = []
  chamberTable!: QueueForm[]
  constructor(
    private dialog: MatDialog,
    private _qe_chamber: QeChamberService
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.dataSource = this.data
    }
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


  createPlaning() {
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
    this.dataChange.emit(this.chamberTable)
  }

}
