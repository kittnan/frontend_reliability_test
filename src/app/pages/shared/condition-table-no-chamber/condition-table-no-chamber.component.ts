import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-condition-table-no-chamber',
  templateUrl: './condition-table-no-chamber.component.html',
  styleUrls: ['./condition-table-no-chamber.component.scss']
})
export class ConditionTableNoChamberComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);

  }

}
