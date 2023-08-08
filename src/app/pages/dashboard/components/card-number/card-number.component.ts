import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-card-number',
  templateUrl: './card-number.component.html',
  styleUrls: ['./card-number.component.scss'],
})
export class CardNumberComponent implements OnInit {

  @Input() corporate: any = null
  @Input() section: any = null
  @Input() testPurpose: any = null
  @Input() date: any
  @Output() dateChange: EventEmitter<any> = new EventEmitter()

  constructor(
    private $load: NgxUiLoaderService
  ) { }

  ngOnInit() {
  }
  changeDate() {
    this.dateChange.emit(this.date)
  }



}
