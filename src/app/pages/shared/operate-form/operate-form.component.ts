import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-operate-form',
  templateUrl: './operate-form.component.html',
  styleUrls: ['./operate-form.component.scss']
})
export class OperateFormComponent implements OnInit {

  data: any;
  items: any = [
    {
      value: 'operate',
      viewValue: 'Operate'
    },
    {
      value: 'no-operate',
      viewValue: 'No-Operate'
    },
  ]
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    this.formInputChange.emit(this.data)
  }

}
