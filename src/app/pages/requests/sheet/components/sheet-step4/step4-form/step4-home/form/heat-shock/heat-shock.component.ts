import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-heat-shock',
  templateUrl: './heat-shock.component.html',
  styleUrls: ['./heat-shock.component.scss']
})
export class HeatShockComponent implements OnInit {
  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  form: any = {
    lowTemp: {
      temp: '',
      tempVar: ''
    },
    highTemp: {
      temp: '',
      tempVar: ''
    },
    operate: {
      text: 'no-operate',
      value: false
    },
    sample: '',
    qty: '',
    inspection: [0],
    report: [0],
    time: '',
    cycle: '',


  }
  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.form = {
        ...this.data, operate: {
          text: 'no-operate',
          value: false
        }
      }
    }
  }

  emit(e: any) {
    this.form = { ...this.form, ...e }
    this.dataChange.emit(this.form)

  }

}
