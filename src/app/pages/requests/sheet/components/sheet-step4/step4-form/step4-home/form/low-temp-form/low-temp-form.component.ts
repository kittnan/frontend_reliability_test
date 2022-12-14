import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-low-temp-form',
  templateUrl: './low-temp-form.component.html',
  styleUrls: ['./low-temp-form.component.scss']
})
export class LowTempFormComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()

  form: any = {
    lowTemp: {
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
