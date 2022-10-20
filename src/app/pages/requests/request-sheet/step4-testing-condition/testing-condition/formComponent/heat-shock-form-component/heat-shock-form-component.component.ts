import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-heat-shock-form-component',
  templateUrl: './heat-shock-form-component.component.html',
  styleUrls: ['./heat-shock-form-component.component.scss']
})
export class HeatShockFormComponentComponent implements OnInit {

  form:TestingConditionForm = {
    highTemp:null,
    lowTemp:null,
    timeCycle:null,
    operate:null,
    sampleNo:null,
    qty:null,
    timeInspection:null,
    timeReport:null
  }


  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  emit() {

    setTimeout(() => {
      this.dataChange.emit(this.form)
    }, 200);
  }
  onDelete() {
    this.deleteChange.emit();
  }

}
