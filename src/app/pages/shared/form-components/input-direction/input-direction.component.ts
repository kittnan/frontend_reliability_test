import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-direction',
  templateUrl: './input-direction.component.html',
  styleUrls: ['./input-direction.component.scss']
})
export class InputDirectionComponent implements OnInit {


  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  emit() {
    this.formChange.emit({ direction: this.form })
  }
  selectElem(e: any) {
    e.srcElement.select()
  }

}
