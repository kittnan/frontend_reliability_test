import { RequestHttpService } from './../../../../../http/request-http.service';
import { HttpParams } from '@angular/common/http';
import { Step4HttpService } from './../../../../../http/step4-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Step3HttpService } from 'src/app/http/step3-http.service';
import { Router } from '@angular/router';
import { _MatRadioButtonBase } from '@angular/material/radio';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogReviseApproveComponent } from '../../../revises/dialog-revise/dialog-revise-approve/dialog-revise-approve.component';
import { Step5HttpService } from 'src/app/http/step5-http.service';

@Component({
  selector: 'app-sheet-step4',
  templateUrl: './sheet-step4.component.html',
  styleUrls: ['./sheet-step4.component.css']
})
export class SheetStep4Component implements OnInit {
  @Input() formId: any
  @Input() propReviseMode: boolean = false

  conditionForm: any = {
    data: []
  }
  table: any[] = []
  chamber: any
  userLogin: any
  step5: any
  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step4: Step4HttpService,
    private $step3: Step3HttpService,
    private $step5: Step5HttpService,
    private _router: Router,
    private $request: RequestHttpService,
    private $revise: RevisesHttpService,
    public dialog: MatDialog
  ) {
    let tempUserLogin: any = localStorage.getItem('RLS_userLogin')
    tempUserLogin = JSON.parse(tempUserLogin)
    this.userLogin = tempUserLogin
  }

  async ngOnInit() {
    if (this.formId) {
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      const resStep3 = await this.$step3.get(params).toPromise();
      const resStep4 = await this.$step4.get(params).toPromise();
      if (resStep3 && resStep3.length > 0) {
        if (resStep3[0].data.find((d: any) => d.checked && d.type == 'oven')) {
          this.chamber = 'yes'
        } else {
          this.chamber = 'no'
        }
      }
      if (resStep4 && resStep4.length > 0) {
        this.conditionForm = resStep4[0]
      }

    }
  }

  onConditionForm(e: any) {
    this.conditionForm = e
    this.table = this.conditionForm.data
  }

  onNext() {
    Swal.fire({
      title: 'Do you want to save draft?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        if (this.conditionForm._id) {
          this.update()
        } else {
          this.insert()
        }
      }
    })
  }




  async update() {
    const resUpdate = await this.$step4.update(this.conditionForm._id, this.conditionForm).toPromise()
    setTimeout(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      })
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  async insert() {
    this.conditionForm.requestId = this.formId
    const resInsert = await this.$step4.insert(this.conditionForm).toPromise()
    setTimeout(() => {
      this.conditionForm._id = resInsert[0]._id
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      })
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  onBack() {
    this._stepper.previous();
  }

  handleReviseRequest() {

    const reviseDialogRef = this.dialog.open(DialogReviseApproveComponent, {
      width: '500px',
      height: 'auto',
      data: {
        dialogRef: {
          title: 'Request Revise',
          submitText: 'Submit'
        }
      }
    })

    reviseDialogRef.afterClosed().subscribe((resDialog: any) => {
      console.log(resDialog);
      if (resDialog) {
        this.insertRevise(resDialog)
      }
    })


  }

  private async insertRevise(resDialog: any) {
    try {

      let newComment = resDialog.comment ? [`${this.userLogin.name} ->>> ${resDialog.comment}`] : []
      const foundNextApprove = this.step5.find((s: any) => s.prevStatusForm == 'qe_window_person')
      let nextApprove = foundNextApprove ? foundNextApprove.prevUser : null
      this._loading.start()
      console.log('handleReviseRequest');
      const body = {
        requestId: this.formId,
        step4: this.conditionForm.data,
        status: 'request_revise',
        level: 13,
        nextApprove: nextApprove,
        comment: newComment
      }
      await this.$revise.insert(body).toPromise()

      Swal.fire({
        title: 'Request Revise Success!!! ',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      }).then((v: any) => {
        this._router.navigate(['/request/revises-table'])
      })
      this._loading.stop()
    } catch (error) {
      console.log(error);
      Swal.fire(`Can't request revise!!!`, '', 'error')
      this._loading.stop()
      this._router.navigate(['/request/revises-table'])
    } finally {
      this._loading.stop()
    }
  }

  onCancel() {
    this._router.navigate(['/request/revises-table'])
  }

}
