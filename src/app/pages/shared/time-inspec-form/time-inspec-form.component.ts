import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-inspec-form',
  templateUrl: './time-inspec-form.component.html',
  styleUrls: ['./time-inspec-form.component.scss']
})
export class TimeInspecFormComponent implements OnInit {
  temp!:string;
  data: any
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();

  @Input() title:any;
  constructor() { }
  ngOnInit(): void {
  }

  inputTime(){
    this.data = this.temp.split(',');
    this.emit()
  }
  emit() {
    this.formInputChange.emit(this.data)
  }


}
