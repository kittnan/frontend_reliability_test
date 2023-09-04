import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-temp-room',
  templateUrl: './temp-room.component.html',
  styleUrls: ['./temp-room.component.scss']
})
export class TempRoomComponent implements OnInit {
  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  form: any = {
    roomTemp: {
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
    if (this.data) {
      this.form = { ...this.data }
    }
  }
  emit(e: any) {
    this.form = { ...this.form, ...e }
    this.dataChange.emit(this.form)

  }

}
