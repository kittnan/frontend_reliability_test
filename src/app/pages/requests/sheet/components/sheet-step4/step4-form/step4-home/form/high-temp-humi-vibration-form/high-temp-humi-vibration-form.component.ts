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
      temp: '1',
      tempVar: '2'
    },
    operate: {
      text: 'operate',
      value: false
    },
    sample: 'xxx',
    qty: '12',
    inspection: [0],
    report: [0],
    humi: '67',
    frequency: {
      high: '200',
      low: '100'
    },
    acceleration: '9.6',
    time:'100',
    cycle:'100',
    direction:{
      x:'0',
      y:'9',
      z:'7'
    }
  }

  // form: any = {
  //   highTemp: null,
  //   humidity: null,
  //   hz: null,
  //   acceleration: null,
  //   timeCycle: null,
  //   cycle: null,
  //   direction: {
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   },
  //   operate: null,
  //   sampleNo: null,
  //   qty: null,
  //   timeInspection: null,
  //   timeReport: null,
  // }

  constructor() { }

  ngOnInit(): void {
  }
  emit(e: any) {
    console.log(e);
    this.form = { ...this.form, ...e }
    this.dataChange.emit(this.form)

  }


}
