import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-planing',
  templateUrl: './table-planing.component.html',
  styleUrls: ['./table-planing.component.scss']
})
export class TablePlaningComponent implements OnInit {

  @Input() dataTable: any;
  dataSource: any;
  displayedColumns = ['condition', 'userRequest', 'requestDate', 'sendDate', 'operate', 'qty'];

  constructor(

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataTable)
  }
  htmlCondition(element: any) {
    return element.dataTable.name
  }

}
