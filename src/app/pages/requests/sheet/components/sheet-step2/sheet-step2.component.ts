import { Step2HttpService } from './../../../../../http/step2-http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CdkStepper } from '@angular/cdk/stepper';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sheet-step2',
  templateUrl: './sheet-step2.component.html',
  styleUrls: ['./sheet-step2.component.css']
})
export class SheetStep2Component implements OnInit {
  @Input() formId: any
  @Input() propReviseMode: boolean = false
  // @Output() dataChange: EventEmitter<any> = new EventEmitter()

  testPurposeForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(null),
    purpose: new FormControl('', Validators.required),
    description: new FormControl()
  })
  testPurposes: any = []
  disable: boolean = false
  constructor(
    private $master: MasterHttpService,
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step2: Step2HttpService,
    public tr: TranslateService
  ) { }

  async ngOnInit() {
    if (this.propReviseMode) {
      this.disable = true
    }
    this.testPurposes = await this.$master.getTestPurposeMaster().toPromise()
    if (this.formId) {
      const params = new HttpParams().set('requestId', this.formId)
      const resGet = await this.$step2.get(params).toPromise()
      if (resGet && resGet.length > 0) {
        this.testPurposes = this.testPurposes.map((t: any) => {
          if (t.name == resGet[0].purpose) {
            return {
              ...t,
              checked: true,
              description: resGet[0].description
            }
          }
          return t
        })
        this.testPurposeForm.patchValue({
          ...resGet[0]
        })
      }
    }
  }

  compareTranslate(item: any) {
    return `${item}`
  }

  onCheckRadio(event: any, purpose: any) {
    if (purpose['description'].status) {
      let temp: any = document.getElementById(purpose._id)
      temp.value = ''
    }
    this.testPurposes = this.testPurposes.map((p: any) => {
      p.checked = false
      p['description'].value = ""
      return p
    })
    purpose.checked = true
    this.testPurposeForm.patchValue({
      purpose: purpose.name,
      description: purpose.description
    })
  }
  onInputDescription(event: any) {
    const value = event.target.value
    this.testPurposeForm.patchValue({
      description: {
        status: true,
        value: value
      }
    })
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
  onNextStep() {
    this._stepper.next()
  }


}
