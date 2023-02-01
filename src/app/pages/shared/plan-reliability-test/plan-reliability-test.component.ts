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

  }
  htmlUserRequest(step5: any) {
    return step5.find((item: any) => item.level == 1).prevUser.name || ''
  }

  htmlRowClass(row_i: number) {
    if (row_i + 1 === this.queues.data.length) return 'row-end'
    if ((row_i + 1) % 4 === 0) return 'row-space'
    return 'row-normal'
  }


}
