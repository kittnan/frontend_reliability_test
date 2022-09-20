import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-qe-approve-manage',
  templateUrl: './qe-approve-manage.component.html',
  styleUrls: ['./qe-approve-manage.component.scss']
})
export class QeApproveManageComponent implements OnInit {
  proFile: any;
  authorize: any;
  status: any[] = [
    'ongoing', 'finish', 'all'
  ]
  selected_status = 'ongoing'
  requests: any = []
  displayedColumns: string[] = ['controlNo', 'lotNo', 'modelNo', 'status', 'btn'];
  pageSizeOptions!: number[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _request: RequestHttpService,
    private router: Router,
    private _login: LoginService,
    private _loading: NgxUiLoaderService,
  ) { }

 
  ngOnInit(): void {
    if (localStorage.getItem('request_id')) {
    } else {

      this.pageSetup();
    }
  }

  async pageSetup() {
    const id: any = localStorage.getItem('_id')
    this.proFile = await this._login.getProFileById(id).toPromise();
    this.authorize = localStorage.getItem('authorize');
    const temp = await this._request.getRequest_form().toPromise();
    this.requests = await this.dataAccess(temp, this.proFile);
    console.log(this.requests);

    this.dataSource = new MatTableDataSource(this.requests);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [5, 10, 25, 100];
  }
  dataAccess(records: any, profile: any) {
    return new Promise((resolve => {
      resolve(
        records.filter((record: any) => record && record.step4 && record.step4.userApprove.name._id === profile._id)
      )
    }))
  }

  onSelectStatus() {
    if (this.selected_status === 'ongoing') {
      this.dataSource = new MatTableDataSource(this.requests.filter((r: any) => r.status === "request"))
    }
    if (this.selected_status === 'finish') {
      this.dataSource = new MatTableDataSource(this.requests.filter((r: any) => r.status === "finish"))
    }
    if (this.selected_status === 'all') {
      this.dataSource = new MatTableDataSource(this.requests);
    }
  }
  onClickView(item: any) {
    this._loading.start();
    setTimeout(() => {
      this.router.navigate(['approve/approve-request/'], {
        queryParams: {
          id: item._id
        }
      })
    }, 500);
  }


}
