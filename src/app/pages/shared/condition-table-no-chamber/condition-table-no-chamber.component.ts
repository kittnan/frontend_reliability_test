import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-condition-table-no-chamber',
  templateUrl: './condition-table-no-chamber.component.html',
  styleUrls: ['./condition-table-no-chamber.component.scss']
})
export class ConditionTableNoChamberComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  reportStatus: any

  constructor() { }

  ngOnInit(): void {
    // console.log(this.data[0]);



  }

  htmlReportStatus() {
    this.reportStatus = this.data[0]?.reportStatus ? this.data[0].reportStatus : this.data[0].data.reportStatus

    if (this.reportStatus) return 'Yes'
    return 'No'
  }

}
