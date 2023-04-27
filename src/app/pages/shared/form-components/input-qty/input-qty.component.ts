import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-qty',
  templateUrl: './input-qty.component.html',
  styleUrls: ['./input-qty.component.scss'],
  providers: [TranslatePipe]
})
export class InputQtyComponent implements OnInit {

  @Input() form: any
  @Output() formChange = new EventEmitter();
  constructor(
  ) { }

  ngOnInit(): void {
  }
  selectElem(e: any) {
    e.srcElement.select()
  }
  emit() {
    this.formChange.emit({ qty: this.form })
  }

}
