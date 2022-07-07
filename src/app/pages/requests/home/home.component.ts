import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HomeServiceService } from './home-service.service';
export interface Section {
  name: string;
  updated: Date;
  size: number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  firstStepForm = new FormGroup({
    controlNo: new FormControl('', Validators.required),
  })

  Form = new FormGroup({
    item: new FormControl('', Validators.required),
    condition: new FormControl([], Validators.required),
    operate: new FormControl('', Validators.required),
    inspectionRequire: new FormControl({}, Validators.required),
    inspectionInterval: new FormControl([], Validators.required),
    requestReport: new FormControl([], Validators.required),
    sampleNo: new FormControl([], Validators.required),
    qty: new FormControl(0, Validators.required),
  })





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


  separatorKeysCodes: number[] = [ENTER, COMMA];

  request: any
  testPurpose: any
  testingType: any

  constructor(
    private _formBuilder: FormBuilder,
    private _home_service: HomeServiceService
  ) { }

  ngOnInit(): void {
    this._home_service.setBehaviorMaster();
  }

  submit() {
    console.log(this.request);
    console.log(this.testPurpose);

  }


}
