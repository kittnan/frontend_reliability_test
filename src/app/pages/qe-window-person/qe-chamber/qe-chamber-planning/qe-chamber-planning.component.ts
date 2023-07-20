import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogQeChamberComponent } from '../components/dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from '../components/dialog-qe-operate/dialog-qe-operate.component';
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
  displayedColumns = ['condition', 'userRequest', 'requestDate', 'sendDate', 'operate', 'qty'];
  chamberTable!: QueueForm[]
  constructor(
    private dialog: MatDialog,
    private _qe_chamber: QeChamberService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.genPlan(this.data)
      this.dataSource = new MatTableDataSource(this.data)
    }
    // if (this.data) {
    //   if (this.data[0]?.step4?.data[0]?.value == 0) {
    //     this.displayedColumns = []
    //     this.createPlainingNoChamber()
    //   } else {
    //     this.dataSource = new MatTableDataSource(this.data)
    //     this.createPlaning()
    //     this.createNoOven()
    //   }


    // }
  }

  htmlUserRequest(element: any) {
    return element.step5.find((item: any) => item.level == 1).userName || ''
  }
  htmlCondition(element: any) {
    return element.dataTable.name
  }

  dialogChamber(item: QueueForm) {
    const dialogRef = this.dialog.open(DialogQeChamberComponent, {
      data: item.condition?.value
    })
    dialogRef.afterClosed().subscribe(async res => {
      if (res) {
        item.chamber = res
      }
    })
  }

  dialogOperate(item: QueueForm) {
    const dialogRef = this.dialog.open(DialogQeOperateComponent, {
      data: ''
    })
    dialogRef.afterClosed().subscribe(res => {
      item.operate = {
        attachment: res.attachment,
        checker: res.checker,
        power: res.power,
        status: true
      }

    })
  }

  genPlan(data: any[]) {
    this.chamberTable = data.map((selected: any) => {
      const temp: QueueForm = {
        startDate: null,
        endDate: null,
        inspectionTime: this._qe_chamber.genInspectionTime(selected.condition.data.inspection),
        reportQE: this._qe_chamber.genInspectionTime(selected.condition.data.report),
        reportTime: this._qe_chamber.genInspectionTime(selected.condition.data.report),
        operate: {
          attachment: {},
          checker: {},
          power: {},
          status: selected.condition.data.operate.value
        },
        work: {
          requestId: selected.step1.requestId,
          qty: selected.condition.data.qty,
          controlNo: selected.step1.controlNo,
        },
        condition: {
          name: selected.condition.dataTable.name,
          value: selected.condition.value
        },
        model: selected.step1.modelNo,
        status: 'draft'
      }
      return temp
    })

    this.dataChange.emit(this.chamberTable)
  }

  // createPlaning() {
  //   this.chamberTable = this.data.map((selected: any) => {
  //     // console.log(selected);

  //     const temp: QueueForm = {
  //       startDate: null,
  //       endDate: null,
  //       inspectionTime: this._qe_chamber.genInspectionTime(selected.condition.data.inspection),
  //       reportQE: this._qe_chamber.genInspectionTime(selected.condition.data.report),
  //       reportTime: this._qe_chamber.genInspectionTime(selected.condition.data.report),
  //       operate: {
  //         attachment: {},
  //         checker: {},
  //         power: {},
  //         status: selected.condition.data.operate.value
  //       },
  //       work: {
  //         requestId: selected.step1.requestId,
  //         qty: selected.condition.data.qty,
  //         controlNo: selected.step1.controlNo,
  //       },
  //       condition: {
  //         name: selected.condition.dataTable.name,
  //         value: selected.condition.value
  //       },
  //       model: selected.step1.modelNo,
  //       status: 'draft'
  //     }
  //     return temp
  //   })
  //   // console.log("🚀 ~ file: qe-chamber-planning.component.ts:99 ~ QeChamberPlanningComponent ~ createPlaning ~ this.chamberTable", this.chamberTable)
  //   this.dataChange.emit(this.chamberTable)
  //   // return this.chamberTable
  // }
  // createPlainingNoChamber() {
  //   // console.log(this.data);
  //   const tempData = this.data[0]
  //   const bodyEmit = {
  //     startDate: null,
  //     endDate: null,
  //     inspectionTime: this._qe_chamber.genInspectionTime(tempData.condition.data.inspection),
  //     reportQE: this._qe_chamber.genInspectionTime(tempData.condition.data.report),
  //     reportTime: this._qe_chamber.genInspectionTime(tempData.condition.data.report),
  //     operate: {
  //       attachment: {},
  //       checker: {},
  //       power: {},
  //       status: false
  //     },
  //     work: {
  //       requestId: tempData.step1.requestId,
  //       qty: tempData.condition.data.qty,
  //       controlNo: tempData.step1.controlNo,
  //     },
  //     condition: {
  //       name: 'No Chamber',
  //       value: tempData.condition.value
  //     },
  //     model: tempData.step1.modelNo,
  //     status: 'draft'
  //   }
  //   this.dataChange.emit([bodyEmit])
  //   // return bodyEmit
  // }

  // createNoOven() {
  //   console.log(this.data[0].step3.data);
  //   const fil = this.data[0].step3.data.filter((item: any) => item.checked && item.type == 'noOven')
  //   console.log(fil);
  //   // fil.map((item: any) => {
  //   //   return {
  //   //     startDate: null,
  //   //     endDate: null,
  //   //     inspectionTime: [
  //   //       {
  //   //         at: 0,
  //   //         startDate: null,
  //   //         endDate: null,
  //   //         hr: 0
  //   //       }
  //   //     ],
  //   //     reportQE:  [
  //   //       {
  //   //         at: 0,
  //   //         startDate: null,
  //   //         endDate: null,
  //   //         hr: 0
  //   //       }
  //   //     ],
  //   //     reportTime:  [
  //   //       {
  //   //         at: 0,
  //   //         startDate: null,
  //   //         endDate: null,
  //   //         hr: 0
  //   //       }
  //   //     ],
  //   //     operate: {
  //   //       attachment: {},
  //   //       checker: {},
  //   //       power: {},
  //   //       status: true
  //   //     },
  //   //     work: {
  //   //       requestId: this.data[0].step1.requestId,
  //   //       qty: selected.condition.data.qty,
  //   //       controlNo: selected.step1.controlNo,
  //   //     },
  //   //     condition: {
  //   //       name: selected.condition.dataTable.name,
  //   //       value: selected.condition.value
  //   //     },
  //   //     model: selected.step1.modelNo,
  //   //     status: 'draft'
  //   //   }
  //   // })
  // }

}
