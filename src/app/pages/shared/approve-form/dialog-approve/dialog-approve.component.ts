import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApproveService } from '../approve.service';

@Component({
  selector: 'app-dialog-approve',
  templateUrl: './dialog-approve.component.html',
  styleUrls: ['./dialog-approve.component.scss']
})
export class DialogApproveComponent implements OnInit {
  select: any
  comment: any
  constructor(
    public dialogRef: MatDialogRef<DialogApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _approve: ApproveService
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
  }
  onCancel() {
    this.dialogRef.close()
  }
  onSubmit() {
    if (this.data.form.status == "qe_window_person_report") {
      this._approve.finishJob(this.data.form, this.data.userLogin)
    } else {
      const newComment = this.comment ? `${this.data.userLogin.name}-> ${this.comment}` : null
      this._approve.send(this.data.userLogin, this.data.userApprove, this.data.form, newComment)
    }
    this.dialogRef.close()
  }

}
