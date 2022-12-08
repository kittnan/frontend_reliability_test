import { Step2HttpService } from './../../../../../http/step2-http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CdkStepper } from '@angular/cdk/stepper';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sheet-step2',
  templateUrl: './sheet-step2.component.html',
  styleUrls: ['./sheet-step2.component.css']
})
export class SheetStep2Component implements OnInit {
  @Input() formId: any
  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  testPurposeForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(null),
    purpose: new FormControl('', Validators.required),
    description: new FormControl()
  })
  testPurposes: any = []

  constructor(
    private $master: MasterHttpService,
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step2: Step2HttpService
  ) { }

  async ngOnInit() {
    this.testPurposes = await this.$master.getTestPurposeMaster().toPromise()
    console.log(this.data);
  }

  onCheckRadio(event: any, purpose: any) {
    if (purpose['description'].status) {
      let temp: any = document.getElementById(purpose._id)
      temp.value = ''
    }
    this.testPurposes = this.testPurposes.map((purpose: any) => {
      purpose.checked = false
      purpose['description'].value = ""
      return purpose
    })
    purpose.checked = true
    this.testPurposeForm.patchValue({
      purpose: purpose.name,
      description: {
        status: true,
        value: ''
      }
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

    console.log(this.formId);


    // Swal.fire({
    //   title: `Do you want to save draft?`,
    //   icon: 'question',
    //   showCancelButton: true
    // }).then((value: SweetAlertResult) => {
    //   if (value.isConfirmed) {
    //     this._loading.start()
    //     if (this.testPurposeForm.value._id) {
    //       this.update()
    //     } else {
    //       this.insert()
    //     }
    //   }
    // })


    // console.log(this.testPurposeForm.value);

    // this._loading.start()
    // this.step2Change.emit(this.testPurposeForm.value)
    // this._loading.stopAll();
    // this._stepper.next();
    // // if (this.testPurposeForm.valid) {
    // //   this._homeService.setFormStep2(this.testPurposeForm.value)
    // //   setTimeout(() => {
    // //     this._loading.stopAll();
    // //     this._stepper.next();
    // //   }, 500);
    // // } else {
    // //   setTimeout(() => {
    // //     this._loading.stopAll();
    // //     Swal.fire('Form not valid!!', '', 'warning');
    // //   }, 500);
    // // }
  }

  async insert() {
    console.log(this.testPurposeForm.value,this.formId);
    const dataInsert = this.testPurposeForm.value
    delete dataInsert._id
    const resInsert = await this.$step2.insert(dataInsert).toPromise()

    setTimeout(() => {
      Swal.fire('SUCCESS','','success')
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);

  }
  update() {

  }

  onBack() {
    // this._stepper.previous()
  }


}
