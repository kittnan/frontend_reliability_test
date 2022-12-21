import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-reliability-test',
  templateUrl: './plan-reliability-test.component.html',
  styleUrls: ['./plan-reliability-test.component.scss']
})
export class PlanReliabilityTestComponent implements OnInit {

  @Input() requestForm: any
  @Input() queues: any
  constructor() { }

  ngOnInit(): void {
     (
      this.queues
    );
     (
      this.requestForm
    );

  }
  htmlUserRequest(step5: any) {
    return step5.find((item: any) => item.level == 1).prevUser.name || ''
  }

}
