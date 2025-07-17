import { HttpParams } from '@angular/common/http';
import { Step4HttpService } from './../../../../../http/step4-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Step3HttpService } from 'src/app/http/step3-http.service';
import { Step1HttpService } from 'src/app/http/step1-http.service';

@Component({
  selector: 'app-sheet-step4',
  templateUrl: './sheet-step4.component.html',
  styleUrls: ['./sheet-step4.component.scss']
})
export class SheetStep4Component implements OnInit {
  @Input() formId: any
  conditionForm: any = {
    data: []
  }
  table: any[] = []
  chamber: any
  step1: any
  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step4: Step4HttpService,
    private $step3: Step3HttpService,
    private $step1: Step1HttpService
  ) { }

  async ngOnInit() {

    if (this.formId) {
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      const resStep3 = await this.$step3.get(params).toPromise();
      const resStep4 = await this.$step4.get(params).toPromise();
      const resStep1 = await this.$step1.get(params).toPromise();
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
      if (resStep1 && resStep1.length > 0) {
        this.step1 = resStep1[0]
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

}
