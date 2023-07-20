import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogApproveComponent } from '../dialog-approve/dialog-approve.component';
import { RejectService } from '../reject.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-reject',
  templateUrl: './dialog-reject.component.html',
  styleUrls: ['./dialog-reject.component.scss']
})
export class DialogRejectComponent implements OnInit {

  select: any = null
  comment: any
  constructor(
    public dialogRef: MatDialogRef<DialogApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _reject: RejectService
  ) { }

  ngOnInit(): void {
  }
  onCancel() {
    this.dialogRef.close()
  }
  onSubmit() {
    const foundItem = this.data.form.step5.find((s: any) => s.prevStatusForm == this.select)
    const time = moment().format('YYYY-MM-DD, HH.mm')
    const newComment = this.comment ? `[${time}]${this.data.userLogin.name}-> ${this.comment}` : null
    this._reject.sendReject(this.data.userLogin, foundItem, this.data.form, newComment, this.select)
    this.dialogRef.close()


    // this._approve.send(this.data.userLogin, this.data.userApprove, this.data.form, this.comment)
    // this.dialogRef.close()
  }

}
