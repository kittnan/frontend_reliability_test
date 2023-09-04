import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-time-inspec',
  templateUrl: './input-time-inspec.component.html',
  styleUrls: ['./input-time-inspec.component.scss']
})
export class InputTimeInspecComponent implements OnInit {

  @Input() title: any;
  @Input() form: any
  @Output() formChange = new EventEmitter();
  temp!: string;

  @Input() lockInitial: boolean = false

  constructor() { }
  ngOnInit(): void {
    if (this.form.length > 0) {
      this.temp = this.form.reduce((prev: any, now: any) => {
        return prev += now.toString() + ','
      }, '')
    }
  }

  inputTime(e: KeyboardEvent) {


    if (this.lockInitial && this.form.length == 1 && Number(e.keyCode) === 8) {
      return e.preventDefault()
    } else {
      const comma = 188
      const backspace = 8
      const zero = 48
      const nine = 57
      const tab = 9
      const l = 37
      const u = 38
      const r = 39
      const b = 40
      const key = Number(e.keyCode)

      if ((key >= zero && key <= nine) || key == comma || key == backspace || key == tab || key == l || key == u || key == r || key == b) {

      } else {
        return e.preventDefault()
      }
    }



  }
  cal() {
    let tempSplit: any[] = this.temp.toString().trim().split(',');
    tempSplit = tempSplit.map((t: any) => parseInt(t))

    tempSplit = tempSplit.filter((t: any) =>
      isNaN(t) ? false : t ||
        t === 0
    )
    tempSplit = tempSplit.sort((a: any, b: any) => a - b)
    tempSplit = [...new Set(tempSplit.map(item => item))];
    this.form = tempSplit
    this.emit()
  }

  emit() {
    const body: any = {}
    body[this.title.toLowerCase()] = this.form
    this.formChange.emit(body)
  }


}
