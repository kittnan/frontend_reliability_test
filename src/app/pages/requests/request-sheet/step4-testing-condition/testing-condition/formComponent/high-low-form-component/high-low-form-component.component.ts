import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-high-low-form-component',
  templateUrl: './high-low-form-component.component.html',
  styleUrls: ['./high-low-form-component.component.scss']
})
export class HighLowFormComponentComponent implements OnInit {

  form:any = {
    tempHigh:null,
    tempLow:null,
    inspection:null,
    report:null
  }

  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  constructor() { }

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
