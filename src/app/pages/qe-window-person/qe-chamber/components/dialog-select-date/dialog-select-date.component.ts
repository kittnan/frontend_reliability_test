import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-select-date',
  templateUrl: './dialog-select-date.component.html',
  styleUrls: ['./dialog-select-date.component.scss']
})
export class DialogSelectDateComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public date: any,
    private dialogRef: MatDialogRef<any>,
  ) { }
  ngOnInit(): void {
  }
  onChange() {
    this.dialogRef.close(this.date)
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

}
