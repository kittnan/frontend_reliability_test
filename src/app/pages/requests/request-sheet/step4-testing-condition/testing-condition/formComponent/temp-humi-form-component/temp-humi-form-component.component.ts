import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-temp-humi-form-component',
  templateUrl: './temp-humi-form-component.component.html',
  styleUrls: ['./temp-humi-form-component.component.scss']
})
export class TempHumiFormComponentComponent implements OnInit {

  @Input() icon = 'thermostat'
  @Input() data: any
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form: any = {
    temp: 0,
    operate: '',
    timeInspec: [],
    timeReport: [],
    humidity: ''
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
