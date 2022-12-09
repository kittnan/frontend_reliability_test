import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step4-inspection',
  templateUrl: './step4-inspection.component.html',
  styleUrls: ['./step4-inspection.component.scss']
})
export class Step4InspectionComponent implements OnInit {

  items:any = [
    {
      name:'Normal',
      value:'normal'
    },
    {
      name:'Special',
      value:'special'
    }
  ]

  @Input() inspection = null
  @Input() inspectionDetail = null
  @Output() inspectionChange = new EventEmitter();
  @Output() inspectionDetailChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  emit(){
    this.inspectionChange.emit(this.inspection);
    this.inspectionDetailChange.emit(this.inspectionDetail)
  }
}
