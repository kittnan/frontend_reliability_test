import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-frequency',
  templateUrl: './input-frequency.component.html',
  styleUrls: ['./input-frequency.component.scss']
})
export class InputFrequencyComponent implements OnInit {

  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    this.formChange.emit({frequency:this.form})
  }

}
