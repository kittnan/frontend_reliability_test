import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeServiceService } from '../home-service.service';

export interface TestPurpose {
  _id: string,
  name: string,
  checked: boolean,
  description: {
    status: boolean,
    value: string
  }
}


@Component({
  selector: 'app-step2-test-purpose',
  templateUrl: './step2-test-purpose.component.html',
  styleUrls: ['./step2-test-purpose.component.scss']
})
export class Step2TestPurposeComponent implements OnInit {


  testPurposeForm = new FormGroup({
    purpose: new FormControl('',Validators.required),
    description: new FormControl()
  })

  testPurposes: TestPurpose[] = []
  constructor(
    private _homeService: HomeServiceService
  ) { }

  ngOnInit(): void {
    this._homeService.getTestPurposeMaster().subscribe(res => {
      console.log(res);
      this.testPurposes = res
    })
  }

  onCheckRadio(event: any, purpose: any) {
    if (purpose['description'].status) {
      let temp: any = document.getElementById(purpose._id)
      temp.value = ''
    }
    this.testPurposes = this.testPurposes.map((purpose: any) => {
      purpose.checked = false
      purpose['description'].value = ""
      return purpose
    })
    purpose.checked = true
    this.testPurposeForm.patchValue({
      purpose: purpose.name,
      description:{
        status: true,
        value:''
      }
    })
  }
  onInputDescription(event: any) {
    const value = event.target.value
    this.testPurposeForm.patchValue({
      description: {
        status: true,
        value:value
      }
    })
  }

  onSave() {
    console.log(this.testPurposeForm.value);
    
    this._homeService.setFormStep2(this.testPurposeForm.value)
  }

}
