import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChamberHttpService } from 'src/app/http/chamber-http.service';
import { MasterHttpService } from 'src/app/http/master-http.service';

@Component({
  selector: 'app-dialog-qe-chamber',
  templateUrl: './dialog-qe-chamber.component.html',
  styleUrls: ['./dialog-qe-chamber.component.scss']
})
export class DialogQeChamberComponent implements OnInit {

  // @Input() rows: any;
  // @Output() rowsChange = new EventEmitter()
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $chamber :ChamberHttpService
  ) { }
  displayedColumns: string[] = ['no', 'code', 'name', 'capacity', 'function', 'status', 'action'];
  rows: any

  async ngOnInit(): Promise<void> {
    console.log(this.data);
    if (this.data) {
      this.rows = await this.$chamber.getChamberByValue(this.data).toPromise()
      console.log(this.rows);

    }
  }
  calCap(item: any) {
    const sum = (parseInt(item.use) / parseInt(item.capacity)) * 100
    return `${sum}% ( ${item.use}/${item.capacity} )`
  }
  onSelect(e: any) {
    this.dialogRef.close(e)
  }

}
