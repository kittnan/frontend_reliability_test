import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DialogApproveComponent } from '../../approve-form/dialog-approve/dialog-approve.component';
import { RejectService } from '../../approve-form/reject.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-dialog-reject-revises',
  templateUrl: './dialog-reject-revises.component.html',
  styleUrls: ['./dialog-reject-revises.component.scss']
})
export class DialogRejectRevisesComponent implements OnInit {
  select: any = null
  comment: any
  userLogin: any = null
  constructor(
    public dialogRef: MatDialogRef<DialogApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $revise: RevisesHttpService,
    private _loader: NgxUiLoaderService,
    private router: Router
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  ngOnInit(): void {
    console.log(this.data);
    this.select = this.data.option[0]
  }
  onCancel() {
    this.dialogRef.close()
  }
  async onSubmit() {
    try {
      // this._loader.start()
      const time = moment().format('YYYY-MM-DD, HH.mm')
      const newComment = this.comment ? `[${time}]${this.data.userLogin.name}-> ${this.comment}` : null
      console.log("🚀 ~ newComment:", newComment)

      const userApprove = {
        _id: this.select._id,
        name: this.select.name
      }
      console.log("🚀 ~ userApprove:", userApprove)
      const updateData = {
        ...this.data.form,
        nextApprove: userApprove,
        level: this.generateLevelReject(this.data.form.level),
        comment: this.generateComment(this.data.form.comment, newComment),
        status: this.generateNextStatus(this.data.form.level),
        historyApprove: this.genHistoryApprove(this.data.form.historyApprove, this.userLogin, this.data.form)
      }
      console.log("🚀 ~ updateData:", updateData)

      Swal.fire({
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          await this.$revise.updateByRequestId(updateData.requestId, updateData).toPromise()
          this.alertSuccess()
          setTimeout(() => {
            this.dialogRef.close()
            this.router.navigate(['request/'])
            this._loader.stop()
          }, 1000);
        }
      })

    } catch (error) {
      console.log(error);
      setTimeout(() => {
        this._loader.stop()
      }, 1000);
    } finally {
      setTimeout(() => {
        this._loader.stop()
      }, 1000);
    }



    // this.dialogRef.close()
  }

  private generateLevelReject(level: any) {
    switch (level) {
      case 14:
        return 13.5
        break;
      case 15:
        return 13.5
        break;
      case 16:
        return 13.5
        break;
      case 17:
        return 13.5
        break;
      case 18:
        return 13.5
        break;
      case 19:
        return 13.5
        break;


      default:
        return level
        break;
    }
  }
  private generateComment(comment: any[], newComment: any) {
    if (newComment) return [...comment, newComment]
    return comment
  }
  private generateNextStatus(currentLevel: any) {
    switch (currentLevel) {
      case 14:
        return 'reject_request_revise'
        break;

      default:
        return ''
        break;
    }
  }
  private genHistoryApprove(historyApprove: any, userLogin: any, form: any) {
    const newHistory = {
      status: form.status,
      level: form.level,
      action: 'reject',
      _id: userLogin._id,
      name: userLogin.name
    }
    return historyApprove ? [...historyApprove, newHistory] : [newHistory]
  }

  private alertSuccess() {
    Swal.fire({
      title: "SUCCESS",
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    })
  }

}
