import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.scss']
})
export class DialogAuthComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {

  }

  onClick(item: any) {
    this.dialogRef.close(item)
  }
  htmlAuth(auth: string) {
    let str: string = ''
    switch (auth) {
      case 'qe_section_head':
        str = 'qc_dept_head'
        break;
      case 'qe_engineer2':
        str = 'qe_sec_head'
        break;
      default:
        str = auth
        break;
    }
    return str
  }

}
