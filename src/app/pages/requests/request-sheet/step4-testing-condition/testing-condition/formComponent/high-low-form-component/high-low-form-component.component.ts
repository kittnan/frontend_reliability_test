import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-high-low-form-component',
  templateUrl: './high-low-form-component.component.html',
  styleUrls: ['./high-low-form-component.component.scss']
})
export class HighLowFormComponentComponent implements OnInit {

  high: any;
  low: any;

  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEmit() {
    setTimeout(() => {
      const data = {
        high: this.high,
        low: this.low
      }
      this.dataChange.emit(data)
    }, 200);
  }

  onDelete() {
    this.deleteChange.emit();
  }
}
