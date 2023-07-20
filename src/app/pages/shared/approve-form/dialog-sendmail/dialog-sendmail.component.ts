import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SendMailService } from 'src/app/http/send-mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-sendmail',
  templateUrl: './dialog-sendmail.component.html',
  styleUrls: ['./dialog-sendmail.component.scss']
})
export class DialogSendmailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSendmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $mail: SendMailService,
    private $loader: NgxUiLoaderService
  ) { }
  ngOnInit(): void {
  }
  onCancel() {
    this.dialogRef.close()
  }
  async onSubmit() {
    try {
      this.$loader.start()
      const info: any = await this.$mail.sendEditPlan(this.data).toPromise()
      let li = info.accepted.reduce((p: any, n: any) => {
        return p += `<li>${n}</li>`
      }, '')
      this.dialogRef.close()

      Swal.fire({
        title: 'Send Mail Success !',
        icon: 'success',
        html: `
        <ul>
        ${li}
        </ul>
        `
      })

    } catch (error) {
      console.log(error);
      let errStr = JSON.stringify(error)
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errStr
      })
    } finally {
      setTimeout(() => {
        this.$loader.stop()
      }, 1000);
    }
  }


}
