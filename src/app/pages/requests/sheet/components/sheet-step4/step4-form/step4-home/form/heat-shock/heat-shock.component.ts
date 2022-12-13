import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-heat-shock',
  templateUrl: './heat-shock.component.html',
  styleUrls: ['./heat-shock.component.scss']
})
export class HeatShockComponent implements OnInit {
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  form: any = {
    lowTemp: {
      temp: '1',
      tempVar: '2'
    },
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
    time:'100',
    cycle:'100',


  }
  constructor() { }

  ngOnInit(): void {
  }

  emit(e: any) {
    this.form = { ...this.form,...e }
    this.dataChange.emit(this.form)

  }

}
