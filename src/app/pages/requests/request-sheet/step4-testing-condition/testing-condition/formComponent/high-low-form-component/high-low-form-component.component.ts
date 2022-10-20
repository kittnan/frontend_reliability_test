import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-high-low-form-component',
  templateUrl: './high-low-form-component.component.html',
  styleUrls: ['./high-low-form-component.component.scss']
})
export class HighLowFormComponentComponent implements OnInit {

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
