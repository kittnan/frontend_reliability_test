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
  constructor() { }
  ngOnInit(): void {
    if(this.form.length>0){
      this.temp = this.form.reduce((prev:any,now:any)=>{
        return prev += now.toString() + ','
      },'')
    }
  }

  inputTime() {
    let tempSplit: any[] = this.temp.toString().trim().split(',');
    tempSplit = tempSplit.map((t: any) => parseInt(t))
    tempSplit = tempSplit.filter((t: any) =>
      isNaN(t) ? false : t ||
        t === 0
    )
    this.form = tempSplit
    this.emit()
  }
  emit() {
    const body: any = {}
    body[this.title.toLowerCase()] = this.form
    this.formChange.emit(body)
  }

}
