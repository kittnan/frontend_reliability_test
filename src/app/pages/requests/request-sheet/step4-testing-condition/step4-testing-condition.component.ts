import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-step4-testing-condition',
  templateUrl: './step4-testing-condition.component.html',
  styleUrls: ['./step4-testing-condition.component.scss']
})
export class Step4TestingConditionComponent implements OnInit {

  @Input() step4: any;
  @Output() step4Change = new EventEmitter();
  conditionForm: any
  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,

  ) { }

  ngOnInit(): void {
  }

  onConditionForm(){
    console.log("🚀 ~ file: step4-testing-condition.component.ts ~ line 18 ~ Step4TestingConditionComponent ~ onConditionForm ~ this.conditionForm", this.conditionForm)

  }

  onNext() {
    this._loading.start()
    this.step4Change.emit(this.conditionForm)
    this._loading.stopAll();
    this._stepper.next();
  }
  onBack() {
    this._stepper.previous();
  }

}
