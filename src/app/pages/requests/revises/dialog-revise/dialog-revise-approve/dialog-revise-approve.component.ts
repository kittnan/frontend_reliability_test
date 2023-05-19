import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogApproveComponent } from 'src/app/pages/shared/approve-form/dialog-approve/dialog-approve.component';

@Component({
  selector: 'app-dialog-revise-approve',
  templateUrl: './dialog-revise-approve.component.html',
  styleUrls: ['./dialog-revise-approve.component.scss']
})
export class DialogReviseApproveComponent implements OnInit {

  select: any
  comment: any
  constructor(
    public dialogRef: MatDialogRef<DialogApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
  }
  onCancel() {
    this.dialogRef.close(null)
  }
  onSubmit() {
    this.dialogRef.close({
      comment: this.comment
    })
  }

}
