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
    private $chamber: ChamberHttpService
  ) { }
  displayedColumns: string[] = ['no', 'code', 'name', 'capacity', 'function', 'status', 'action'];
  rows: any
  load = false

  async ngOnInit(): Promise<void> {
    this.load = true
    if (this.data) {
      this.rows = await this.$chamber.getReady(this.data.value, this.data.startDate, this.data.qty).toPromise()
      setTimeout(() => {
        this.load = false
      }, 500);
    }
  }
  htmlCap(item: any){
    return `${item.run}/${item.capacity}`
  }
  htmlCalCapPercent(item: any) {
    const cap = Number(item.capacity)
    const use = Number(item.run) == 0 ? cap : Number(item.run)
    const percent = (use /cap )
    return percent
  }
  onSelect(e: any) {
    this.dialogRef.close(e)
  }

}
