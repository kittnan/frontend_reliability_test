import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TestingTypeForm {
  group: string,
  list: {
    _id: string,
    name: string,
    checked: boolean,
    description: {
      status: boolean,
      value: string
    }
  }

}

export interface TestingList {
  _id: string,
  name: string,
  checked: boolean,
  description: {
    status: boolean,
    value: string
  }
}

// export interface TestingTypeForm {
//   _id: string,
//   name: string,
//   checked: boolean,
//   description: {
//     status: boolean,
//     value: string
//   }
// }

@Component({
  selector: 'app-step3-testing-type',
  templateUrl: './step3-testing-type.component.html',
  styleUrls: ['./step3-testing-type.component.scss']
})



export class Step3TestingTypeComponent implements OnInit {

  @Input() testingType: any
  @Output() testingTypeChange = new EventEmitter<any>()


  // testingTypeList: TestingTypeForm[] = [
  //   {
  //     group: 'Oven',
  //     list: [
  //       {
  //         _id: '1',
  //         name: 'Low Temperature',
  //         checked: false,
  //         description: {
  //           status: false,
  //           value: ""
  //         }
  //       },
  //       {
  //         _id: '2',
  //         name: 'High Temperature',
  //         checked: false,
  //         description: {
  //           status: false,
  //           value: ""
  //         }
  //       },
  //       {
  //         _id: '3',
  //         name: 'Other ( Specific ) : ',
  //         checked: false,
  //         description: {
  //           status: true,
  //           value: ""
  //         }
  //       }
  //     ]

  //   }


  // ]

  constructor() { }

  ngOnInit(): void {
  }

}
