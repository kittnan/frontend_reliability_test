import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { LoginService } from 'src/app/services/login.service';
import { DialogViewComponent } from '../dialog-view/dialog-view.component';
import { TableRequestService } from './table-request.service';

@Component({
  selector: 'app-table-request',
  templateUrl: './table-request.component.html',
  styleUrls: ['./table-request.component.scss']
})
export class TableRequestComponent implements OnInit {
  userLogin: any;
  authorize: any;
  status: any[] = [
    'ongoing', 'closed', 'all'
  ]
  selected_status = 'ongoing'
  requests: any = []

  displayedColumns: string[] = ['controlNo', 'lotNo', 'modelNo', 'status', 'edit', 'btn'];
  pageSizeOptions!: number[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _request: RequestHttpService,
    private router: Router,
    private _login: LoginService,
    private dialog: MatDialog,
    private $tableRequest: TableRequestService
  ) { }

  async ngOnInit(): Promise<void> {
    const id: any = localStorage.getItem('_id')
    this.authorize = localStorage.getItem('authorize');
    this.selected_status = 'ongoing';

    this.userLogin = await this._login.getProFileById(id).toPromise();
    this.onSelectStatus()
  }
  async onSelectStatus() {
    let request;
    const resData = await this.$tableRequest.getRequest({
      user: this.userLogin,
      selected_status: this.selected_status,

    })
    const resultMap: any = await this.mapRows(resData)
    this.dataSource = new MatTableDataSource(resultMap);
    this.setOption();
  }

  private mapRows(data: any) {
    return new Promise(resolve => {
      const foo = data.map((d: any) => {
        return {
          ...d,
          btn_status: this.rowStatus(d),
          btn_text: this.rowText(d)
        }
      })
      resolve(foo)
    })
  }

  private rowText(item: any) {
    if (item && item.status.includes(`reject_${this.authorize}`)) return 'edit'
    if (item && item.status === 'qe_department_head') return 'report'
    if (item && item.status === 'close_job') return 'CLOSED'
    return 'approve'
  }

  private rowStatus(item: any) {
    console.log(this.authorize
    );

    if (item.status === 'close_job') return true
    if (this.authorize === 'request') {
      if (
        this.foo(item, 'draft') ||
        this.foo(item, 'reject_request')
      ) return false
      return true
    } else if (this.authorize === 'request_approve') {
      if (
        this.foo(item, 'request') ||
        this.foo(item, 'reject_request_approve')
      ) return false
      return true
    } else if (this.authorize === 'qe_window_person') {
      if (
        this.foo(item, 'request_approve') ||
        this.foo(item, 'reject_qe_window_person') ||
        this.foo(item, 'qe_department_head') ||
        this.foo(item, 'finish')
      ) return false
      return true
    } else if (this.authorize === 'qe_engineer') {
      if (
        this.foo(item, 'qe_window_person') ||
        this.foo(item, 'reject_qe_engineer')
      ) return false
      return true
    } else if (this.authorize === 'qe_section_head') {
      if (
        this.foo(item, 'qe_engineer') ||
        this.foo(item, 'reject_qe_engineer')
      ) return false
      return true
    } else if (this.authorize === 'qe_department_head') {
      if (
        this.foo(item, 'qe_section_head')
      ) return false
      return true
    } else return true


  }

  foo(item: any, access: any) {
    console.log(access);

    const goo = item.step4.find((s: any) => {
      console.log(s.access, access);
      console.log(s.name._id, this.userLogin._id);

      // s.access === access && s.name._id === this.userLogin._id
    });
    console.log(goo);

    if (goo) return true
    return false
  }


  private setOption() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [5, 10, 25, 100];
  }
  onClickView(item: any) {
    const dialogRef = this.dialog.open(DialogViewComponent, {
      data: item,
      width: '90%',
      height: '90%'
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(item: any) {
    if (item.status === 'reject_request') this.linkTo('/request/home', item._id);
    if (item.status === 'request') this.linkTo('/approve/approve-request', item._id);
    if (item.status === 'request_approve') this.linkTo('/qe-window-person/approve-request', item._id);
    if (item.status === 'reject_window_person') this.linkTo('/qe-window-person/approve-request', item._id);
    if (item.status === 'qe_window_person') this.linkTo('/qe-engineer/approve-request', item._id);
    if (item.status === 'qe_engineer') this.linkTo('/qe-section-head/approve-request', item._id);
    if (item.status === 'qe_section_head') this.linkTo('/qe-department-head/approve-request', item._id);
    if (item.status === 'qe_department_head') this.linkTo('/qe-window-person/report', item._id);
  }

  linkTo(path: any, param: any) {
    this.router.navigate([path], {
      queryParams: {
        id: param
      }
    })
  }

}
