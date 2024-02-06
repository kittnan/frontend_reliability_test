import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { TrackingOperateHttpService } from 'src/app/http/tracking-operate-http.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {


  displayedColumns: any = ['id', 'code', 'name', 'no', 'location', 'qrcode']
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private $tracking: TrackingOperateHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resData = await lastValueFrom(this.$tracking.get(new HttpParams()))
      this.dataSource = new MatTableDataSource(resData)
      setTimeout(() => {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 300);
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
