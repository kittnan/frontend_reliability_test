import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-qty-form',
  templateUrl: './qty-form.component.html',
  styleUrls: ['./qty-form.component.scss']
})
export class QtyFormComponent implements OnInit {



  data: any
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  emitForm() {
    this.formInputChange.emit(this.data)
  }

}
