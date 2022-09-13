import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { DialogComponent } from './dialog/dialog.component';



@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  status: any[] = [
    'ongoing', 'finish'
  ]
  selected_status = 'ongoing'
  requests: any[] = []

  displayedColumns: string[] = ['controlNo', 'lotNo', 'modelNo', 'status', 'btn'];
  pageSizeOptions!: number[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _request: RequestHttpService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  async ngOnInit(): Promise<void> {

    this.requests = await this._request.getRequest_form().toPromise();
    this.dataSource = new MatTableDataSource(this.requests);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [5, 10, 25, 100];
  }


  onClickView(item: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: item,
      width: '90%',
      height: '90%'
    })
  }
  onSelectStatus() {
    if(this.selected_status ==='ongoing'){
      this.dataSource = new MatTableDataSource(this.requests.filter((r:any)=> r.status === "request"))
    }
    if(this.selected_status ==='finish'){
      this.dataSource = new MatTableDataSource(this.requests.filter((r:any)=> r.status === "approved"))
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
