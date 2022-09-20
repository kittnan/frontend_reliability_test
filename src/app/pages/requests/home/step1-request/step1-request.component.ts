import { CdkStepper } from '@angular/cdk/stepper';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
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
    files: new FormControl(<any>[], Validators.required),
    files_old: new FormControl()
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
  files_old: any[] = []
  models: ModelNo[] = []
  departments: Department[] = []
  constructor(
    private step1: Step1RequestService,
    private _home_service: HomeServiceService,
    private _toast_service: ToastService,
    private _file_service: FilesHttpService,
    private _loading: NgxUiLoaderService,
    private _stepper: CdkStepper,
    private route: ActivatedRoute,
    private router: Router,

  ) {

  }

  ngOnInit(): void {
    this._home_service.getModelMaster().subscribe(res => {
      this.models = res
    })
    this._home_service.getDepartmentMaster().subscribe(res => {
      this.departments = res
    })
    this.route.queryParams.subscribe(async params => {
      const foo = this._home_service.getFormStep1()
      this.requestForm.patchValue({
        ...foo
      })
      console.log(this.requestForm.value);

      this.files_old = this.requestForm.value.files.map((f: any) => {
        return {
          ...f,
          status: true
        }
      })

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
            Swal.fire(`Files ${text} is maximum limit 20Mb`, '', 'warning')
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
  onClickViewFile(file: any) {
    const fileTypes = ['image/gif', 'image/jpeg', 'image/png']
    if (file.type && fileTypes.find(t => t == file.type)) {
      const objUrl = URL.createObjectURL(file)
      window.open(objUrl, '_blank')
    } else {
      let elem = document.createElement("a");
      elem.href = file.path;
      elem.target = '_blank'
      elem.click();
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

  onClickDeleteFile_old(file: any) {
    Swal.fire({
      title: `Do you want to delete ${file.name} ?`,
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        file.status = false;
      }
    })
  }

  onNext() {
    // this._stepper.next();

    this._loading.start()
    if (this.requestForm.valid) {
      this.requestForm.patchValue({
        files: this.files,
        files_old: this.files_old || []
      })
      this._home_service.setFormStep1(this.requestForm.value)
      setTimeout(() => {
        console.log(this.requestForm.value);
        
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
  onBack() {
    this.router.navigate(['/request/manage']);
  }
}
