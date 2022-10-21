import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SetSubjectService } from '../set-subject.service';

@Component({
  selector: 'app-step2-testing-purpose',
  templateUrl: './step2-testing-purpose.component.html',
  styleUrls: ['./step2-testing-purpose.component.scss']
})
export class Step2TestingPurposeComponent implements OnInit {

  @Input() step2: any;
  @Output() step2Change = new EventEmitter();


  testPurposeForm = new FormGroup({
    purpose: new FormControl('', Validators.required),
    description: new FormControl()
  })

  testPurposes: any = []
  constructor(
    private _homeService: SetSubjectService,
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      if (id) {
        const step2: any = this._homeService.getFormStep2()
        this._homeService.getTestPurposeMaster().subscribe(res => {
          if (res) {
            this.testPurposes = res;
            this.testPurposes = this.testPurposes.map((t: any) => {
              if (t.name == step2.purpose) {
                this.testPurposeForm.patchValue({
                  ...step2
                })
                t.checked = true;
                t.description = step2.description
                return t
              } else {
                return t
              }
            })
          }
        })
      } else {
        this._homeService.getTestPurposeMaster().subscribe(res => {
          this.testPurposes = res

        })
      }
    })
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
    this._loading.start()
    this.step2Change.emit(this.testPurposeForm.value)
    this._loading.stopAll();
    this._stepper.next();
    // if (this.testPurposeForm.valid) {
    //   this._homeService.setFormStep2(this.testPurposeForm.value)
    //   setTimeout(() => {
    //     this._loading.stopAll();
    //     this._stepper.next();
    //   }, 500);
    // } else {
    //   setTimeout(() => {
    //     this._loading.stopAll();
    //     Swal.fire('Form not valid!!', '', 'warning');
    //   }, 500);
    // }
  }

  onBack() {
    this._stepper.previous()
  }

}
