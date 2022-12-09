import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-step4-vibration',
  templateUrl: './step4-vibration.component.html',
  styleUrls: ['./step4-vibration.component.scss']
})
export class Step4VibrationComponent implements OnInit {

  @Input() data: any
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form: TestingConditionForm = {
    highTemp: null,
    humidity: null,
    hz: null,
    acceleration: null,
    timeCycle: null,
    cycle: null,
    direction: {
      x: 0,
      y: 0,
      z: 0
    },
    operate: null,
    sampleNo: null,
    qty: null,
    timeInspection: null,
    timeReport: null,
  }

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
