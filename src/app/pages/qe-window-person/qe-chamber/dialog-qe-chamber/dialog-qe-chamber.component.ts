import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-qe-chamber',
  templateUrl: './dialog-qe-chamber.component.html',
  styleUrls: ['./dialog-qe-chamber.component.scss']
})
export class DialogQeChamberComponent implements OnInit {

  @Input() rows: any;
  @Output() rowsChange = new EventEmitter()
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  displayedColumns: string[] = ['no', 'code', 'name', 'capacity', 'function', 'status','action'];


  ngOnInit(): void {
    console.log(this.data);
    this.rows = this.data
  }
  calCap(item: any, index: any) {
    const sum = (parseInt(item.use) / parseInt(item.capacity)) * 100
    return sum + '%'
  }
  onSelect(e:any){
    this.dialogRef.close(e)
  }

}
