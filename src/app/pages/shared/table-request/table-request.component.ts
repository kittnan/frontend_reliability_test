import { HttpParams } from '@angular/common/http';
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
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';


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
    'ongoing', 'finish', 'all'
  ]
  selected_status = 'ongoing'
  requests: any = []

  displayedColumns: string[] = ['controlNo', 'userRequest', 'lotNo', 'modelNo', 'status', 'edit', 'btn'];
  pageSizeOptions!: number[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  params!: ParamsForm

  ongoing: any = ['draft', 'request', 'reject_request', 'request_approve', 'qe_window_person', 'qe_engineer', 'qe_section_head', 'qe_department_head'];
  finish: any = ['finish'];
  all: any = []

  interval$!: Subscription;
  presentCount = 0
  constructor(
    private $request: RequestHttpService,
    private router: Router,
    private _login: LoginService,
    private dialog: MatDialog,
    private $tableRequest: TableRequestService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  async ngOnInit(): Promise<void> {
    const id: any = localStorage.getItem('RLS_id')
    this.authorize = localStorage.getItem('RLS_authorize');
    this.selected_status = 'ongoing';
    // if (this.authorize == 'qe_window_person') this.displayedColumns = ['controlNo', 'userRequest', 'lotNo', 'modelNo', 'status', 'edit', 'chamber', 'btn'];

    // this.userLogin = await this._login.getProFileById(id).toPromise();
    this.params = {
      userId: this.userLogin._id,
      status: '',
      count: '0',
      limit: '0',
      skip: '0',
      sort: '-1'

    }
    this.onSelectStatus()
    this.interval$ = interval(60000).subscribe(res => this.autoFeed())
  }

  ngOnDestroy(): void {
    this.interval$.unsubscribe()
  }

  async autoFeed() {
    let statusStr: any = null
    if (this.selected_status == 'ongoing') {
      statusStr = 'ongoing'
    }
    if (this.selected_status == 'closed') {
      statusStr = 'finish'
    }
    if (this.selected_status == 'all') {
      statusStr = 'all'
    }
    this.onSelectStatus()
    // const param: HttpParams = new HttpParams().set('userId', this.params.userId).set('status', statusStr)
    // const count: any = await this.$request.tableCount(param).toPromise()
    // if (count && count.length > 0 && count[0].count != this.presentCount) this.onSelectStatus()
  }

  async onSelectStatus() {
    let status: any = []
    let statusStr: any = null
    if (this.selected_status == 'ongoing') {
      status = this.ongoing;
      statusStr = 'ongoing'
    }
    if (this.selected_status == 'finish') {
      status = this.finish;
      statusStr = 'finish'
    }
    if (this.selected_status == 'all') {
      status = [...this.ongoing, ...this.finish];
      statusStr = 'all'
    }
    this.params.status = JSON.stringify(status)

    const param: HttpParams = new HttpParams().set('userId', this.params.userId).set('status', statusStr)
    const resData = await this.$request.table(param).toPromise()
    // const resData = await this.$tableRequest.getTable(this.params)
    const resultMap: any = await this.mapRows(resData)
    this.presentCount = resultMap.length
    this.dataSource = new MatTableDataSource(resultMap);
    this.setOption();
  }
  private mapRows(data: any) {
    return new Promise(resolve => {
      const foo = data.map((item: any) => {
        return {
          ...item,
          btn_status: this.rowStatus(item),
          btn_text: this.rowText(item),
          userRequest: this.rowUserRequest(item)
        }
      })
      resolve(foo)
    })
  }

  rowUserRequest(item: any) {
    const resultFind = item.step5.find((i: any) => i.level == 1)
    return resultFind.prevUser.name
  }


  private rowText(item: any) {
    if (item && item.status.includes(`reject_${this.authorize}`)) return 'edit'
    if (item && item.status === 'draft') return 'edit'
    if (item && item.status === 'qe_department_head') return 'report'
    if (item && (item.status === 'close_job' || item.status === 'finish')) return 'finish'
    return 'approve'
  }

  private rowStatus(item: any) {
    if (item.status === 'request_confirm' || item.status === 'draft') {
      if (item.nextApprove && item.nextApprove._id == this.userLogin._id) return false
      return true
    } else {
      if (item.status === 'qe_engineer' || item.status === 'qe_engineer2') {
        if (item.status === localStorage.getItem('RLS_authorize')) return false
        return true
      } else {
        if (item.nextApprove && item.nextApprove._id == this.userLogin._id && item.status.includes(localStorage.getItem('RLS_authorize'))) return false
        return true
      }
    }
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
    const dialogRef = this.dialog.open(DialogViewComponent, {
      data: item,
      width: '90%',
      height: '90%'
    })

  }
  onClickViewNewTab(item: any) {
    const url = this.router.serializeUrl(this.router.createUrlTree([environment.BASE + '/view-page'], {
      queryParams: {
        id: item._id
      }
    }));
    window.open(url, '_blank');

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(item: any) {
    if (item.status === 'draft') this.linkTo('/request/sheet', item._id);
    if (item.status === 'request_approve') this.linkTo('/approve/approve-request', item._id);
    if (item.status === 'qe_window_person') this.linkTo('/qe-window-person/chamber', item._id);
    if (item.status === 'qe_engineer') this.linkTo('/qe-engineer/approve-request', item._id);
    if (item.status === 'qe_engineer2') this.linkTo('/qe-engineer/approve-request', item._id);
    if (item.status === 'qe_window_person_report') this.linkTo('/qe-window-person/report', item._id);
    if (item.status === 'request_confirm') this.linkTo('/request/confirm', item._id);
    if (item.status === 'request_confirm_edited') this.linkTo('/request/confirm', item._id);


    // if (item.status === 'reject_request') this.linkTo('/request/home', item._id);
    if (item.status === 'request') this.linkTo('/approve/approve-request', item._id);
    // if (item.status === 'request_approve') this.linkTo('/qe-window-person/approve-request', item._id);
    // if (item.status === 'reject_window_person') this.linkTo('/qe-window-person/approve-request', item._id);
    if (item.status === 'qe_section_head') this.linkTo('/qe-section-head/approve-request', item._id);

    if (item.status === 'reject_request') this.linkTo('/request/sheet', item._id);
    if (item.status === 'reject_request_approve') this.linkTo('/approve/approve-request', item._id);
    if (item.status === 'reject_qe_window_person') this.linkTo('/qe-window-person/chamber', item._id);
    if (item.status === 'reject_qe_engineer') this.linkTo('/qe-engineer/approve-request', item._id);
    // if (item.status === 'qe_department_head') this.linkTo('/qe-window-person/report', item._id);
  }

  linkTo(path: any, param: any) {
    this.router.navigate([path], {
      queryParams: {
        id: param
      }
    })
  }

  onChamber(item: any) {
    (item);
    this.router.navigate(['/qe-window-person/chamber'], {
      queryParams: {
        requestId: item.requestId
      }
    })
  }



  doo() {
    (this.paginator);
    (this.sort);
    this.params.skip = (this.paginator.pageSize * this.paginator.pageIndex).toString()
    this.params.limit = this.paginator.pageSize.toString()
    this.onSelectStatus()
  }
}
