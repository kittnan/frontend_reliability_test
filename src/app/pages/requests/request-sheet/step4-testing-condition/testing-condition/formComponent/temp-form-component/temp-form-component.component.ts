import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';


@Component({
  selector: 'app-temp-form-component',
  templateUrl: './temp-form-component.component.html',
  styleUrls: ['./temp-form-component.component.scss',
    '../../testing-condition.component.scss']
})
export class TempFormComponentComponent implements OnInit {


  @Input() icon = 'thermostat'
  @Input() titleText = 'High Temp'
  @Input() data: any
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form: TestingConditionForm = {
    temp:null,
    operate:null,
    sampleNo:null,
    qty:null,
    timeInspection:null,
    timeReport:null,
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
