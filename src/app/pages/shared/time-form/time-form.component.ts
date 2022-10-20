import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.scss']
})
export class TimeFormComponent implements OnInit {
  time: any;
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    // const time_hour = Number(this.time)/60;
    this.formInputChange.emit(this.time)
  }

}
