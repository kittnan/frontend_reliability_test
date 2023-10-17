import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-time-inspec',
  templateUrl: './input-time-inspec.component.html',
  styleUrls: ['./input-time-inspec.component.scss'],
})
export class InputTimeInspecComponent implements OnInit {
  @Input() title: any;
  @Input() form: any;
  @Output() formChange = new EventEmitter();
  temp!: string;

  @Input() lockInitial: boolean = false;

  constructor() {}
  ngOnInit(): void {
    if (this.form.length > 0) {
      this.temp = this.form.reduce((prev: any, now: any) => {
        return (prev += now.toString() + ',');
      }, '');
    }
  }

  inputTime(e: KeyboardEvent) {
    const lastChar = this.temp[this.temp.length - 1];
    const key = e.keyCode;

    const zero = 48;
    const nine = 57;
    const zeroNum = 96;
    const nineNum = 105;
    const backspace = 8;
    const dot = 190;
    const comma = 188;
    const tab = 9;
    const enter = 13;
    let listAllow = [backspace, dot, comma, tab, enter];
    if (
      (key >= zero && key <= nine) ||
      (key >= zeroNum && key <= nineNum) ||
      listAllow.some((a: any) => a == key)
    ) {
      if (key === enter || key === tab) {
        this.cal();
      }
    } else {
      e.preventDefault();
    }
  }
  cal() {
    let tempSplit: any[] = this.temp.toString().trim().split(',');
    tempSplit = tempSplit.map((t: any) => Number(t));

    tempSplit = tempSplit.filter((t: any) => (isNaN(t) ? false : t || t === 0));
    tempSplit = tempSplit.sort((a: any, b: any) => a - b);
    tempSplit = [...new Set(tempSplit.map((item) => item))];
    if (this.lockInitial) {
      if (tempSplit[0] !== 0) {
        tempSplit = [0, ...tempSplit];
      }
    }
    this.form = tempSplit;
    let str = JSON.stringify(this.form);
    str = str.replace('[', '');
    str = str.replace(']', '');
    this.temp = str;
    this.emit();
  }

  emit() {
    const body: any = {};
    body[this.title.toLowerCase()] = this.form;
    this.formChange.emit(body);
  }
}
