import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-no-oven',
  templateUrl: './no-oven.component.html',
  styleUrls: ['./no-oven.component.scss']
})
export class NoOvenComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  form: any = {
    qty: '',
    reportStatus: true,
    inspection: [0],
    report: [0],
    detailTest: '',
    operate: {
      text: 'no-operate',
      value: false
    },
  }
  constructor() { }

  ngOnInit(): void {

    if (this.data) {
      this.form = { ...this.form, ...this.data }
    }
  }
  emit() {
    if (this.form.reportStatus) {
      this.form.report = [0]
    } else {
      this.form.report = []
    }
    this.form = { ...this.form }
    this.dataChange.emit(this.form)
  }
  emit2(e: any) {
    this.form = { ...this.form, ...e }
    this.dataChange.emit(this.form)
  }

}
