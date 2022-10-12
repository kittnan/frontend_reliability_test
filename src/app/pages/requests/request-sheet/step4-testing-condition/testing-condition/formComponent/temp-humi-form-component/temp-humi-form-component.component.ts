import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-temp-humi-form-component',
  templateUrl: './temp-humi-form-component.component.html',
  styleUrls: ['./temp-humi-form-component.component.scss']
})
export class TempHumiFormComponentComponent implements OnInit {

  temp: any;
  humidity: any;

  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  onEmit() {
    setTimeout(() => {
      const data = {
        temp: this.temp,
        humidity: this.humidity
      }
      this.dataChange.emit(data)
    }, 200);
  }
  
  onDelete() {
    this.deleteChange.emit();
  }
}
