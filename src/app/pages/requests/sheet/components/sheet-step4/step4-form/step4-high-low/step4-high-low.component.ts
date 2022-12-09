import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-step4-high-low',
  templateUrl: './step4-high-low.component.html',
  styleUrls: ['./step4-high-low.component.scss']
})
export class Step4HighLowComponent implements OnInit {

  form:TestingConditionForm = {
    highTemp:null,
    lowTemp:null,
    operate:null,
    sampleNo:null,
    qty:null,
    timeInspection:null,
    timeReport:null,
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
