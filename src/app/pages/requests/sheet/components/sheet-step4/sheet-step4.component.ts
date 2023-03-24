import { HttpParams } from '@angular/common/http';
import { Step4HttpService } from './../../../../../http/step4-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Step3HttpService } from 'src/app/http/step3-http.service';

@Component({
  selector: 'app-sheet-step4',
  templateUrl: './sheet-step4.component.html',
  styleUrls: ['./sheet-step4.component.css']
})
export class SheetStep4Component implements OnInit {
  @Input() formId: any
  conditionForm: any = {
    data: []
  }
  table: any[] = []
  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step4: Step4HttpService,
    private $step3: Step3HttpService
  ) { }

  async ngOnInit() {
    if (this.formId) {
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      // const resStep3 = await this.$step3.get(params).toPromise();
      // console.log("🚀 ~ file: sheet-step4.component.ts:31 ~ SheetStep4Component ~ ngOnInit ~ resStep3", resStep3)
      const resStep4 = await this.$step4.get(params).toPromise();
      // console.log("🚀 ~ file: sheet-step4.component.ts:33 ~ SheetStep4Component ~ ngOnInit ~ resStep4", resStep4)
      // console.log(resStep4);

      if (resStep4 && resStep4.length > 0) {
        this.conditionForm = resStep4[0]
      }

    }
  }

  onConditionForm() {
    // this.conditionForm.data = this.data
    // console.log(this.conditionForm);
    const foo = this.conditionForm.data.find((d: any) => d.value == 0)
    if (foo) {
      this.table = []
    } else {
      this.table = this.conditionForm.data
    }
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
    // console.log(this.conditionForm);

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
    // console.log(this.conditionForm);

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
