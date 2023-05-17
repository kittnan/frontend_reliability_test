import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogApproveComponent } from '../dialog-approve/dialog-approve.component';
import { RejectService } from '../reject.service';

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
    console.log(this.data);
  }
  onCancel() {
    this.dialogRef.close()
  }
  onSubmit() {
    const foundItem = this.data.form.step5.find((s: any) => s.prevStatusForm == this.select)
    const newComment = this.comment ? `${this.data.userLogin.name}-> ${this.comment}` : null
    this._reject.sendReject(this.data.userLogin, foundItem, this.data.form, newComment, this.select)
    this.dialogRef.close()


    // this._approve.send(this.data.userLogin, this.data.userApprove, this.data.form, this.comment)
    // this.dialogRef.close()
  }

}
