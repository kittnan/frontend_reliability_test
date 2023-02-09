import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-table-operate-remain',
  templateUrl: './table-operate-remain.component.html',
  styleUrls: ['./table-operate-remain.component.scss']
})
export class TableOperateRemainComponent implements OnInit {

  @Input() data: any
  displayedColumns!: string[]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  ngOnInit(): void {
    const maxQueue = this.data.reduce((prev: any, now: any) => {
      if (prev < now.queue.length) prev = now.queue.length
      return prev
    }, 0)
    this.createCol(maxQueue)
    this.createData(maxQueue)
  }

  createCol(maxQueue: number) {
    this.displayedColumns = ['code', 'type', 'name']
    for (let i = 1; i <= maxQueue; i++) {
      this.displayedColumns.push(`queue${i}`)
    }
  }
  createData(maxQueue: number) {
    const newData = this.data.map((d: any) => {
      d.code = d.code.toUpperCase()
      for (let i = 1; i <= maxQueue; i++) {
        if (d.queue[i - 1]) {
          d[`queue${i}`] = `${d.queue[i - 1].chamber} ➤ ${d.queue[i - 1].controlNo} ➤ ${d.queue[i - 1].qty}pcs. ➤ ${moment(d.queue[i - 1].endDate).format('D-MMM-YYYY, hh:mm a')}`
        } else {
          d[`queue${i}`] = null
        }
      }
      return d
    })
    this.dataSource = new MatTableDataSource(newData)
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
