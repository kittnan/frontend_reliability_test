import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription, interval, lastValueFrom } from 'rxjs';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { GenInspectionTableService } from '../../qe-window-person/qe-chamber/qe-chamber-planning-detail/gen-inspection-table.service';
import { RevisesQueuesService } from '../../qe-window-person/revise/qe-window-person-revise-approve/components/revises-queues/revises-queues.service';
import { ReportService } from '../../shared/table-request/report.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { DialogViewComponent } from '../../shared/dialog-view/dialog-view.component';
interface ParamsForm {
  userId: string;
  status: string;
  limit: string;
  skip: string;
  sort: string;
  count: string;
}
@Component({
  selector: 'app-qe-technical-manage',
  templateUrl: './qe-technical-manage.component.html',
  styleUrls: ['./qe-technical-manage.component.scss']
})
export class QeTechnicalManageComponent implements OnInit {
  userLogin: any;
  authorize: any;
  status: any[] = ['ongoing', 'finish', 'all'];
  selected_status = 'ongoing';
  requests: any = [];

  displayedColumns: string[] = [
    'controlNo',
    'userRequest',
    'purpose',
    'requestSubject',
    'modelNo',
    'status',
    'ongoing',
    'edit',
    'btn',
  ];
  pageSizeOptions!: number[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  params!: ParamsForm;

  ongoing: any = [
    'draft',
    'request',
    'reject_request',
    'request_approve',
    'qe_window_person',
    'qe_engineer',
    'qe_section_head',
    'qe_department_head',
  ];
  finish: any = ['finish'];
  all: any = [];

  interval$!: Subscription;
  presentCount = 0;

  selected_section: any = null;
  sections: any[] = [];

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
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);
    this.sections = this.userLogin.section;
    this.sections = this.sections.concat(['all']);
    this.selected_section = localStorage.getItem('RLS_section');
  }

  async ngOnInit(): Promise<void> {
    this._loading.start();
    const id: any = localStorage.getItem('RLS_id');
    this.authorize = localStorage.getItem('RLS_authorize');
    this.selected_status = 'ongoing';
    if (this.authorize.includes('qe') || this.authorize.includes('admin')) {
      this.displayedColumns = [
        'controlNo',
        'userRequest',
        'purpose',
        'requestSubject',
        'modelNo',
        'status',
        'userApprove',
        'ongoing',
        'edit',
        'btn',
      ];
    }
    this.params = {
      userId: this.userLogin._id,
      status: '',
      count: '0',
      limit: '0',
      skip: '0',
      sort: '-1',
    };
    this.onSelectStatus();
    this.interval$ = interval(60000).subscribe((res) => this.autoFeed());
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.interval$.unsubscribe();
  }

  async autoFeed() {
    let statusStr: any = null;
    if (this.selected_status == 'ongoing') {
      statusStr = 'ongoing';
    }
    if (this.selected_status == 'closed') {
      statusStr = 'finish';
    }
    if (this.selected_status == 'all') {
      statusStr = 'all';
    }
    this.onSelectStatus();
  }

  async onSelectStatus() {
    let status: any = [];
    let statusStr: any = null;
    if (this.selected_status == 'ongoing') {
      status = this.ongoing;
      statusStr = 'ongoing';
    }
    if (this.selected_status == 'finish') {
      status = this.finish;
      statusStr = 'finish';
    }
    if (this.selected_status == 'all') {
      status = [...this.ongoing, ...this.finish];
      statusStr = 'all';
    }
    this.params.status = JSON.stringify(status);

    if (
      localStorage.getItem('RLS_authorize') === 'admin' ||
      localStorage.getItem('RLS_authorize') === 'qe_technical'
    ) {
      const param: HttpParams = new HttpParams().set('status', statusStr);
      const resData = await this.$request.tableAdmin(param).toPromise();
      const resultMap: any = await this.mapRows(resData);
      this.presentCount = resultMap.length;
      if (this.dataSource?.data) {
        this.dataSource.data = resultMap;
      } else {
        this.dataSource = new MatTableDataSource(resultMap);
        this.setOption();
      }
    } else {
      const tempSection =
        this.selected_section === 'all'
          ? this.sections
          : [this.selected_section];
      let section: any = [...tempSection, 'DST'];
      if (localStorage.getItem('RLS_authorize')?.includes('qe')) {
        section = [];
      }
      section = JSON.stringify(section);
      const param: HttpParams = new HttpParams()
        .set('userId', this.params.userId)
        .set('status', statusStr)
        .set('section', section);
      const resData = await this.$request.table(param).toPromise();
      const resultMap: any = await this.mapRows(resData);
      this.presentCount = resultMap.length;
      if (this.dataSource?.data) {
        this.dataSource.data = resultMap;
      } else {
        this.dataSource = new MatTableDataSource(resultMap);
        this.setOption();
      }
    }
  }
  private mapRows(data: any) {
    return new Promise((resolve) => {
      const foo = data.map((item: any) => {
        return {
          ...item,
          btn_status: this.rowStatus(item),
          btn_text: this.rowText(item),
          btn_css: this.rowCss(item),
          userRequest: this.rowUserRequest(item),
          // ongoing: this.rowOngoing(item),
        };
      });
      resolve(foo);
    });
  }


  rowUserRequest(item: any) {
    const resultFind = item.step5.find((i: any) => i.level == 1);
    if (resultFind?.prevUser?.name) return resultFind.prevUser.name;
    return '';
  }

  private rowText(item: any) {
    if (item && item.status.includes(`reject_${this.authorize}`)) return 'edit';
    if (item && item.status === 'draft') return 'edit';
    if (item && item.status === 'qe_department_head') return 'report';
    if (item && item.status === 'qe_revise') return 'revise';
    if (item && item.status === 'qe_window_person') return 'actual';
    if (item && (item.status === 'close_job' || item.status === 'finish'))
      return 'finish';
    return 'approve';
  }

  private rowStatus(item: any) {
    const auth = localStorage.getItem('RLS_authorize');
    const section = localStorage.getItem('RLS_section');
    if (item.status == 'qe_window_person_report') {
      return false
    }

    return true;
  }

  private rowCss(item: any) {
    if (item && item.status.includes('reject')) return 'font-red';
    if (item.status === 'draft') return 'font-grey';
    if (item.status === 'qe_window_person') return 'font-blue';
    if (item.status === 'qe_window_person_report') return 'font-yellow';
    if (item.status === 'finish') return 'font-green';
    if (item && item.status.includes('qe_engineer')) return 'font-orange';
    return '';
  }

  validAuthorize(item: any, access: any) {
    if (item.step5.find((i: any) => i.authorize == access)) return true;
    return false;
  }

  private setOption() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.pageSizeOptions = [1, 5, 10, 25, 100];
  }
  onClickView(item: any) {
    console.log('🚀 ~ item:', item);
    const dialogRef = this.dialog.open(DialogViewComponent, {
      data: item,
      width: '90%',
      height: '90%',
    });
  }
  onClickViewNewTab(item: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([environment.BASE + '/view-page'], {
        queryParams: {
          id: item._id,
        },
      })
    );
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
    if (item.status === 'qe_window_person_report'){
      this.linkTo('/qe-technical/request', item._id);
    }
  }

  linkTo(path: any, param: any) {
    this.router.navigate([path], {
      queryParams: {
        id: param,
      },
    });
  }

  onChamber(item: any) {
    item;
    this.router.navigate(['/qe-window-person/chamber'], {
      queryParams: {
        requestId: item.requestId,
      },
    });
  }

  htmlStatus(status: string) {
    switch (status) {
      case 'qe_window_person_report':
        return 'CONTINUE_TEST';

      case 'qe_window_person_edit_plan':
        return 'EDIT_REPORT';

      case 'qe_section_head':
        return 'QC_DEPT_HEAD';

      case 'qe_engineer2':
        return 'QE_SEC_HEAD';

      default:
        return status.toUpperCase();
        break;
    }
  }

  async onDownload(item: any) {
    this._loading.start();
    const res_form = await lastValueFrom(this.$request.get_id(item._id));
    const form = res_form[0];
    setTimeout(() => {
      this._report.genReportExcel(form);
    }, 500);
  }
  htmlOngoingTo(item: any) {
    if (item.status == 'qe_window_person_report') {
      const queues = item.queues;
      const mergeInspectTime = queues.reduce((p: any, n: any) => {
        if (n.condition.value != '0') {
          const inspec = n.inspectionTime.reduce((p2: any, n2: any) => {
            return p2.concat(n2);
          }, []);
          return p.concat(inspec);
        }
        return p;
      }, []);
      const sorted = mergeInspectTime.sort(
        (a: any, b: any) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

      const queueToday = sorted.find((a: any) => {
        const ms = moment(a.startDate);
        const me = moment(a.endDate);
        const between = moment().isBetween(ms, me);
        return between;
      });
      if (queueToday) {
        const h = this.calRange(queueToday);
        let text = queueToday.at == 0 ? 'Initial' : queueToday.at;
        return `${h} / ${text}`;
      }
    }
    return '-';
  }

  calRange(queue: any) {
    const diff1 = moment().diff(moment(queue.endDate), 'hour');
    if (queue.at == 0) {
      return queue.hr - Math.abs(diff1);
    } else {
      return queue.at - Math.abs(diff1);
    }
  }

  validQE() {
    if (this.authorize.includes('qe') || this.authorize.includes('admin'))
      return true;
    return false;
  }

  htmlRunTime(queues: any[]) {
    if (queues && queues.length > 0) {
      const start = moment(queues[0].inspectionTime[0].startDate);
      const item = moment().diff(start, 'hours');
      return item ? item : '-';
    }
    return '-';
  }

  async onClickToggleFollowUp(item: any) {
    this.userLogin;
    if (!item.followUp) item.followUp = [];
    const found = item.followUp?.find((i: any) => i._id == this.userLogin._id);
    if (found) {
      item.followUp = item.followUp.filter(
        (i: any) => i._id != this.userLogin._id
      );
      await this.$request
        .update(item._id, { followUp: item.followUp })
        .toPromise();
    } else {
      item.followUp.push(this.userLogin);
      await this.$request
        .update(item._id, { followUp: item.followUp })
        .toPromise();
    }
  }
  cssFoo(item: any) {
    if (item?.followUp?.find((i: any) => i._id == this.userLogin._id))
      return 'warn';
    return '';
  }

  onClickGeneratePlan(row: any) {
    Swal.fire({
      title: 'Do you want to regenerate plan?',
      icon: 'question',
      showCancelButton: true,
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.regeneratePlan(row);
      }
    });
  }

  regeneratePlan(row: any) {
    Swal.fire({
      title: 'Loading...',
      showConfirmButton: false,
    });
    Swal.showLoading();
    setTimeout(async () => {
      try {
        const res = await this.$request.get_id(row.requestId).toPromise();
        const queues = res[0].queues;
        const form = res[0];
        const header = queues.reduce((prev: any, now: any) => {
          const temp: any = prev;
          temp.push(now.condition.name);
          return temp;
        }, []);
        const receive = header.map((h: any) =>
          form.qeReceive?.date
            ? moment(form.qeReceive.date).format('ddd, D-MMM-YY,h:mm a')
            : '-'
        );
        const times_inspection = await this.mapTime(queues, 'inspectionTime');
        const times_report = await this.mapTime(queues, 'reportTime');
        let reportStatus = form?.step4?.data[0]?.reportStatus
          ? form.step4.data[0].reportStatus
          : form.step4.data[0].data.reportStatus;
        if (form.step4.data[0].data.report.length > 0) {
          reportStatus = true;
        }
        console.log(form.step4);

        const table_inspection: any = await this._qenInspectionTable.genTable(
          times_inspection,
          queues,
          header,
          'inspectionTime',
          times_report,
          ['Sample Receive', ...receive],
          reportStatus,
          form.step4
        );
        console.log('🚀 ~ table_inspection:', table_inspection);

        const table = {
          header: header,
          data: table_inspection,
        };
        await this.$request.update(row.requestId, { table: table }).toPromise();
        Swal.close();
        Swal.fire('SUCCESS', '', 'success');
        row.table = table;
      } catch (error) {
        console.log(error);
        Swal.close();
        Swal.fire('ERROR', '', 'error');
      }
    }, 1000);
  }
  onClickEditPlan(row: any) {
    Swal.fire({
      title: 'Do you want to edit plan?',
      icon: 'question',
      showCancelButton: true,
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.router.navigate(['qe-window-person/plan-edit'], {
          queryParams: {
            id: row.requestId,
            editPlan: true,
          },
        });
      }
    });
  }
  onClickActualPlan(row: any) {
    Swal.fire({
      title: 'Do you want to actual plan?',
      icon: 'question',
      showCancelButton: true,
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.router.navigate(['qe-window-person/plan-actual'], {
          queryParams: {
            id: row.requestId,
            editPlan: true,
          },
        });
      }
    });
  }

  mapTime(data: any, key: any) {
    return new Promise((resolve) => {
      let times = data.reduce((prev: any, now: any) => {
        const foo = prev.concat(now[key]);
        return foo;
      }, []);
      times = Object.values(
        times.reduce(
          (acc: any, cur: any) => Object.assign(acc, { [cur.at]: cur }),
          {}
        )
      );
      times.sort((a: any, b: any) => a.at - b.at);
      times.push({ at: -1 });
      resolve(times);
    });
  }

  validQeWindowAuth() {
    if (
      localStorage.getItem('RLS_authorize') == 'qe_window_person' ||
      localStorage.getItem('RLS_authorize') == 'admin'
    )
      return true;
    return false;
  }

  onClickAdvanceMode(row: any) {

    this.router.navigate(['request/sheet'], {
      queryParams: {
        id: row._id,
      },
    });

  }

}
