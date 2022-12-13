import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-qty',
  templateUrl: './input-qty.component.html',
  styleUrls: ['./input-qty.component.scss']
})
export class InputQtyComponent implements OnInit {



  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emit() {
    this.formChange.emit({qty:this.form})
  }

}
