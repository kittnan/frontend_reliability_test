import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { DialogViewComponent } from '../../shared/dialog-view/dialog-view.component';



@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  userLogin: any;
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
    private dialog: MatDialog,
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id: any = localStorage.getItem('_id')
    this.userLogin = await this._login.getProFileById(id).toPromise();
    this.authorize = localStorage.getItem('authorize');

    this.onSelectStatus()
  }

  getRequestCondition(_id: string, status: any[]) {
    return this._request.getByCondition({ _id: _id, status: status }).toPromise()
  }
  dataAccess(records: any, profile: any) {
    return new Promise((resolve => {
      resolve(
        records.filter((record: any) => record.step4 && record.step4.userRequest.name._id === profile._id)
      )
    }))
  }


  onClickView(item: any) {
    if (item.status === 'reject_request') {
      this.router.navigate(['request/home/'], {
        queryParams: {
          id: item._id
        }
      })
    } else {
      const dialogRef = this.dialog.open(DialogViewComponent, {
        data: item,
        width: '90%',
        height: '90%'
      })
    }
  }
  async onSelectStatus() {
    let request
    if (this.selected_status === 'ongoing') {
      request = await this.getRequestCondition(this.userLogin._id, ['finish', 'cancel']);
    }
    if (this.selected_status === 'finish') {
      request = await this.getRequestCondition(this.userLogin._id, environment.requestStatusFinish);
    }
    if (this.selected_status === 'all') {
      request = await this.getRequestCondition(this.userLogin._id, ['']);
    }
    this.dataSource = new MatTableDataSource(request);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [5, 10, 25, 100];

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
