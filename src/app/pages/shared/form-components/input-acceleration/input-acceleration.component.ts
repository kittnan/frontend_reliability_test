import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-acceleration',
  templateUrl: './input-acceleration.component.html',
  styleUrls: ['./input-acceleration.component.scss']
})
export class InputAccelerationComponent implements OnInit {

  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  emit() {
    this.formChange.emit({ acceleration: this.form })
  }
  selectElem(e: any) {
    e.srcElement.select()
  }

}
