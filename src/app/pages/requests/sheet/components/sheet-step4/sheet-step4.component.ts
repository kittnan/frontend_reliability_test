import { Step4HttpService } from './../../../../../http/step4-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-sheet-step4',
  templateUrl: './sheet-step4.component.html',
  styleUrls: ['./sheet-step4.component.css']
})
export class SheetStep4Component implements OnInit {
  @Input() formId: any
  conditionForm: any
  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private $step4 :Step4HttpService
  ) { }

  ngOnInit() {
    console.clear()
    console.log(this.formId);

  }

  onConditionForm(){
    console.log('@@@@@@',this.conditionForm);
  }

  onNext() {
    console.log('onNext',this.conditionForm);

    // this._loading.start()
    // this.step4Change.emit(this.conditionForm)
    // this._loading.stopAll();
    // this._stepper.next();
  }
  onBack() {
    // this._stepper.previous();
  }

}
