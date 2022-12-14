import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent implements OnInit {

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
