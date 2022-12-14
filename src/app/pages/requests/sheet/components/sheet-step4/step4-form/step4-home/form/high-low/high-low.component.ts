import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-high-low',
  templateUrl: './high-low.component.html',
  styleUrls: ['./high-low.component.scss']
})
export class HighLowComponent implements OnInit {

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
      text: 'operate',
      value: false
    },
    sample: '',
    qty: '',
    inspection: [0],
    report: [0],
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
