import { LogFlowService } from './../../../../../http/log-flow.service';
import { Step5HttpService } from './../../../../../http/step5-http.service';
import { Step1HttpService } from './../../../../../http/step1-http.service';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RequestSheetService } from '../../request-sheet.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { UserHttpService } from 'src/app/http/user-http.service';

export interface ModelNo {
  modelNo: string;
  modelName: string;
  size: string;
  customer: string;
}
@Component({
  selector: 'app-sheet-step1',
  templateUrl: './sheet-step1.component.html',
  styleUrls: ['./sheet-step1.component.css']
})
export class SheetStep1Component implements OnInit {
  @Input() formId: any
  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  @ViewChild('fileUpload') fileUpload!: ElementRef

  requestForm = new FormGroup({
    _id: new FormControl(null),
    requestId: new FormControl(''),
    controlNo: new FormControl(null, Validators.required),
    corporate: new FormControl(''),
    requestStatus: new FormControl('normal'),
    department: new FormControl(''),
    requestDate: new FormControl<String | Date | null>(null),
    concernShipmentDate: new FormControl(''),
    inputToProductionDate: new FormControl(''),
    concernCustomerDate: new FormControl(''),
    reportRequireDate: new FormControl(''),
    sampleSentToQE_withinDate: new FormControl(''),
    modelNo: new FormControl('', Validators.required),
    modelName: new FormControl(''),
    lotNo: new FormControl(''),
    size: new FormControl(''),
    customer: new FormControl(''),
    sampleDescription: new FormControl(''),
    files: new FormControl(<any>[]),
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
  models: ModelNo[] = []
  departments: any[] = []
  fileProgress = false
  tempUpload: any[] = []
  userLogin: any
  constructor(
    private _request: RequestSheetService,
    private _loading: NgxUiLoaderService,
    private _stepper: CdkStepper,
    private router: Router,
    private $request: RequestHttpService,
    private $master: MasterHttpService,
    private $file: FilesHttpService,
    private $step1: Step1HttpService,
    private $step5: Step5HttpService,
    private $user: UserHttpService,
    private $log: LogFlowService
  ) {
    this.requestForm.patchValue({ requestDate: new Date() });
  }

  async ngOnInit() {
    this.models = await this.$master.getModelMaster().toPromise()
    this.departments = await this.$master.getDepartmentMaster().toPromise()
    if (this.data) {
      this.requestForm.patchValue({ ...this.data })
    }
    let userLoginStr: any = localStorage.getItem('reliability-userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    // const tempId: any = localStorage.getItem('_id')
    // this.userLogin = await this.$user.getUserById(tempId).toPromise()

  }


  onSelectModelNo() {
    const modelNo = this.requestForm.value.modelNo
    const objModel: any = this.models.find((m: any) => m.modelNo == modelNo)
    this.requestForm.patchValue({
      modelName: objModel.modelName,
      size: objModel.size,
      customer: objModel.customer,
    })
  }
  async onSelectCorporate() {
    if (this.requestForm.controls.corporate.valid && this.requestForm.controls.modelNo.valid) {
      const runNumber: any = await this._request.setControlNo(this.requestForm.value.corporate, this.requestForm.value.modelNo)
      this.requestForm.controls.controlNo.setValue(runNumber)
    }
  }

  onUploadFile(e: any) {
    this.fileProgress = true
    const files = e.target.files
    this.tempUpload.push(...files)
    this.fileUpload.nativeElement.value = ""
    setTimeout(() => {
      this.fileProgress = false
      Swal.fire('ATTACH FILE SUCCESS', '', 'success')
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
        this.tempUpload = this.tempUpload.filter((f: any) => f != file);
        setTimeout(() => {
          this._loading.stopAll()
          Swal.fire('Success', '', 'success')
        }, 200);
      }
    })
  }

  onClickRemoveFile(file: any) {
    Swal.fire({
      title: `Do you want to delete ${file.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        this.removeFile(file)
      }
    })
  }
  async removeFile(file: any) {
    const resDelete = await this.$file.delete(file.name).toPromise()
    this.data.files = this.data.files.filter((d: any) => d != file)
    const resUpdate = await this.$step1.update(this.data._id, this.data).toPromise()
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
    }, 1000);
  }

  onCreateFiles(e: any) {
    Swal.fire({
      title: `Do you want to upload files?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        const files = e.target.files
        this.fileProgress = true
        this.createFiles(files)
      }
    })

  }
  async createFiles(files: any) {
    this.data = this.requestForm.value
    const formData = await this.addFormData(files, this.data.controlNo)
    const resUpload = await this.$file.uploadFile(formData).toPromise()
    this.data.files = [...this.data.files, ...resUpload]
    this.requestForm.patchValue({
      files: this.data.files
    })
    const resUpdate = await this.$step1.update(this.data._id, this.data).toPromise()
    setTimeout(() => {
      this.fileUpload.nativeElement.value = ""
      this.fileProgress = false
      Swal.fire('SUCCESS', '', 'success')
    }, 1000);
  }
  generateToken(n: number) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }

