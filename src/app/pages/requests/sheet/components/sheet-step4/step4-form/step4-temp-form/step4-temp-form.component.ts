import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-step4-temp-form',
  templateUrl: './step4-temp-form.component.html',
  styleUrls: ['./step4-temp-form.component.scss']
})
export class Step4TempFormComponent implements OnInit {



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
