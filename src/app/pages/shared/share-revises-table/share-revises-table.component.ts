import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DialogViewComponent } from '../dialog-view/dialog-view.component';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ReportService } from '../table-request/report.service';

@Component({
  selector: 'app-share-revises-table',
  templateUrl: './share-revises-table.component.html',
  styleUrls: ['./share-revises-table.component.scss'],
})
export class ShareRevisesTableComponent implements OnInit {
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

  params: any;

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

  selected_section: any = null;
  sections: any[] = [];

  level = [13, 13.5, 14, 15, 15.5, 16, 17, 18, 19];

  $revise = inject(RevisesHttpService);
  constructor(
    private $request: RequestHttpService,
    private router: Router,
    private dialog: MatDialog,
    private _loading: NgxUiLoaderService,
    private _report: ReportService
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
    this.params = {
      userId: this.userLogin._id,
      status: '',
      count: '0',
      limit: '0',
      skip: '0',
      sort: '-1',
    };
    this.onSelectStatus();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }

  ngOnDestroy(): void {}

  async onSelectStatus() {
    const levelStr = this.generateLevelList();
    const param: HttpParams = new HttpParams()
      .set('userId', this.params.userId)
      .set('level', levelStr);
    const resData = await this.$revise.getReviseTable(param).toPromise();
    const resultMap: any = await this.mapRows(resData);
    if (this.dataSource?.data) {
      this.dataSource.data = resultMap;
    } else {
      this.dataSource = new MatTableDataSource(resultMap);
      console.log('🚀 ~ resultMap:', resultMap);
      this.setOption();
    }
  }
  generateLevelList() {
    const authStr = localStorage.getItem('RLS_authorize');
    if (authStr == 'request')
      return JSON.stringify([7, 13, 13.5, 14, 15, 15.5, 16, 17, 18, 19, 20]);
    if (authStr == 'request_approve') return JSON.stringify([14]);
    if (authStr == 'qe_window_person') return JSON.stringify([15, 15.5]);
    if (authStr == 'qe_engineer') return JSON.stringify([16]);
    if (authStr == 'qe_engineer2') return JSON.stringify([17]);
    if (authStr == 'qe_section_head') return JSON.stringify([18]);
    return JSON.stringify([]);
  }
  private mapRows(data: any) {
    return new Promise((resolve) => {
      const foo = data.map((item: any) => {
        return {
          ...item,
          btn_status: this.rowStatus(item),
          btn_text: this.rowText(item),
          userRequest: this.rowUserRequest(item),
        };
      });
      resolve(foo);
    });
  }

  rowUserRequest(item: any) {
    const resultFind = item.step5.find((i: any) => i.level == 1);
    if (resultFind?.prevUser?.name) return resultFind.prevUser.name;
    return 'REQUEST REVISE';
  }

  private rowText(item: any) {
    if (
      item &&
      item.request_revise &&
      item.request_revise.status.includes('reject')
    )
      return 'EDIT';
    if (
      item &&
      item.request_revise &&
      item.request_revise.status == 'draft_request_revise'
    )
      return 'EDIT';
    if (item && !item.request_revise) return 'REQUEST REVISE';
    if (item && item.request_revise && item.request_revise.status == 'finish')
      return 'FINISH';
    return 'APPROVE';
  }

  private rowStatus(item: any) {
    console.log(item);

    if (item && item.request_revise) {
      if (item.request_revise?.nextApprove?._id == this.userLogin._id)
        return false;
      return true;
    }
    return false;
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
      height: '90%',
    });
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
        return 'CONTINUE_TEST';

      case 'qe_window_person_edit_plan':
        return 'EDIT_REPORT';

      default:
        return status.toUpperCase();
        break;
    }
  }

  htmlOngoingTo(item: any) {
    const foundItem = item.queues.find((i: any) => i.condition['value'] != 0);
    if (foundItem && foundItem?.inspectionTime.length >= 2) {
      const item = foundItem.inspectionTime.find((i: any) => {
        const diff = moment().diff(moment(i.startDate), 'hours');
        if (diff <= 0) return true;
        return false;
      });
      // console.log("🚀 ~ item:", item)
      if (item) {
        const index = foundItem.inspectionTime.indexOf(item);
        const prev = foundItem.inspectionTime[index - 1];
        if (prev) {
          const diff = moment().diff(moment(prev.endDate), 'hours');
          if (diff > 0) return `${Number(prev.at + diff)} / ${item.at}`;
        }
      }
    }
    return '-';
  }

  handleRevise(row: any) {
    console.log(row);

    if (row?.request_revise) {
      let path = this.generatePath(row.request_revise.level);
      this.router.navigate([path], {
        queryParams: { id: row.request_revise.requestId },
      });
    } else {
      Swal.fire({
        title: 'Do you want to request revise ?',
        icon: 'question',
        showCancelButton: true,
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          console.log(row);
          const createData = {
            ...row,
            status: 'draft_request_revise',
            level: 13,
            comment: [],
            nextApprove: {
              _id: this.userLogin._id,
              name: this.userLogin.name,
            },
          };
          delete createData._id;
          await this.insertRevise(createData);
        }
      });
    }
  }

  private generatePath(level: any) {
    switch (level) {
      case 13:
        return 'request/revises-sheet';
        break;
      case 13.5:
        return 'request/revises-sheet';
        break;
      case 14:
        return 'approve/revises-approve';
        break;
      case 15:
        return 'qe-window-person/revises-approve';
        break;
      case 15.5:
        return 'qe-window-person/revises-approve';
        break;
      case 16:
        return 'qe-engineer/revises-approve';
        break;
      case 17:
        return 'qe-engineer/revises-approve';
        break;
      case 18:
        return 'qe-section-head/revises-approve';
        break;
      case 19:
        return 'request/revises-approve';
        break;

      default:
        return '';
        break;
    }
  }

  public async insertRevise(data: any) {
    try {
      this._loading.start();
      await this.$revise.insert(data).toPromise();
      Swal.fire({
        title: 'SUCCESS',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        this._loading.stop();
        this.router.navigate(['/request/revises-sheet'], {
          queryParams: { id: data.requestId },
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      const errorStr = JSON.stringify(error);
      Swal.fire(errorStr, '', 'error');
      setTimeout(() => {
        this._loading.stop();
      }, 1000);
    } finally {
      setTimeout(() => {
        this._loading.stop();
      }, 1000);
    }
  }
}
