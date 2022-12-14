import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';

@Component({
  selector: 'app-high-temp-humi-vibration-form',
  templateUrl: './high-temp-humi-vibration-form.component.html',
  styleUrls: ['./high-temp-humi-vibration-form.component.scss']
})
export class HighTempHumiVibrationFormComponent implements OnInit {


  @Input() data: any
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form: any = {
    highTemp: {
      temp: '',
      tempVar: ''
    },
    operate: {
      text: 'operate',
      value: false
    },
    sample: '',
    qty: '',
    inspection: [0],
    report: [0],
    humi: '',
    frequency: {
      high: '',
      low: ''
    },
    acceleration: '',
    time:'',
    cycle:'',
    direction:{
      x:'0',
      y:'0',
      z:'0'
    }
  }


  constructor() { }

  ngOnInit(): void {
    this.form = {...this.data}
  }
  emit(e: any) {
    this.form = { ...this.form, ...e }
    this.dataChange.emit(this.form)

  }


}
