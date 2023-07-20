import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApproveService } from '../approve.service';
import * as moment from 'moment';

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
  }
  onCancel() {
    this.dialogRef.close()
  }
  onSubmit() {
    if (this.data.form.status == "qe_window_person_report") {
      this._approve.finishJob(this.data.form, this.data.userLogin)
    } else {
      const time = moment().format('YYYY-MM-DD, HH.mm')
      const newComment = this.comment ? `[${time}]${this.data.userLogin.name}-> ${this.comment}` : null
      this._approve.send(this.data.userLogin, this.data.userApprove, this.data.form, newComment)
    }
    this.dialogRef.close()
  }

}
