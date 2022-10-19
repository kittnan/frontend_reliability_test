import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-acceleration-form',
  templateUrl: './acceleration-form.component.html',
  styleUrls: ['./acceleration-form.component.scss']
})
export class AccelerationFormComponent implements OnInit {
  acceleration: any;
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  emitForm() {
    this.formInputChange.emit(this.acceleration)
  }

}
