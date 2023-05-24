import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogQeChamberComponent } from '../../../qe-chamber/components/dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from '../../../qe-chamber/components/dialog-qe-operate/dialog-qe-operate.component';
import { QueueForm } from '../../../qe-chamber/qe-chamber.component';
import { QeChamberService } from '../../../qe-chamber/qe-chamber.service';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.scss']
})
export class PlanningTableComponent implements OnInit {


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
      this.dataSource = new MatTableDataSource(this.data)
    }
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


}
