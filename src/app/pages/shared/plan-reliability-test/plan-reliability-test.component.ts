import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-reliability-test',
  templateUrl: './plan-reliability-test.component.html',
  styleUrls: ['./plan-reliability-test.component.scss']
})
export class PlanReliabilityTestComponent implements OnInit {

  @Input() requestForm: any
  @Input() queues: any

  countClass = false
  count = 1;
  constructor() { }

  ngOnInit(): void {
    console.log(this.requestForm, this.queues);


  }
  htmlUserRequest(step5: any) {
    return step5.find((item: any) => item.level == 1).prevUser.name || ''
  }

  renderColor(i: any) {
    // if (i < 2) {
    //   return false
    // }
    // if (i == 2) {
    //   this.count = 2
    // }

    // const sum = i - this.count
    // if (sum >= 3) {
    //   this.count = i
    //   this.countClass = !this.countClass
    // }
    // return this.countClass
    return false
  }


}
