import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-condition-table',
  templateUrl: './condition-table.component.html',
  styleUrls: ['./condition-table.component.scss']
})
export class ConditionTableComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  @Input() click: any
  @Output() clickChange: EventEmitter<any> = new EventEmitter();
  constructor(
  ) {
  }

  displayedColumns: string[] = ['item', 'condition', 'operate', 'inspectionDetail', 'inspection', 'report', 'sample', 'qty'];

  ngOnInit(): void {
  }
  getRowSpan(action: string, index: number) {
    if (action == 'row') {
      if (index == 0) return this.data.length
      return 1
    }
    if (action == 'style') {
      if (index != 0) return false
      return true
    }
    return 1
  }
  trimStr(item: string) {
    return item.trim()
  }

  checkData() {
    if (this.data[0].value === 0) return false
    return true
  }




}
