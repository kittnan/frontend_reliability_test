import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-frequency-form',
  templateUrl: './frequency-form.component.html',
  styleUrls: ['./frequency-form.component.scss']
})
export class FrequencyFormComponent implements OnInit {
  frequencyLow: any
  frequencyHigh: any
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    const sum = `${this.frequencyLow}~${this.frequencyHigh}`
    this.formInputChange.emit(sum)
  }

}
