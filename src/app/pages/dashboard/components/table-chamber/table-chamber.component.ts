import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-chamber',
  templateUrl: './table-chamber.component.html',
  styleUrls: ['./table-chamber.component.scss']
})
export class TableChamberComponent implements OnInit {
  @Input() data: any
  displayedColumns!: string[]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.createCol()
    this.dataSource = new MatTableDataSource(this.data)
  }
  createCol() {
    this.displayedColumns = ['code', 'name', 'capacity']
    for (let i = 0; i < this.data.length; i++) {
      this.displayedColumns.push(`queue${i}`)
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
