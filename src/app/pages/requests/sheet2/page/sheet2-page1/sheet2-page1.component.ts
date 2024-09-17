import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { RequestHttpService } from 'src/app/http/request-http.service';
import Swal from 'sweetalert2';
import { Sheet2Component } from '../../sheet2.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sheet2-page1',
  templateUrl: './sheet2-page1.component.html',
  styleUrls: ['./sheet2-page1.component.scss']
})
export class Sheet2Page1Component implements OnInit {

  userLogin: any = null
  public requestForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(''),
    controlNo: new FormControl(null, Validators.required),
    requestSubject: new FormControl(null, Validators.required),
    corporate: new FormControl('', Validators.required),
    requestStatus: new FormControl('normal', Validators.required),
    department: new FormControl('', Validators.required),
    requestDate: new FormControl<String | Date | null>(
      null,
      Validators.required
    ),
    sampleSentToQE_withinDate: new FormControl<String | Date | null>(
      null,
      Validators.required
    ),
    concernShipmentDate: new FormControl(''),
    inputToProductionDate: new FormControl(''),
    concernCustomerDate: new FormControl(''),
    reportRequireDate: new FormControl(''),
    modelNo: new FormControl('', Validators.required),
    modelName: new FormControl('', Validators.required),
    lotNo: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    sampleDescription: new FormControl('', Validators.required),
    files: new FormControl(<any>[]),
    upload: new FormControl(),

    sampleSendQty: new FormControl<Number | null>(
      null,
      Validators.required
    )
  });

  corporate: any[] = [
    {
      name: 'DST',
      value: 'dst',
    },
    {
      name: 'AMT',
      value: 'amt',
    },
  ];

  constructor(
    private _stepper: CdkStepper,
    private $request: RequestHttpService,
    private router:Router
  ) {
    let userLogin: any = localStorage.getItem('RLS_userLogin')
    if (userLogin) {
      this.userLogin = JSON.parse(userLogin)
      this.requestForm.controls.corporate.setValue(this.userLogin.department)
    } else {
      Swal.fire('Please login', '', 'error').then(() => this.router.navigate(['login']) )
    }
  }
  ngOnInit(): void {
    let timerInterval: any;
    Swal.fire({
      title: 'sample test ทุกตัวที่มาจาก MDL จะต้องมีการ write OTP มาก่อนทุกครั้ง และ ต้องผ่าน final inspection ก่อนเอาเข้า Reliability test',
      icon: 'warning',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      timer: 6000,
      timerProgressBar: true,
      didOpen: () => {
        const fn1 = () => {
          const SwalHtml = Swal.getPopup()
          if (SwalHtml) {
            const tagB: HTMLElement | null = SwalHtml.querySelector(".swal2-actions")
            if (tagB) {
              timerInterval = setInterval(() => {
                if (Swal.getTimerLeft()) {
                  const show = Number(Swal.getTimerLeft()) / 1000
                  tagB.textContent = `${Math.ceil(show)}`;
                }
              }, 100);
            }
          }
        }
        fn1()
      },
      willClose: () => {
        clearInterval(timerInterval);
      }

    })
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.requestForm) {
        this.requestForm.markAllAsTouched();
      }
    }, 3000);
  }
  async onSelectCorporate() {
    setTimeout(async () => {
      if (
        this.requestForm.controls.corporate.valid &&
        this.requestForm.controls.modelNo.valid
      ) {

        if (this.requestForm.value.controlNo) {
          let value: any = this.requestForm.value.controlNo
          value = value.split('-')
          let newModel: any = this.requestForm.value.modelNo?.padStart(6, '0')
          value = `${value[0]}-${value[1]}-${value[2]}-${value[3]}-${newModel}`
          this.requestForm.controls.controlNo.setValue(value)
        } else {
          const runNumber: any = await this.setControlNo(
            this.requestForm.value.corporate,
            this.requestForm.value.modelNo
          );
          this.requestForm.controls.controlNo.setValue(runNumber);
        }
      }
    }, 0);
  }
  async setControlNo(corporate: any, modelNo: any) {
    try {
      let setFirstDate = new Date().setDate(1)
      let setTime = new Date(setFirstDate).setHours(0, 0, 0, 0)
      let newDate = new Date(setTime)
      let res: any = await lastValueFrom(this.$request.count({
        date: newDate,
        corporate: corporate
      }))
      console.log("🚀 ~ res:", res)
    } catch (error) {
      console.log("🚀 ~ error:", error)
      Swal.fire(JSON.stringify(error), '', 'error')
    }
  }
  onNext() {
    // this._stepper.selectedIndex = 2;
  }
}
