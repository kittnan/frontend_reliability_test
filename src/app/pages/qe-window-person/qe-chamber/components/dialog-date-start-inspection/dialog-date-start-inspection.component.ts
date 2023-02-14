import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-date-start-inspection',
  templateUrl: './dialog-date-start-inspection.component.html',
  styleUrls: ['./dialog-date-start-inspection.component.scss']
})
export class DialogDateStartInspectionComponent implements OnInit {

  min = new Date()
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
  }
  onChange() {
    this.dialogRef.close(this.data)
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
}
