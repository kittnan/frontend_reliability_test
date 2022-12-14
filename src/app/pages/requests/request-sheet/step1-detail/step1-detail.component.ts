import { RequestHttpService } from './../../../../http/request-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { RequestSheetService } from '../request-sheet.service';
import { SetSubjectService } from '../set-subject.service';
export interface ModelNo {
  modelNo: string;
  modelName: string;
  size: string;
  customer: string;
}
export interface Department {
  name: string;
}
@Component({
  selector: 'app-step1-detail',
  templateUrl: './step1-detail.component.html',
  styleUrls: ['./step1-detail.component.scss']
})
export class Step1DetailComponent implements OnInit {

  @Input() step1: any;
  @Output() step1Change = new EventEmitter();

  @ViewChild('fileUpload')
  fileUpload!: ElementRef

  nextStepButton!: HTMLButtonElement
  requestForm = new FormGroup({
    controlNo: new FormControl('', Validators.required),
    corporate: new FormControl('', Validators.required),
    requestStatus: new FormControl('normal', Validators.required),
    department: new FormControl('', Validators.required),
    requestDate: new FormControl<String | Date | null>(null, Validators.required),
    concernShipmentDate: new FormControl(''),
    inputToProductionDate: new FormControl(''),
    concernCustomerDate: new FormControl(''),
    reportRequireDate: new FormControl(''),
    sampleSentToQE_withinDate: new FormControl(''),
    modelNo: new FormControl('', Validators.required),
    modelName: new FormControl('', Validators.required),
    lotNo: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    sampleDescription: new FormControl(''),
    files: new FormControl(<any>[], Validators.required),
    upload: new FormControl()
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
  upload: any[] = []
  fileProgress: boolean = false
  models: ModelNo[] = []
  departments: Department[] = []
  constructor(
    private _request: RequestSheetService,
    private _setSubject: SetSubjectService,
    private _loading: NgxUiLoaderService,
    private _stepper: CdkStepper,
    private route: ActivatedRoute,
    private router: Router,
    private $request: RequestHttpService

  ) {
    this.requestForm.patchValue({ requestDate: new Date() });
    if(this.step1){
    }
  }

  ngOnInit(): void {
    this._setSubject.getModelMaster().subscribe(res => this.models = res)
    this._setSubject.getDepartmentMaster().subscribe(res => this.departments = res
    )

    if(this.step1){

      this.requestForm.patchValue({...this.step1})
    }
    this.route.queryParams.subscribe(async params => {

      // const res = await this.$request.get_id(params['id']).toPromise()


      const foo = this._setSubject.getFormStep1()
      this.requestForm.patchValue({
        ...foo
      })
      this.upload = this.requestForm.value.files.map((f: any) => {
        return {
          ...f,
          status: true
        }
      })

    })
  }

  async onSelectCorporate() {
    if (this.requestForm.controls.corporate.valid && this.requestForm.controls.modelNo.valid) {
      const runNumber: any = await this._request.setControlNo(this.requestForm.value.corporate, this.requestForm.value.modelNo)
      this.requestForm.controls.controlNo.setValue(runNumber)
    }
  }
  onSelectModelNo(item: ModelNo) {
    this.requestForm.patchValue({
      modelNo: item.modelNo,
      modelName: item.modelName,
      size: item.size,
      customer: item.customer,
    })
  }

  onUploadFile(e: any) {
    this.fileProgress = true;
    const filesInput: any = this.fileUpload.nativeElement.files;
    if (filesInput.length > 0) {
      let overSize = []
      for (let index = 0; index < filesInput.length; index++) {
        if (filesInput[index].size <= 200000) {
          this.upload.push(filesInput[index]);
          this.requestForm.patchValue({
            upload: this.upload
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
    setTimeout(() => {
      this.fileProgress = false
    }, 1000);
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
        this.upload = this.upload.filter((f: any) => f != file);
        this.requestForm.patchValue({
          upload: this.upload
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

  async onNext() {
    this._loading.start()
    const formData = await this.appendFormData(this.upload)
    this.requestForm.patchValue({
      files: this.files,
      upload: formData || []
    })

    this._loading.stopAll();
    this._stepper.next();
    this.step1Change.emit(this.requestForm.value)
  }
  onBack() {
    this.router.navigate(['/request/manage']);
  }

  appendFormData(files: any) {
    return new Promise(resolve => {
      let formData = new FormData;
      for (let index = 0; index < files.length; index++) {
        formData.append('Files', files[index], files[index].name)
      }
      resolve(formData)
    })
  }

}
