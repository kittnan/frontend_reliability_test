import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-high-temp-humi-form',
  templateUrl: './high-temp-humi-form.component.html',
  styleUrls: ['./high-temp-humi-form.component.scss']
})
export class HighTempHumiFormComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

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
    humi:'',

  }
  constructor() { }

  ngOnInit(): void {
    if(this.data){
      this.form = {...this.data}
    }
  }
  emit(e: any) {
    this.form = { ...this.form,...e }
    this.dataChange.emit(this.form)

  }

}