  addFormData(files: any, controlNo: any) {
    return new Promise(resolve => {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        let type = files[i].name.split('.');
        type = type[type.length - 1]
        const newFileName = `${controlNo}-${this.generateToken(3)}.${type}`
        formData.append('Files', files[i], newFileName)
        if (i + 1 === files.length) {
          resolve(formData)
        }
      }

    })
  }
  async onNext() {
    Swal.fire({
      title: `Do you want to save draft?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        if (this.requestForm.value._id) {
          this.update()
        } else {
          this.insert()
        }
      }
    })

  }

  async update() {
    const resUpdate = await this.$step1.update(this.requestForm.value._id, this.requestForm.value).toPromise()
    this.dataChange.emit(this.formId)

    const logData = {
      formId: this.requestForm.value._id,
      action: 'draft',
      user: this.userLogin
    }
    this.sendLog(logData)
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }


  async insert() {
    const body = {
      userId: localStorage.getItem('_id'),
      date: new Date(),
      controlNo: this.requestForm.value.controlNo,
      corporate: this.requestForm.value.corporate,
      status: 'draft',
      table: {},
      nextApprove: this.userLogin
    }
    const resDraft = await this.$request.draft(body).toPromise()
    let resUpload = []
    if (this.tempUpload.length > 0) {
      const formData = await this.addFormData(this.tempUpload, resDraft[0].controlNo)
      resUpload = await this.$file.uploadFile(formData).toPromise()
    }
    this.requestForm.patchValue({
      controlNo: resDraft[0].controlNo,
      requestId: resDraft[0]._id,
      files: resUpload
    })

    const requestBody = this.requestForm.value
    delete requestBody._id
    const resInsert = await this.$step1.insert(requestBody).toPromise()
    const step5Data = {
      requestId: resDraft[0]._id,
      prevUser: {
        _id: this.userLogin._id,
        name: this.userLogin.name
      },
      nextUser: {
        _id: this.userLogin._id,
        name: this.userLogin.name
      },
      prevStatusForm: 'draft',
      nextStatusForm: 'draft',
      comment: [],
      level: 1,
      date: null,
    }
    await this.$step5.insert(step5Data).toPromise()

    this.dataChange.emit(resDraft[0]._id)
    const logData = {
      formId: resDraft[0]._id,
      action: 'draft',
      user: this.userLogin
    }
    this.sendLog(logData)
    setTimeout(() => {
      this.requestForm.patchValue({ _id: resInsert[0]._id })
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._stepper.next()
    }, 1000);
  }
  onBack() {
    this.router.navigate(['/request/manage']);
  }
  sendLog(data: any) {
    this.$log.insertLogFlow(data).subscribe(res => console.log(res))
  }

}
