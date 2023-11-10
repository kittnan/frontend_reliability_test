import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogQeChamberComponent } from 'src/app/pages/qe-window-person/qe-chamber/components/dialog-qe-chamber/dialog-qe-chamber.component';
import { QueueForm } from 'src/app/pages/qe-window-person/qe-chamber/qe-chamber.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-detail2',
  templateUrl: './plan-detail2.component.html',
  styleUrls: ['./plan-detail2.component.scss'],
})
export class PlanDetail2Component implements OnInit {
  @Input() index!: number;
  @Input() item: any;
  @Input() formInput: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  dialogChamber(item: QueueForm) {
    if (item && item.startDate) {
      const dialogRef = this.dialog.open(DialogQeChamberComponent, {
        data: {
          value: item.condition?.value,
          startDate: item.startDate,
          qty: 0,
          // qty: item.work?.qty,
        },
      });
      dialogRef.afterClosed().subscribe(async (res) => {
        if (res) {
          // console.log(res);

          item.chamber = res;
        }
      });
    } else {
      Swal.fire('PLEASE SELECT DATE INSPECTION INITIAL !!!', '', 'warning');
    }
  }
}
