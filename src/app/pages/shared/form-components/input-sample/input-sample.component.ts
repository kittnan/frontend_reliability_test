import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-sample',
  templateUrl: './input-sample.component.html',
  styleUrls: ['./input-sample.component.scss']
})
export class InputSampleComponent implements OnInit {


  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    this.formChange.emit({sample:this.form})
  }

}
