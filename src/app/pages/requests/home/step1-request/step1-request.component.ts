import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Step1RequestService } from './step1-request.service';


export interface Section {
  name: string;
  updated: Date;
  size: number
}
export interface ModelNo {
  modelNo: string;
  modelName: string;
  modelCode: string;
  type: string;
  customer: string;
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
    controlNo: new FormControl(),
    corporate: new FormControl(),
    requestStatus: new FormControl(),
    department: new FormControl(),
    requestDate: new FormControl(),
    concernShipmentDate: new FormControl(),
    inputToProductionDate: new FormControl(),
    concernCustomerDate: new FormControl(),
    reportRequireDate: new FormControl(),
    sampleSentToQE_withinDate: new FormControl(),
    modelNo: new FormControl(),
    modelName: new FormControl(),
    modelCode: new FormControl(),
    lotNo: new FormControl(),
    type: new FormControl(),
    customer: new FormControl(),
    size: new FormControl(),
    sampleDescription: new FormControl()
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

  models: ModelNo[] = [
    {
      modelNo: '1111',
      modelCode: 'AAAA',
      modelName: 'T-57632GD018HU-T-AIN',
      customer: 'Denso',
      type: '1.12'
    }
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private step1: Step1RequestService
  ) {
  }

  ngOnInit(): void {
  }

  onSelectCorporate() {
    if (this.requestForm.controls.corporate.valid && this.requestForm.controls.modelNo.valid) {
      const runNumber = this.step1.setControlNo(this.requestForm.value.corporate, this.requestForm.value.modelNo)
      console.log(runNumber);
      this.requestForm.controls.controlNo.setValue(runNumber)
    }
  }
  onSelectModelNo(item: ModelNo) {
    console.log(item);
    this.requestForm.patchValue({
      modelNo: item.modelNo,
      modelName: item.modelName,
      modelCode: item.modelCode,
      type: item.type,
      customer: item.customer
    })
  }

  onNext() {
    console.log(this.requestForm.value);
    this.request = this.requestForm.value

    this.requestChange.emit(this.request)
  }
}
