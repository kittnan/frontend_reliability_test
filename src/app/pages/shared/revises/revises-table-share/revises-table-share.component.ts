import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { DialogViewComponent } from '../../dialog-view/dialog-view.component';
import { ReportService } from '../../table-request/report.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-revises-table-share',
  templateUrl: './revises-table-share.component.html',
  styleUrls: ['./revises-table-share.component.scss']
})
export class RevisesTableShareComponent implements OnInit {

  userLogin: any;
  authorize: any;
  status: any[] = [
    'ongoing', 'finish', 'all'
  ]
  selected_status = 'ongoing'
  requests: any = []

  displayedColumns: string[] = ['controlNo', 'userRequest', 'purpose', 'requestSubject', 'modelNo', 'status', 'ongoing', 'edit', 'btn'];
  pageSizeOptions!: number[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  params: any

  ongoing: any = ['draft', 'request', 'reject_request', 'request_approve', 'qe_window_person', 'qe_engineer', 'qe_section_head', 'qe_department_head'];
  finish: any = ['finish'];
  all: any = []


  selected_section: any = null
  sections: any[] = []
  constructor(
    private $request: RequestHttpService,
    private router: Router,
    private dialog: MatDialog,
    private _loading: NgxUiLoaderService,
    private _report: ReportService,
    private $revises: RevisesHttpService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    this.sections = this.userLogin.section
    this.sections = this.sections.concat(['all'])
    this.selected_section = localStorage.getItem('RLS_section')
  }

  async ngOnInit(): Promise<void> {
    this._loading.start()
    this.authorize = localStorage.getItem('RLS_authorize');
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll()
    }, 1000);
  }

  ngOnDestroy(): void {
  }

  async onSelectStatus() {

    const param: HttpParams = new HttpParams().set('userId', this.params.userId)
    const resData = await this.$revises.getRevisesTable(param).toPromise()
    console.log("🚀 ~ resData:", resData)
    const resultMap: any = await this.mapRows(resData)
    if (this.dataSource?.data) {
      this.dataSource.data = resultMap;
    } else {
      this.dataSource = new MatTableDataSource(resultMap);
      this.setOption();
    }


  }
  private mapRows(data: any) {
    return new Promise(resolve => {
      const foo = data.map((item: any) => {
        return {
          ...item,
          btn_status: this.rowStatus(item),
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

  private rowStatus(item: any) {
    const auth = localStorage.getItem('RLS_authorize')
    if (this.userLogin._id == item.request_revise?.nextApprove._id) {
      return false
    } else {
      if (auth === 'request' && !item.request_revise) return false
    }
    return true
  }


  private setOption() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [1, 5, 10, 25, 100];
  }

  onClickView(item: any) {
    this.dialog.open(DialogViewComponent, {
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


  htmlStatus(status: string) {
    switch (status) {
      case 'qe_window_person_report':
        return 'CONTINUE_TEST'

      case 'qe_window_person_edit_plan':
        return 'EDIT_REPORT'

      default:
        return status.toUpperCase()
        break;
    }
  }

  htmlOngoingTo(item: any) {
    const foundItem = item.queues.find((i: any) => i.condition['value'] != 0)
    if (foundItem && foundItem?.inspectionTime.length >= 2) {
      const item = foundItem.inspectionTime.find((i: any) => {
        const diff = moment().diff(moment(i.startDate), 'hours')
        if (diff <= 0) return true
        return false
      })
      // console.log("🚀 ~ item:", item)
      if (item) {
        const index = foundItem.inspectionTime.indexOf(item)
        const prev = foundItem.inspectionTime[index - 1]
        if (prev) {
          const diff = moment().diff(moment(prev.endDate), 'hours')
          if (diff > 0) return `${Number(prev.at + diff)} / ${item.at}`
        }
      }
    }
    return '-'
  }


  async handleRevise(row: any) {

    Swal.fire({
      title: 'Do you want to confirm?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        try {
          this._loading.start()
          if (!row.request_revise) {
            this.createRequestRevise(row)
          } else {
            this.handleLink(row)
          }
          this._loading.stop()
        } catch (error) {
          console.log(error);
          this._loading.stop()
          Swal.fire('Something is wrong!!!!', '', 'error')
        } finally {
          this._loading.stop()
        }
      }
    })
  }

  private handleLink(row: any) {
    console.log(row);
    const request_revise = row.request_revise

    // todo valid approve
    if (request_revise.status === 'request_revise_draft') {
      this.router.navigate(['/request/revises-sheet'], { queryParams: { id: request_revise._id } })
    }
    if (request_revise.status === 'request_approve_revise') {
      this.router.navigate(['/approve/revises-approve'], { queryParams: { id: request_revise._id } })
    }
    if (request_revise.status === 'qe_window_person_revise') {
      this.router.navigate(['/qe_window/revises-approve'], { queryParams: { id: request_revise._id } })
    }

    // todo valid reject
    if (request_revise.status === 'reject_request_revise') {
      this.router.navigate(['/request/revises-sheet'], { queryParams: { id: request_revise._id } })
    }
  }

  private async createRequestRevise(row: any) {
    // const userQEWindow = row.step5.find((s: any) => s.prevStatusForm == 'qe_window_person')
    const newHistoryApprove = {
      name: this.userLogin.name,
      _id: this.userLogin._id,
      status: 'request_revise_draft',
      level: 0
    }
    const newRequestRevise = {
      ...row,
      status: 'request_revise_draft',
      level: 13,
      nextApprove: {
        name: this.userLogin.name,
        _id: this.userLogin._id,
      },
      historyApprove: [newHistoryApprove]
    }
    const res = await this.$revises.create(newRequestRevise).toPromise()
    this.router.navigate(['/request/revises-sheet'], { queryParams: { id: res[0]._id } })
  }
}
