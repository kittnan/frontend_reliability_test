import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-cycle',
  templateUrl: './input-cycle.component.html',
  styleUrls: ['./input-cycle.component.scss']
})
export class InputCycleComponent implements OnInit {

  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  emit() {
    this.formChange.emit({cycle:this.form})
  }

}
