import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-direction-form',
  templateUrl: './direction-form.component.html',
  styleUrls: ['./direction-form.component.css']
})
export class DirectionFormComponent implements OnInit {

  form: any = {
    x: 0,
    y: 0,
    z:0
  }
  @Input() icon: any
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  emit() {
    this.formInputChange.emit(this.form)
  }

}
