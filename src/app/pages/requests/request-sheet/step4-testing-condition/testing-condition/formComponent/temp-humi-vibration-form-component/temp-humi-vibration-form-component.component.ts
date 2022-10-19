import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-temp-humi-vibration-form-component',
  templateUrl: './temp-humi-vibration-form-component.component.html',
  styleUrls: ['./temp-humi-vibration-form-component.component.scss']
})
export class TempHumiVibrationFormComponentComponent implements OnInit {

  @Input() data: any
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form:any = {
    
  }

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
