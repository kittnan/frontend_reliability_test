import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.scss'],
})
export class PlanTableComponent implements OnInit {
  @Input() dataSource!: MatTableDataSource<any>;
  displayedColumns = [
    'condition',
    'userRequest',
    'requestDate',
    'sendDate',
    'operate',
    'qty',
  ];
  constructor() {}

  ngOnInit(): void {}
  htmlCondition(element: any) {
    return element.dataTable.name;
  }
}
