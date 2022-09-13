import { CdkStepper } from '@angular/cdk/stepper';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { HomeServiceService } from '../home-service.service';
import { Step1RequestService } from './step1-request.service';

export interface FilesForm {
  name: string;
  updated: Date;
  size: number
}
export interface ModelNo {
  modelNo: string;
  modelName: string;
  type: string;
  customer: string;
}
export interface Department {
  name: string;
}
@Component({
  selector: 'app-step1-request',
  templateUrl: './step1-request.component.html',
  styleUrls: ['./step1-request.component.scss'],
})
export class Step1RequestComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload!: ElementRef

  nextStepButton!: HTMLButtonElement
  requestForm = new FormGroup({
    controlNo: new FormControl('', Validators.required),
    corporate: new FormControl('', Validators.required),
    requestStatus: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    requestDate: new FormControl('', Validators.required),
    concernShipmentDate: new FormControl(''),
    inputToProductionDate: new FormControl(''),
    concernCustomerDate: new FormControl(''),
    reportRequireDate: new FormControl(''),
    sampleSentToQE_withinDate: new FormControl(''),
    modelNo: new FormControl('', Validators.required),
    modelName: new FormControl('', Validators.required),
    lotNo: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    sampleDescription: new FormControl(''),
    files: new FormControl(<any>[], Validators.required)
  })

  corporate: any[] = [
    {
      name: 'AMT',
      value: 'amt'
    },
    {
      name: 'DST',
      value: 'dst'
    }
  ]

  files: any[] = []
  models: ModelNo[] = []
  departments: Department[] = []
  constructor(
    private step1: Step1RequestService,
    private _homeService: HomeServiceService,
    private _toast_service: ToastService,
    private _loading: NgxUiLoaderService,
    private _stepper: CdkStepper

  ) {

  }

  ngOnInit(): void {
    this._homeService.getModelMaster().subscribe(res => {
      this.models = res
    })
    this._homeService.getDepartmentMaster().subscribe(res => {
      this.departments = res
    })
  }

  async onSelectCorporate() {
    if (this.requestForm.controls.corporate.valid && this.requestForm.controls.modelNo.valid) {
      const runNumber: any = await this.step1.setControlNo(this.requestForm.value.corporate, this.requestForm.value.modelNo)
      this.requestForm.controls.controlNo.setValue(runNumber)
    }
  }
  onSelectModelNo(item: ModelNo) {
    this.requestForm.patchValue({
      modelNo: item.modelNo,
      modelName: item.modelName,
      type: item.type,
      customer: item.customer,
    })
  }

  onUploadFile(e: any) {
    const filesInput: any = this.fileUpload.nativeElement.files;
    // console.log(filesInput);
    // console.log(e.target.files);

    if (filesInput.length > 0) {
      let overSize = []
      for (let index = 0; index < filesInput.length; index++) {
        if (filesInput[index].size <= 200000) {
          this.files.push(filesInput[index]);
          this.requestForm.patchValue({
            files: this.files
          })
        } else {
          overSize.push(filesInput[index]);
        }

        if (index + 1 === filesInput.length) {
          if (overSize.length > 0) {
            let text = overSize.reduce((prev, now) => {
              return prev += `${now.name} `
            }, '')
            Swal.fire(`Files ${text} is maximum limit 20Mb`,'','warning')
            this.fileUpload.nativeElement.value = ""
          } else {
            this.fileUpload.nativeElement.value = ""
          }
        }
      }
    } else {
      this.fileUpload.nativeElement.value = ""
    }
  }
  onClickViewFile(file: File) {
    const fileTypes = ['image/gif', 'image/jpeg', 'image/png']
    if (fileTypes.find(t => t == file.type)) {
      const objUrl = URL.createObjectURL(file)
      window.open(objUrl, '_blank')
    }
    // const objUrl = URL.createObjectURL(file)
    // window.open(objUrl,'_blank')

  }

  onClickDeleteFile(file: File) {
    Swal.fire({
      title: `Do you want to delete ${file.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then(ans => {
      if (ans.isConfirmed) {
        this._loading.start()
        this.files = this.files.filter((f: any) => f != file);
        this.requestForm.patchValue({
          files: this.files
        })
        setTimeout(() => {
          this._loading.stopAll()
          Swal.fire('Success', '', 'success')
        }, 200);
      }
    })
  }

  onNext() {
    // this._stepper.next();

    this._loading.start()
    if (this.requestForm.valid) {
      this.requestForm.patchValue({
        files: this.files
      })
      this._homeService.setFormStep1(this.requestForm.value)
      setTimeout(() => {
        this._loading.stopAll();
        this._stepper.next();
      }, 500);
    } else {
      setTimeout(() => {
        this._loading.stopAll();
        Swal.fire('Step 1 not valid !!', '', 'warning');
      }, 500);

    }
  }
}
