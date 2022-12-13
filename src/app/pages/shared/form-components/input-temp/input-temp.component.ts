import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Temp } from 'src/app/interface/temp';

@Component({
  selector: 'app-input-temp',
  templateUrl: './input-temp.component.html',
  styleUrls: ['./input-temp.component.scss']
})
export class InputTempComponent implements OnInit {


  @Input() form: any = {
    temp: null,
    tempVar: null
  }
  @Input() icon: any
  @Input() title: any
  @Output() formChange: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  emit() {
    let body :any= {}
    if(this.icon=='ac_unit'){
      body['lowTemp'] = this.form
    }else{
      body['highTemp'] = this.form
    }
    this.formChange.emit(body)
  }

}
