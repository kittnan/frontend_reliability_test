import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription, interval, lastValueFrom } from 'rxjs';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { environment } from 'src/environments/environment';
import { DialogViewComponent } from '../shared/dialog-view/dialog-view.component';
import { ReportService } from '../shared/table-request/report.service';

interface ParamsForm {
  userId: string,
  status: string,
  limit: string,
  skip: string,
  sort: string,
  count: string
}

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  userLogin: any;
  authorize: any;
  status: any[] = [
    'ongoing', 'finish', 'all'
  ]
  selected_status = 'ongoing'
  requests: any = []

  displayedColumns: string[] = ['controlNo', 'userRequest', 'lotNo', 'modelNo', 'status', 'userApprove', 'btn'];
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
    private dialog: MatDialog,
    private _loading: NgxUiLoaderService,
    private _report: ReportService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
  }

  async ngOnInit(): Promise<void> {
    this._loading.start()
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll()
    }, 1000);
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

    const param: HttpParams = new HttpParams().set('status', statusStr)
    const resData = await this.$request.tableAdmin(param).toPromise()
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
          btn_css: this.rowCss(item),
          userRequest: this.rowUserRequest(item)
        }
      })
      resolve(foo)
    })
  }

  rowUserRequest(item: any) {
    const resultFind = item.step5.find((i: any) => i.level == 1)
    if (resultFind?.prevUser?.name) return resultFind.prevUser.name
    return ''

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

  private rowCss(item: any) {
    if (item && item.status.includes(`reject_${this.authorize}`)) return 'font-red'
    if (item.status === 'draft') return 'font-grey'
    if (item.status === 'qe_window_person') return 'font-blue'
    if (item.status === 'qe_window_person_report') return 'font-yellow'
    if (item.status === 'finish') return 'font-green'
    if (item && item.status.includes('qe_engineer')) return 'font-orange'
    return ''
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



  htmlStatus(status: string) {
    switch (status) {
      case 'qe_window_person_report':
        return 'MAKE_REPORT'

      case 'qe_window_person_edit_plan':
        return 'EDIT_REPORT'

      default:
        return status.toUpperCase()
        break;
    }
  }

  async onDownload(item: any) {
    this._loading.start()
    const res_form = await lastValueFrom(this.$request.get_id(item._id))
    const form = res_form[0]
    setTimeout(() => {
      this._report.genReportExcel(form)
    }, 500);
  }

}
