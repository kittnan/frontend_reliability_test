import { Step2HttpService } from './../../../../../http/step2-http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CdkStepper } from '@angular/cdk/stepper';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

interface descriptionForm {
  status: boolean,
  value: string
}
@Component({
  selector: 'app-sheet3-step2',
  templateUrl: './sheet3-step2.component.html',
  styleUrls: ['./sheet3-step2.component.scss']
})
export class Sheet3Step2Component implements OnInit {

  @Input() formId: any
  // @Input() data: any
  // @Output() dataChange: EventEmitter<any> = new EventEmitter()

  testPurposeForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(null),
    purpose: new FormControl('', Validators.required),
    description: new FormControl<descriptionForm>({ status: true, value: '' }, Validators.required),
  })
  testPurposes: any = []

  constructor(
    private $master: MasterHttpService,
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step2: Step2HttpService,
    public tr: TranslateService
  ) { }

  async ngOnInit() {
    this.testPurposes = await this.$master.getTestPurposeMaster().toPromise()
    this.testPurposes = this.testPurposes.map((purpose: any) => {
      purpose.description = {
        status: true,
        value: ''
      }
      return purpose
    })
    if (this.formId) {
      const params = new HttpParams().set('requestId', this.formId)
      const resGet = await this.$step2.get(params).toPromise()
      if (resGet && resGet.length > 0) {
        this.testPurposeForm.patchValue({
          ...resGet[0]
        })

      }
    }
  }

  compareTranslate(item: any) {
    return `${item}`
  }


  onNext() {
    this.testPurposeForm.patchValue({
      requestId: this.formId
    })
    Swal.fire({
      title: `Do you want to save draft?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        if (this.testPurposeForm.value._id) {
          this.update()
        } else {
          this.insert()
        }
      }
    })

  }

  async insert() {
    const dataInsert = this.testPurposeForm.value
    delete dataInsert._id
    const resInsert = await this.$step2.insert(dataInsert).toPromise()

    setTimeout(() => {
      this.testPurposeForm.patchValue({ _id: resInsert[0]._id })
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
  async update() {
    const resUpdate = await this.$step2.update(this.testPurposeForm.value._id, this.testPurposeForm.value).toPromise()
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

  onBack() {
    this._stepper.previous()
  }

  // handleValidClassDescription(purpose: any) {
  //   if (purpose.checked) {
  //     if (purpose.description.status) {
  //       if (purpose.description.value.trim() == '') {
  //         return 'text-red'
  //       }handleDescription
  //     }
  //   }
  //   return ''
  // }
  handleDescription() {
    if (this.testPurposeForm.value?.description?.status && this.testPurposeForm.value.description.value.trim() !== '') {
      return false
    }
    return true
  }

  // todo new Selection
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.name === value.purpose;
  }
  controlValuePurpose() {
    return this.testPurposeForm.value
  }
  onChangePurpose(purpose: any) {
    this.testPurposeForm.patchValue({
      purpose: purpose.name,
      description: purpose.description
    })

  }
  controlValueDescription() {
    return this.testPurposeForm.controls.description.value?.value ? this.testPurposeForm.controls.description.value.value : ''
  }
  onChangeDescription(e: any) {
    if (e.target.value) {
      this.testPurposeForm.controls.description.patchValue({
        value: e.target.value,
        status: true
      })
    }else{
      this.testPurposeForm.controls.description.patchValue({
        value: '',
        status: true
      })
    }
  }
}
