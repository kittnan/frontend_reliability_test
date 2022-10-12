import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface HumidityForm {
  humidity: number | null,
}
@Component({
  selector: 'app-humidity-form',
  templateUrl: './humidity-form.component.html',
  styleUrls: ['./humidity-form.component.scss']
})
export class HumidityFormComponent implements OnInit {

  form: HumidityForm = {
    humidity: null
  }
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    const total = `${this.form.humidity}%RH`
    this.formInputChange.emit(total)
  }
}
