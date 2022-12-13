import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-high-temp-form',
  templateUrl: './high-temp-form.component.html',
  styleUrls: ['./high-temp-form.component.scss']
})
export class HighTempFormComponent implements OnInit {


  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  form: any = {
    highTemp: {
      temp: '1',
      tempVar: '2'
    },
    operate: {
      text: '',
      value: false
    },
    sample: '',
    qty: '',
    inspection: [],
    report: []
  }
  constructor() { }

  ngOnInit(): void {
  }

  emit(e: any) {
    this.form = { ...this.form,...e }
    this.dataChange.emit(this.form)

  }

}
