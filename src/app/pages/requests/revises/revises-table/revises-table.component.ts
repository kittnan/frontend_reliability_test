import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { DialogViewComponent } from 'src/app/pages/shared/dialog-view/dialog-view.component';
import { ReportService } from 'src/app/pages/shared/table-request/report.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { RevisesHttpService } from 'src/app/http/revises-http.service';

@Component({
  selector: 'app-revises-table',
  templateUrl: './revises-table.component.html',
  styleUrls: ['./revises-table.component.scss']
})
export class RevisesTableComponent implements OnInit {
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

  $revise = inject(RevisesHttpService)
  constructor(
    private $request: RequestHttpService,
    private router: Router,
    private dialog: MatDialog,
    private _loading: NgxUiLoaderService,
    private _report: ReportService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    this.sections = this.userLogin.section
    this.sections = this.sections.concat(['all'])
    this.selected_section = localStorage.getItem('RLS_section')

  }

  async ngOnInit(): Promise<void> {
    this._loading.start()
    const id: any = localStorage.getItem('RLS_id')
    this.authorize = localStorage.getItem('RLS_authorize');
    this.selected_status = 'ongoing';
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
    let statusStr: any = 'revises'

    const tempSection = this.selected_section === 'all' ? this.sections : [this.selected_section]
    let section: any = [...tempSection, "DST"]
    if (localStorage.getItem('RLS_authorize')?.includes('qe')) {
      section = []
    }
    section = JSON.stringify(section)
    const param: HttpParams = new HttpParams().set('userId', this.params.userId).set('status', statusStr).set('section', section)
    const resData = await this.$revise.getReviseTable(param).toPromise()
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


  private rowText(item: any) {
    if (item && item.status.includes(`reject_${this.authorize}`)) return 'edit'
    if (item && item.status === 'draft') return 'edit'
    if (item && item.status === 'qe_department_head') return 'report'
    if (item && item.status === 'qe_revise') return 'revise'
    if (item && (item.status === 'close_job' || item.status === 'finish')) return 'finish'
    return 'approve'
  }

  private rowStatus(item: any) {
    // console.log(item);

    const auth = localStorage.getItem('RLS_authorize')
    if (auth == 'request' && item.status == 'qe_window_person_report' && item.level == 7) return false
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


  handleRevise(row: any) {

    if (row?.request_revise) {
      this.router.navigate(['/request/revises-sheet'], { queryParams: { id: row.request_revise.requestId } })
    } else {
      Swal.fire({
        title: 'Do you want to request revise ?',
        icon: 'question',
        showCancelButton: true,
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          const createData = {
            ...row,
            status: 'draft_request_revise',
            level: 13,
            comment: [],
            nextApprove: {
              _id: this.userLogin._id,
              name: this.userLogin.name
            }
          }
          delete createData._id
          await this.insertRevise(createData)
        }
      })
    }

  }



  public async insertRevise(data: any) {
    try {
      this._loading.start()
      await this.$revise.insert(data).toPromise()
      Swal.fire('Success', '', 'success')
      setTimeout(() => {
        this._loading.stop()
        this.router.navigate(['/request/revises-sheet'], { queryParams: { id: data.requestId } })
      }, 1000);
    } catch (error) {
      console.log(error);
      const errorStr = JSON.stringify(error)
      Swal.fire(errorStr, '', 'error')
      setTimeout(() => {
        this._loading.stop()
      }, 1000);
    } finally {
      setTimeout(() => {
        this._loading.stop()
      }, 1000);
    }
  }


}
