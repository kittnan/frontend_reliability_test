import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-low-temp-form',
  templateUrl: './low-temp-form.component.html',
  styleUrls: ['./low-temp-form.component.scss']
})
export class LowTempFormComponent implements OnInit {

  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  form: any = {
    lowTemp: {
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
    report: [0]
  }
  constructor() { }

  ngOnInit(): void {
  }

  emit(e: any) {
    this.form = { ...this.form,...e }
    this.dataChange.emit(this.form)

  }

}
