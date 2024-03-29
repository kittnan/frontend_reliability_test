import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-temp',
  templateUrl: './input-temp.component.html',
  styleUrls: ['./input-temp.component.scss'],
})
export class InputTempComponent implements OnInit {
  @Input() form: any = {
    temp: null,
    tempVar: null,
  };
  @Input() icon: any;
  @Input() title: any;
  @Input() min: any = -100;
  @Output() formChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  selectElem(e: any) {
    e.srcElement.select();
  }
  emit() {
    this.formChange.emit(this.form);
  }
  handleTemp() {
    if (typeof this.form.temp === 'number') {
      if (this.form.temp >= this.min) {
        this.emit();
      } else this.tempReset();
    } else this.tempReset();
  }
  tempReset() {
    setTimeout(() => {
      this.form.temp = null;
    }, 300);
  }
  handleVar() {
    if (typeof this.form.tempVar === 'number') {
      if (this.form.tempVar >= this.min) {
        this.emit();
      } else this.varReset();
    } else this.varReset();
  }
  varReset() {
    setTimeout(() => {
      this.form.tempVar = null;
    }, 300);
  }
}
