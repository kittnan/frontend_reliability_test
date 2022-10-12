import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface HeatShockForm {
  high: string,
  low: string,
  timePerCycle: number,
  cycle: number,
  total: number
}
@Component({
  selector: 'app-form-heat-shock',
  templateUrl: './form-heat-shock.component.html',
  styleUrls: ['./form-heat-shock.component.scss']
})
export class FormHeatShockComponent implements OnInit {
  form: HeatShockForm = {
    high: '0',
    low: '0',
    timePerCycle: 0,
    cycle: 0,
    total: 0
  }
  @Input() formInput: any;
  @Output() formInputChange = new EventEmitter();
  symbolList: any = [
    '±', '℃', '↔'
  ]
  constructor() { }

  ngOnInit(): void {
  }
  emitChange() {
    if (this.form.timePerCycle && this, this.form.cycle) {
      this.form.total = Number(this.form.timePerCycle) * Number(this.form.cycle)
    }
    this.formInputChange.emit(this.form)
  }

  symbolHigh(symbol: string) {
    this.form.high += symbol;
  }
  symbolLow(symbol: string) {
    this.form.low += symbol;
  }

}
