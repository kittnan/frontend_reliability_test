import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dia-log-select-operate',
  templateUrl: './dia-log-select-operate.component.html',
  styleUrls: ['./dia-log-select-operate.component.scss']
})
export class DiaLogSelectOperateComponent implements OnInit {

  items: any = [
    {
      text: 'operate',
      value: true
    },
    {
      text: 'no-operate',
      value: false
    },
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) {

  }

  ngOnInit(): void {
  }
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.text === value.text;
  }
  emit() {
    this.dialogRef.close(this.data);
  }
}
