import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { interval, lastValueFrom, Subscription } from 'rxjs';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { environment } from 'src/environments/environment';

import { DialogViewComponent } from '../dialog-view/dialog-view.component';
import { ReportService } from './report.service';
import { RevisesQueuesService } from '../../qe-window-person/revise/qe-window-person-revise-approve/components/revises-queues/revises-queues.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { GenInspectionTableService } from '../../qe-window-person/qe-chamber/qe-chamber-planning-detail/gen-inspection-table.service';
import Swal, { SweetAlertResult } from 'sweetalert2';


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

  displayedColumns: string[] = ['controlNo', 'userRequest', 'purpose', 'requestSubject', 'modelNo', 'status', 'ongoing', 'edit', 'btn'];
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

  selected_section: any = null
  sections: any[] = []

  constructor(
    private $request: RequestHttpService,
    private router: Router,
    private dialog: MatDialog,
    private _loading: NgxUiLoaderService,
    private _report: ReportService,
    private $reviseQueues: RevisesQueuesService,
    private $revise: RevisesHttpService,
    private _qenInspectionTable: GenInspectionTableService
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
    if (this.authorize.includes("qe") || this.authorize.includes("admin")) {
      this.displayedColumns = ['controlNo', 'userRequest', 'purpose', 'requestSubject', 'modelNo', 'status', 'userApprove', 'ongoing', 'edit', 'btn'];
    }
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

    if (localStorage.getItem('RLS_authorize') === 'admin') {
      const param: HttpParams = new HttpParams().set('status', statusStr)
      const resData = await this.$request.tableAdmin(param).toPromise()
      const resultMap: any = await this.mapRows(resData)
      this.presentCount = resultMap.length
      if (this.dataSource?.data) {
        this.dataSource.data = resultMap;
      } else {
        this.dataSource = new MatTableDataSource(resultMap);
        this.setOption();
      }
    } else {
      const tempSection = this.selected_section === 'all' ? this.sections : [this.selected_section]
      let section: any = [...tempSection, "DST"]
      if (localStorage.getItem('RLS_authorize')?.includes('qe')) {
        section = []
      }
      section = JSON.stringify(section)
      const param: HttpParams = new HttpParams().set('userId', this.params.userId).set('status', statusStr).set('section', section)
      const resData = await this.$request.table(param).toPromise()
      const resultMap: any = await this.mapRows(resData)
      this.presentCount = resultMap.length
      if (this.dataSource?.data) {
        this.dataSource.data = resultMap;
      } else {
        this.dataSource = new MatTableDataSource(resultMap);
        this.setOption();
      }
    }

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
    if (item && item.status === 'qe_revise') return 'revise'
    if (item && (item.status === 'close_job' || item.status === 'finish')) return 'finish'
    return 'approve'
  }

  private rowStatus(item: any) {

    const auth = localStorage.getItem('RLS_authorize')
    const section = localStorage.getItem('RLS_section')

    if (item?.nextApprove?._id == this.userLogin?._id) {
      // ! auth request
      if (
        (
          item.status === 'request_confirm' ||
          item.status === 'draft' ||
          item.status === 'reject_request' ||
          item.status === 'request_confirm_revise' ||
          item.status === 'request_confirm_edited'
        ) &&
        (
          auth == 'request'
        )
      ) return false

      // ! auth request_approve
      if (
        (
          item.status === 'request_approve' ||
          item.status === 'reject_request_approve'
        ) &&
        (
          auth == 'request_approve'
        )
      ) return false

      // ! auth qe_window_person
      if (
        (
          item.status == 'qe_revise' ||
          item.status == 'qe_window_person' ||
          item.status == 'qe_window_person_report' ||
          item.status == 'reject_qe_window_person'
        ) &&

        (
          auth == 'qe_window_person'
        )
      ) return false

      // ! auth qe_engineer
      if (
        (
          item.status === 'qe_engineer' ||
          item.status === 'reject_qe_engineer'
        ) &&
        (
          auth == 'qe_engineer'
        )
      ) return false

      // ! auth qe_engineer 2
      if (
        (
          item.status === 'qe_engineer2' ||
          item.status === 'reject_qe_engineer2'
        ) &&
        (
          auth == 'qe_engineer2'
        )
      ) return false

      // ! auth qe_section_head
      if (
        (
          item.status === 'qe_section_head' ||
          item.status === 'reject_qe_section_head'
        ) &&
        (
          auth == 'qe_section_head'
        )
      ) return false


    }
    return true

  }

  private rowCss(item: any) {
    if (item && item.status.includes('reject')) return 'font-red'
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

  onEdit(item: any) {
    if (item.status === 'draft') this.linkTo('/request/sheet', item._id);
    if (item.status === 'request_approve') this.linkTo('/approve/approve-request', item._id);
    if (item.status === 'qe_window_person') this.linkTo('/qe-window-person/chamber', item._id);
    if (item.status === 'qe_engineer') this.linkTo('/qe-engineer/approve-request', item._id);
    if (item.status === 'qe_engineer2') this.linkTo('/qe-engineer/approve-request', item._id);
    if (item.status === 'qe_window_person_report') this.linkTo('/qe-window-person/report', item._id);
    if (item.status === 'request_confirm') this.linkTo('/request/confirm', item._id);
    if (item.status === 'request_confirm_edited') this.linkTo('/request/confirm', item._id);
    if (item.status === 'request_confirm_revise') this.linkTo('/request/confirm', item._id);


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

    if (item.status === 'qe_revise') this.linkTo('/qe-window-person/chamber', item._id);

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
        return 'CONTINUE_TEST'

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


  htmlOngoingTo(q: any, item: any) {
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
  validQE() {
    if (this.authorize.includes('qe') || this.authorize.includes('admin')) return true
    return false
  }

  htmlRunTime(queues: any[]) {
    if (queues && queues.length > 0) {
      const start = moment(queues[0].inspectionTime[0].startDate)
      const item = moment().diff(start, 'hours')
      return item ? item : '-'
    }
    return '-'
  }

  async onClickToggleFollowUp(item: any) {
    this.userLogin
    if (!item.followUp) item.followUp = []
    const found = item.followUp?.find((i: any) => i._id == this.userLogin._id)
    if (found) {
      item.followUp = item.followUp.filter((i: any) => i._id != this.userLogin._id)
      await this.$request.update(item._id, { followUp: item.followUp }).toPromise()
    } else {
      item.followUp.push(this.userLogin)
      await this.$request.update(item._id, { followUp: item.followUp }).toPromise()
    }
  }
  cssFoo(item: any) {
    if (item?.followUp?.find((i: any) => i._id == this.userLogin._id)) return 'warn'
    return ''
  }


  onClickGeneratePlan(row: any) {

    Swal.fire({
      title: 'Do you want to regenerate plan?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.regeneratePlan(row)
      }
    })
  }

  regeneratePlan(row: any) {
    Swal.fire({
      title: "Loading...",
      showConfirmButton: false
    })
    Swal.showLoading()
    setTimeout(async () => {
      try {
        const res = await this.$request.get_id(row.requestId).toPromise()
        const queues = res[0].queues
        const form = res[0]
        const header = queues.reduce((prev: any, now: any) => {
          const temp: any = prev
          temp.push(now.condition.name)
          return temp
        }, [])
        const receive = header.map((h: any) => form.qeReceive?.date ? moment(form.qeReceive.date).format('ddd, D-MMM-YY,h:mm a') : '-')
        const times_inspection = await this.mapTime(queues, 'inspectionTime')
        const times_report = await this.mapTime(queues, 'reportTime')
        let reportStatus = form?.step4?.data[0]?.reportStatus ? form.step4.data[0].reportStatus : form.step4.data[0].data.reportStatus
        if (form.step4.data[0].data.report.length > 0) {
          reportStatus = true
        }
        const table_inspection: any = await this._qenInspectionTable.genTable(times_inspection, queues, header, 'inspectionTime', times_report, ['Sample Receive', ...receive], reportStatus, form.step4)

        const table = {
          header: header,
          data: table_inspection
        }
        await this.$request.update(row.requestId, { table: table }).toPromise()
        Swal.close()
        Swal.fire('SUCCESS', '', 'success')
        row.table = table
      } catch (error) {
        console.log(error);
        Swal.close()
        Swal.fire('ERROR', '', 'error')
      }
    }, 1000);
  }
  onClickEditPlan(row: any) {
    Swal.fire({
      title: 'Do you want to edit plan?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.router.navigate(['qe-window-person/chamber'], {
          queryParams: {
            id: row.requestId,
            editPlan: true
          }
        })
      }
    })
  }

  mapTime(data: any, key: any) {
    return new Promise(resolve => {
      let times = data.reduce((prev: any, now: any) => {
        const foo = prev.concat(now[key])
        return foo
      }, [])
      times = Object.values(times.reduce((acc: any, cur: any) => Object.assign(acc, { [cur.at]: cur }), {}))
      times.sort((a: any, b: any) => a.at - b.at)
      times.push({ at: -1 })
      resolve(times)
    })
  }


  validQeWindowAuth() {
    if (localStorage.getItem('RLS_authorize') == 'qe_window_person' || localStorage.getItem('RLS_authorize') == 'admin') return true
    return false
  }



}
