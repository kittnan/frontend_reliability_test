import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface TempForm {
  temp: number | null,
  tempVar: number | null,
}
@Component({
  selector: 'app-temp-form',
  templateUrl: './temp-form.component.html',
  styleUrls: ['./temp-form.component.scss']
})
export class TempFormComponent implements OnInit {

  form: TempForm = {
    temp: null,
    tempVar: null
  }
  @Input() icon: any
  @Input() titleText: any = 'High Temp'
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    const total: string = `${this.form.temp}±${this.form.tempVar}℃`
    this.formInputChange.emit(total)
  }

}
