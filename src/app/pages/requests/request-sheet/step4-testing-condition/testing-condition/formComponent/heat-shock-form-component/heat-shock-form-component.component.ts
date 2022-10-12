import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-heat-shock-form-component',
  templateUrl: './heat-shock-form-component.component.html',
  styleUrls: ['./heat-shock-form-component.component.scss']
})
export class HeatShockFormComponentComponent implements OnInit {

  form: any = {
    tempHigh: null,
    tempLow: null,
    cycle: null,
    time: null,
    timeTotal: null
  }

  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onEmit() {
    
    setTimeout(() => {
      this.form.timeTotal = Number(this.form.time) * Number(this.form.cycle);
      this.dataChange.emit(this.form)
    }, 200);
  }
  onDelete() {
    this.deleteChange.emit();
  }

}
