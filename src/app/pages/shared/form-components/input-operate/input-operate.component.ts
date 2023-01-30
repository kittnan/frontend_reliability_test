import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-operate',
  templateUrl: './input-operate.component.html',
  styleUrls: ['./input-operate.component.scss']
})
export class InputOperateComponent implements OnInit {


  items: any = [
    {
      text: 'operate',
      value: true
    },
    {
      text: 'no-operate',
      value: false
    },
  ]
  @Input() form: any = null
  @Input() disable: any = false
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }
  emit() {
    this.formChange.emit({ operate: this.form })
  }
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.text === value.text;
  }
}
