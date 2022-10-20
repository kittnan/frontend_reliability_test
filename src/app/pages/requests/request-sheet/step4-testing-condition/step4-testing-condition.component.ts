import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step4-testing-condition',
  templateUrl: './step4-testing-condition.component.html',
  styleUrls: ['./step4-testing-condition.component.scss']
})
export class Step4TestingConditionComponent implements OnInit {

  conditionForm: any
  constructor() { }

  ngOnInit(): void {
  }

  onConditionForm(){
    console.log("🚀 ~ file: step4-testing-condition.component.ts ~ line 18 ~ Step4TestingConditionComponent ~ onConditionForm ~ this.conditionForm", this.conditionForm)

  }

}
