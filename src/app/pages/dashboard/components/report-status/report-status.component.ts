import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.component.html',
  styleUrls: ['./report-status.component.scss']
})
export class ReportStatusComponent implements OnInit {

  @Input() data: any
  displayedColumns!: string[]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.createCol()
    this.createData()
  }
  createCol() {
    this.displayedColumns = ['controlNo', 'model', 'requestor']
  }
  createData() {
    this.dataSource = new MatTableDataSource(this.data)
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




}
