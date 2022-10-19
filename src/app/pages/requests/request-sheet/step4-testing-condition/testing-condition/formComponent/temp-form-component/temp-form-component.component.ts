import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface TESTFORM {
  foo: string | null,
  doo: string | null
}
@Component({
  selector: 'app-temp-form-component',
  templateUrl: './temp-form-component.component.html',
  styleUrls: ['./temp-form-component.component.scss',
    '../../testing-condition.component.scss']
})
export class TempFormComponentComponent implements OnInit {


  @Input() icon = 'thermostat'
  @Input() data: any
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form: any = {
    tempHigh: 0,
    operate: '',
    timeInspec: [],
    timeReport: [],
    sampleNo: '',
    qty: 0
  }

  test: TESTFORM = {
    doo: 'asd',
    foo: null
  }
  constructor(
  ) { }

  ngOnInit(): void {

  }
  emit() {
    setTimeout(() => {
      this.dataChange.emit(this.form)
    }, 200);
  }

  onDelete() {
    this.deleteChange.emit();
  }


}
