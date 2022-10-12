import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TempFormService } from './temp-form.service';


@Component({
  selector: 'app-temp-form-component',
  templateUrl: './temp-form-component.component.html',
  styleUrls: ['./temp-form-component.component.scss',
    '../../testing-condition.component.scss']
})
export class TempFormComponentComponent implements OnInit {


  @Input() icon = 'thermostat'

  @Input() temp: any
  @Output() tempChange = new EventEmitter();


  @Output() deleteChange = new EventEmitter();

  @Input() form: any = {
    times: [],
    temp: 0,
    operate: '',
    timeInspec:[],
    timeReport:[]
  }
  @Output() formChange = new EventEmitter();
  constructor(
    private $tempForm: TempFormService
  ) { }

  ngOnInit(): void {

  }
  setTemp() {
    setTimeout(() => {
      // this.$tempForm.setTempForm(this.temp);
      const data = {
        temp: this.temp,
      }
      this.tempChange.emit(data)
    }, 200);
  }

  emit() {
    setTimeout(() => {
      this.formChange.emit(this.form)
    }, 200);
  }

  onDelete() {
    this.deleteChange.emit();
  }


}
