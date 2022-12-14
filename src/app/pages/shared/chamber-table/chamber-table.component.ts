import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chamber-table',
  templateUrl: './chamber-table.component.html',
  styleUrls: ['./chamber-table.component.scss']
})
export class ChamberTableComponent implements OnInit {

  @Input() rows: any;
  @Output() rowsChange = new EventEmitter()
  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  displayedColumns: string[] = ['no', 'code', 'name', 'capacity', 'function', 'status'];


  ngOnInit(): void {
     (this.data);
    this.rows = this.data
  }
  calCap(item: any, index: any) {
    const sum = (parseInt(item.use) / parseInt(item.capacity)) * 100
    return sum + '%'
  }
}
