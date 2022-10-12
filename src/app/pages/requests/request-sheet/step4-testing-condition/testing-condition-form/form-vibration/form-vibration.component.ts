import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface VibrationForm {
  frequency: number,
  acceleration: number,
  timePerCycle: number,
  cycle: number,
  directionX: number,
  directionY: number,
  directionZ: number
}
@Component({
  selector: 'app-form-vibration',
  templateUrl: './form-vibration.component.html',
  styleUrls: ['./form-vibration.component.scss']
})
export class FormVibrationComponent implements OnInit {

  form: VibrationForm = {
    frequency: 0,
    acceleration: 0,
    timePerCycle: 0,
    cycle: 0,
    directionX: 0,
    directionY: 0,
    directionZ: 0
  }
  @Input() formInput: any;
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitChange() {

    this.formInputChange.emit(this.form)
  }

}
