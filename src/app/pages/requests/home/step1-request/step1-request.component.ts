import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeServiceService } from '../home-service.service';
import { Step1RequestService } from './step1-request.service';


export interface Section {
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

  @Input() request: any
  @Output() requestChange = new EventEmitter<any>();


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
    files: new FormControl('')
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

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
      size: 1000
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
      size: 1532

    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
      size: 4562

    },
  ];

  models: ModelNo[] = []
  departments: Department[] = []
  constructor(
    private step1: Step1RequestService,
    private _homeService: HomeServiceService
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

  onSelectCorporate() {
    if (this.requestForm.controls.corporate.valid && this.requestForm.controls.modelNo.valid) {
      const runNumber = this.step1.setControlNo(this.requestForm.value.corporate, this.requestForm.value.modelNo)
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

  onNext() {
    console.log(this.requestForm.value);
    this.request = this.requestForm.value
    this.requestChange.emit(this.request)
    this._homeService.setFormStep1(this.requestForm.value)

  }
}
