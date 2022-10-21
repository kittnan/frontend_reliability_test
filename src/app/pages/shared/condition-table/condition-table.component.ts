import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-condition-table',
  templateUrl: './condition-table.component.html',
  styleUrls: ['./condition-table.component.scss']
})
export class ConditionTableComponent implements OnInit {

  @Input() data:any
  @Output() dataChange = new EventEmitter()
  constructor() { }

  displayedColumns: string[] = ['item', 'condition', 'operate', 'inspection', 'timeInspection', 'timeReport', 'sampleNo', 'qty'];

  ngOnInit(): void {
  }
  getRowSpan(action: string, index: number) {
    if (action == 'row') {
      if(index==0) return this.data.length
      return 1
    }
    if (action == 'style'){
      if(index!=0) return false
      return true
    }
      return 1
  }
  foo(item:string){
    return item.trim()
  }

}
