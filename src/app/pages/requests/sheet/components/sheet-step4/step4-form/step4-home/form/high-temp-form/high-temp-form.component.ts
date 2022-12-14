import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-high-temp-form',
  templateUrl: './high-temp-form.component.html',
  styleUrls: ['./high-temp-form.component.scss']
})
export class HighTempFormComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  form: any = {
    highTemp: {
      temp: '',
      tempVar: ''
    },
    operate: {
      text: '',
      value: false
    },
    sample: '',
    qty: '',
    inspection: [0],
    report: [0]
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
