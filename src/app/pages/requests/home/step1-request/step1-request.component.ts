import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  styleUrls: ['./step1-request.component.scss']
})
export class Step1RequestComponent implements OnInit {



  requestForm = new FormGroup({
    controlNo: new FormControl('', Validators.required),
    corporate: new FormControl('', Validators.required),
    requestStatus: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    requestDate: new FormControl('', Validators.required),
    concernShipmentDate: new FormControl('', Validators.required),
    inputToProductionDate: new FormControl('', Validators.required),
    concernCustomerDate: new FormControl('', Validators.required),
    reportRequireDate: new FormControl('', Validators.required),
    sampleSentToQE_withinDate: new FormControl('', Validators.required),
    modelNo: new FormControl('', Validators.required),
    modelName: new FormControl('', Validators.required),
    lotNo: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
    sampleDescription: new FormControl('', Validators.required),
    files: new FormControl()
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
    const filesInput: FileList = e.target.files
    if (filesInput.length > 0) {
      if (filesInput[0].size <= 20000000) {
        let file: File = e.target.files[0];
        this.files.push(file)
      } else {
        this._toast_service.danger('File is maximum limit 20Mb')
      }

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

  onClickDelete(file: File) {
    Swal.fire({
      title: `Do you want to delete ${file.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then(ans => {
      if (ans.isConfirmed) {
        this._loading.start()
        this.files = this.files.filter((f: any) => f != file)
        setTimeout(() => {
          this._loading.stopAll()
          Swal.fire('Success', '', 'success')
        }, 200);
      }
    })
  }

  onNext() {
    this.requestForm.patchValue({
      files: this.files
    })

    this._homeService.setFormStep1(this.requestForm.value)

  }
}
