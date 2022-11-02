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


interface ParamsForm {
  userId: string,
  status: string,
  limit: string,
  skip: string,
  sort: string,
  count: string
}
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

  params!: ParamsForm

  ongoing: any = ['request', 'request_approve', 'qe_window_person', 'qe_engineer', 'qe_section_head', 'qe_department_head'];
  closed: any = ['closed'];
  all: any = []

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
    this.params = {
      userId: this.userLogin._id,
      status: '',
      count: '0',
      limit: '0',
      skip: '0',
      sort: '-1'

    }
    this.onSelectStatus()
  }

  async onSelectStatus() {
    let status: any = []
    if (this.selected_status == 'ongoing') {
      status = this.ongoing;
    }
    if (this.selected_status == 'closed') {
      status = this.closed;
    }
    if (this.selected_status == 'all') {
      status = [...this.ongoing, ...this.closed];
    }
    this.params.status = JSON.stringify(status)

    const resData = await this.$tableRequest.getTable(this.params)
    const resultMap: any = await this.mapRows(resData)
    this.dataSource = new MatTableDataSource(resultMap);
    this.setOption();
  }
  private mapRows(data: any) {
    return new Promise(resolve => {
      const foo = data.map((item: any) => {
        return {
          ...item,
          btn_status: this.rowStatus(item),
          btn_text: this.rowText(item)
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
    console.log(this.authorize, item.status);
    if(item.nextApprove._id == this.userLogin._id) return false
    return true
    // if (item.status === 'close_job') return true
    // if (this.authorize === 'request') {
    //   if (
    //     this.validAuthorize(item, 'draft') ||
    //     this.validAuthorize(item, 'reject_request')
    //   ) return false
    //   return true
    // } else if (this.authorize === 'request_approve') {
    //   if (
    //     this.validAuthorize(item, 'request') ||
    //     this.validAuthorize(item, 'reject_request_approve')
    //   ) return false
    //   return true
    // } else if (this.authorize === 'qe_window_person') {
    //   if (
    //     this.validAuthorize(item, 'request_approve') ||
    //     this.validAuthorize(item, 'reject_qe_window_person') ||
    //     this.validAuthorize(item, 'qe_department_head') ||
    //     this.validAuthorize(item, 'finish')
    //   ) return false
    //   return true
    // } else if (this.authorize === 'qe_engineer') {
    //   if (
    //     this.validAuthorize(item, 'qe_window_person') ||
    //     this.validAuthorize(item, 'reject_qe_engineer')
    //   ) return false
    //   return true
    // } else if (this.authorize === 'qe_section_head') {
    //   if (
    //     this.validAuthorize(item, 'qe_engineer') ||
    //     this.validAuthorize(item, 'reject_qe_engineer')
    //   ) return false
    //   return true
    // } else if (this.authorize === 'qe_department_head') {
    //   if (
    //     this.validAuthorize(item, 'qe_section_head')
    //   ) return false
    //   return true
    // } else return true


  }

  validAuthorize(item: any, access: any) {
    if (item.step5.find((i: any) => i.authorize == access)) return true
    return false

  }


  private setOption() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [1, 5, 10, 25, 100];
  }
  onClickView(item: any) {
    console.log(item);

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
    console.log(item.status);

    // if (item.status === 'reject_request') this.linkTo('/request/home', item._id);
    if (item.status === 'request') this.linkTo('/approve/approve-request', item._id);
    if (item.status === 'request_approve') this.linkTo('/qe-window-person/approve-request', item._id);
    // if (item.status === 'reject_window_person') this.linkTo('/qe-window-person/approve-request', item._id);
    // if (item.status === 'qe_window_person') this.linkTo('/qe-engineer/approve-request', item._id);
    // if (item.status === 'qe_engineer') this.linkTo('/qe-section-head/approve-request', item._id);
    // if (item.status === 'qe_section_head') this.linkTo('/qe-department-head/approve-request', item._id);
    // if (item.status === 'qe_department_head') this.linkTo('/qe-window-person/report', item._id);
  }

  linkTo(path: any, param: any) {
    this.router.navigate([path], {
      queryParams: {
        id: param
      }
    })
  }



  doo() {
    console.log(this.paginator);
    console.log(this.sort);
    this.params.skip = (this.paginator.pageSize * this.paginator.pageIndex).toString()
    this.params.limit = this.paginator.pageSize.toString()
    this.onSelectStatus()
  }
}
