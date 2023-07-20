import { CdkStepper } from '@angular/cdk/stepper';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-revises-sheet2',
  templateUrl: './revises-sheet2.component.html',
  styleUrls: ['./revises-sheet2.component.scss'],
  providers: []
})
export class RevisesSheet2Component implements OnInit {
  // @Input() step2: any
  @Input() requestId: any
  step2: any = null

  constructor(
    private $master: MasterHttpService,
    private _stepper: CdkStepper,
    private $revise: RevisesHttpService,
    private _loader: NgxUiLoaderService
  ) { }


  testPurposeForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(null),
    purpose: new FormControl('', Validators.required),
    description: new FormControl()
  })
  testPurposes: any = []
  async ngOnInit(): Promise<void> {

    const params: HttpParams = new HttpParams().set('id', this.requestId)
    const res = await this.$revise.getByRequestId(params).toPromise()
    this.step2 = res[0].step2
    this.testPurposes = await this.$master.getTestPurposeMaster().toPromise()
    this.testPurposes = this.testPurposes.map((t: any) => {
      if (t.name == this.step2.purpose) {
        return {
          ...t,
          checked: true,
          description: this.step2.description
        }
      }
      return t
    })
    this.testPurposeForm.patchValue({
      ...this.step2
    })

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

  onBack() {
    this._stepper.previous()
  }
  onNext() {
    Swal.fire({
      title: "Do you want to update?",
      icon: "question",
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this._loader.start()
        await this.$revise.updateByRequestId(this.testPurposeForm.value.requestId, { step2: this.testPurposeForm.value }).toPromise()
        setTimeout(() => {
          this._loader.stop()
          Swal.fire('Success', '', 'success')
          this._stepper.next()
        }, 1000);
      }
    })

  }

}
