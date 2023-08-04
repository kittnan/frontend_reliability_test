import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { SendMailService } from 'src/app/http/send-mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-approve-revises',
  templateUrl: './dialog-approve-revises.component.html',
  styleUrls: ['./dialog-approve-revises.component.scss']
})
export class DialogApproveRevisesComponent implements OnInit {
  select: any
  comment: any
  userLogin: any = null
  constructor(
    public dialogRef: MatDialogRef<DialogApproveRevisesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $revise: RevisesHttpService,
    private _loader: NgxUiLoaderService,
    private router: Router,
    private $mail: SendMailService,
    private $request: RequestHttpService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)

  }

  ngOnInit(): void {
    // console.log(this.data);

  }
  onCancel() {
    this.dialogRef.close()
  }
  async onSubmit() {

    try {
      this._loader.start()
      const time = moment().format('YYYY-MM-DD, HH.mm')
      const newComment = this.comment ? `[${time}]${this.data.userLogin.name}-> ${this.comment}` : null

      let userApprove = {
        _id: this.data.userApprove.selected._id,
        name: this.data.userApprove.selected.name
      }
      // console.log("🚀 ~ userApprove:", userApprove)


      const updateData = {
        ...this.data.form,
        nextApprove: this.data?.form?.level === 19 ? null : userApprove,
        level: this.generateLevelApprove(this.data.form.level),
        comment: this.generateComment(this.data.form.comment, newComment),
        status: this.generateNextStatus(this.data.form.level),
        historyApprove: this.genHistoryApprove(this.data.form.historyApprove, this.userLogin, this.data.form),
        // formSubmit: this.data.formSubmit
      }


      if (this.data?.form?.level === 19) {
        try {
          const request = this.data.prevForm
          delete request._id
          await this.$request.backup_request(request).toPromise()
          await this.$revise.mergeOverrideForm({
            data: updateData,
            controlNo: this.data.form.controlNo,
            requestId: this.data.form.requestId
          }).toPromise()
        } catch (error) {
          console.log(error);
        }
      } else {
        await this.$revise.updateByRequestId(updateData.requestId, updateData).toPromise()
      }

      const toList = [this.data.userApprove.selected._id]
      const statusForm = updateData.status
      const formId = this.data.form.requestId
      let ccUser = this.data.userApprove.groupList.map((g: any) => g._id)
      ccUser = ccUser.concat(this.data.form?.followUp?.map((f: any) => f._id))
      // unique ccUser
      ccUser = [...new Set(ccUser)]

      this.sendMail(toList, statusForm, formId, ccUser)
      this.alertSuccess()
      setTimeout(() => {
        this.dialogRef.close()
        this.router.navigate(['request/'])
        this._loader.stop()
      }, 1000);

      //   }
      // })

    } catch (error) {
      Swal.fire('Some thing it wrong. Please try again!', '', 'error')
      setTimeout(() => {
        this._loader.stop()
      }, 1000);
    } finally {
      setTimeout(() => {
        this._loader.stop()
      }, 1000);

    }


  }
  private generateLevelApprove(level: any) {
    switch (level) {
      case 13:
        return 14
        break;
      case 13.5:
        return 14
        break;
      case 14:
        return 15
        break;
      case 15:
        return 16
        break;
      case 15.5:
        return 16
        break;
      case 16:
        return 17
        break;
      case 17:
        return 18
        break;
      case 18:
        return 19
        break;
      case 19:
        return 20
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
      case 13:
        return 'request_revise'
        break;
      case 13.5:
        return 'request_revise'
        break;

      case 14:
        return 'request_approve_revise'
        break;

      case 15:
        return 'qe_window_person_revise'
        break;
      case 15.5:
        return 'qe_window_person_revise'
        break;

      case 16:
        return 'qe_engineer_revise'
        break;
      case 17:
        return 'qe_engineer_revise2'
        break;
      case 18:
        return 'qe_section_head_revise'
        break;
      case 19:
        return 'request_revise_confirm'
        break;
      case 20:
        return 'finish'
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
      action: 'approve',
      _id: userLogin._id,
      name: userLogin.name
    }
    return historyApprove ? [...historyApprove, newHistory] : [newHistory]
  }


  private async sendMail(to: any[], status: string, formId: string, cc: string[]) {
    const body = {
      to: to,
      status: status,
      formId: formId,
      cc: cc,
    }
    const resSendMail = await this.$mail.send(body).toPromise()

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
