import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-select-temp',
  templateUrl: './dialog-select-temp.component.html',
  styleUrls: ['./dialog-select-temp.component.scss']
})
export class DialogSelectTempComponent {

  temp: any = ''
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) {
  }


  onSelectTemp(temp: any) {
    this.dialogRef.close(temp);
  }

}
