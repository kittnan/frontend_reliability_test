import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-temp-humi-form-component',
  templateUrl: './temp-humi-form-component.component.html',
  styleUrls: ['./temp-humi-form-component.component.scss']
})
export class TempHumiFormComponentComponent implements OnInit {

  @Input() icon = 'thermostat'
  @Input() data: any
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form: TestingConditionForm = {
    highTemp: null,
    humidity: null,
    operate: null,
    sampleNo: null,
    qty: null,
    timeInspection: null,
    timeReport: null,
  }
  constructor(
  ) { }

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
