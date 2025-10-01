import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-input-humi',
    templateUrl: './input-humi.component.html',
    styleUrls: ['./input-humi.component.scss'],
    standalone: false
})
export class InputHumiComponent implements OnInit {


  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emit() {
    this.formChange.emit({ humi: this.form })
  }
  selectElem(e: any) {
    e.srcElement.select()
  }

}
