import { HttpParams } from '@angular/common/http';
import { Step4HttpService } from './../../../../../http/step4-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-sheet-step4',
  templateUrl: './sheet-step4.component.html',
  styleUrls: ['./sheet-step4.component.css']
})
export class SheetStep4Component implements OnInit {
  @Input() formId: any
  conditionForm: any = {
    data:[]
  }
  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step4: Step4HttpService
  ) { }

  async ngOnInit() {
    console.clear()
    console.log(this.formId);
    if (this.formId) {
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      const resGet = await this.$step4.get(params).toPromise();
      console.log(resGet);
      if (resGet && resGet.length > 0) {
        this.conditionForm = resGet[0]
        console.log(this.conditionForm);

      }

    }
  }

  onConditionForm() {
    console.log('@@@@@@', this.conditionForm);
    // this.conditionForm.data = this.data
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
    console.log('onNext', this.conditionForm);

  }




  async update() {
    alert('update')
    const resUpdate = await this.$step4.update(this.conditionForm._id, this.conditionForm).toPromise()
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  async insert() {
    alert('insert')
    this.conditionForm.requestId = this.formId

    const resInsert = await this.$step4.insert(this.conditionForm).toPromise()
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  onBack() {
    // this._stepper.previous();
  }

}
