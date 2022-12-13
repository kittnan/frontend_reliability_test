import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-high-temp-humi-form',
  templateUrl: './high-temp-humi-form.component.html',
  styleUrls: ['./high-temp-humi-form.component.scss']
})
export class HighTempHumiFormComponent implements OnInit {

  @Output() dataChange: EventEmitter<any> = new EventEmitter()

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
    humi:'67',

  }
  constructor() { }

  ngOnInit(): void {
  }
  emit(e: any) {
    console.log(e);

    this.form = { ...this.form,...e }
    this.dataChange.emit(this.form)

  }

}
