import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-approve-revises',
  templateUrl: './dialog-approve-revises.component.html',
  styleUrls: ['./dialog-approve-revises.component.scss']
})
export class DialogApproveRevisesComponent implements OnInit {
  select: any
  comment: any
  constructor(
    public dialogRef: MatDialogRef<DialogApproveRevisesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $revise: RevisesHttpService,
    private _loader: NgxUiLoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onCancel() {
    this.dialogRef.close()
  }
  async onSubmit() {

    try {
      this._loader.start()
      const newComment = this.comment ? `${this.data.userLogin.name}-> ${this.comment}` : null
      const updateData = {
        ...this.data.form,
        nextApprove: {
          _id: this.data.userApprove.selected._id,
          name: this.data.userApprove.selected.name
        },
        level: this.generateLevelApprove(this.data.form.level),
        comment: this.generateComment(this.data.form.comment, newComment)
      }
      await this.$revise.updateByRequestId(updateData.requestId, updateData).toPromise()
      Swal.fire('success', '', 'success')
      setTimeout(() => {
        this.dialogRef.close()
        this.router.navigate(['request/'])
        this._loader.stop()
      }, 1000);
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

      default:
        return level
        break;
    }
  }
  private generateLevelReject(level: any) {
    switch (level) {
      case 14:
        return 14
        break;

      default:
        return level
        break;
    }
  }

  private generateComment(comment: any[], newComment: any) {
    return [...comment, newComment ? newComment : []]
  }

}
