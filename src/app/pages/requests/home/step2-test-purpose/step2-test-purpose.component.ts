import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  @Input() testPurpose: any
  @Output() testPurposeChange = new EventEmitter<any>();

  // testPurposes: TestPurpose[] = [
  //   {
  //     _id: '1',
  //     name: "Optical characteristic measurement for Sample product",
  //     checked: false,
  //     description: {
  //       status: false,
  //       value: ""
  //     }
  //   },
  //   {
  //     _id: '2',
  //     name: "Evaluate New material CRR No: ",
  //     checked: false,
  //     description: {
  //       status: true,
  //       value: ""
  //     }
  //   },
  //   {
  //     _id: '3',
  //     name: "Evaluate New material CRR No: ",
  //     checked: false,
  //     description: {
  //       status: true,
  //       value: ""
  //     }
  //   }
  // ]

  testPurposeForm = new FormGroup({
    purpose: new FormControl(),
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
      purpose: purpose.name
    })
  }
  onInputDescription(event: any) {
    const value = event.target.value
    this.testPurposeForm.patchValue({
      description: value
    })
  }

  onSave() {
    this.testPurpose = this.testPurposeForm.value
    console.log(this.testPurpose);
    this.testPurposeChange.emit(this.testPurpose)

    this._homeService.setFormStep2(this.testPurposeForm.value)
  }

}
