import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-operate',
  templateUrl: './table-operate.component.html',
  styleUrls: ['./table-operate.component.scss']
})
export class TableOperateComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() table: any
  @Input() tableFn!: Function

  dataSource!: MatTableDataSource<any>;
  displayedColumns: any = [
    'position',
    'code',
    'type',
    'name',
    'total'
  ]

  constructor(
  ) { }

  ngOnInit(): void {
    if (this.table) {
      this.dataSource = new MatTableDataSource(this.table)
    }

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
