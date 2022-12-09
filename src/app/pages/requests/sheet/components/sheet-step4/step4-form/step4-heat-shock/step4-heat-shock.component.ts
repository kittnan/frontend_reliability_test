import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-step4-heat-shock',
  templateUrl: './step4-heat-shock.component.html',
  styleUrls: ['./step4-heat-shock.component.scss']
})
export class Step4HeatShockComponent implements OnInit {


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
