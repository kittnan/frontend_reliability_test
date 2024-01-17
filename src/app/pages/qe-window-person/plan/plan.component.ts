import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserApproveService } from 'src/app/services/user-approve.service';
import { PlanService } from './plan.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApproverForm } from '../../admin/approver/dialog-approver/dialog-approver.component';
import { QueueService } from 'src/app/http/queue.service';
import { PlanDetailComponent } from './components/plan-detail/plan-detail.component';
import * as moment from 'moment';
import { GenInspectionTableService } from '../qe-chamber/qe-chamber-planning-detail/gen-inspection-table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  request: any = null;
  userLogin: any = null;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  userApprove: any = [];
  planing: any = null;

  approve: ApproverForm = {
    groupList: null,
    groupStatus: null,
    level: null,
    name: null,
    selected: null,
    status: null,
  };

  constructor(
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private loader$: NgxUiLoaderService,
    private plan$: PlanService,
    private $queue: QueueService,
    private _qenInspectionTable: GenInspectionTableService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);
  }

  async ngOnInit(): Promise<void> {
    try {
      this.routeActive.queryParams.subscribe(async (params: any) => {
        const { id, editPlan } = params;
        const resData = await this.$request.get_id(id).toPromise();
        this.request = resData[0];
        const setTableData = this.plan$.setDataTable(this.request)
        this.planing = this.plan$.genPlan(setTableData);

        // if (this.request.queues.length == 0) {
        //   this.planing = this.plan$.genNewPlan(this.request)
        //   const formUpdate = this.planing.map((item: any) => {
        //     if (item.condition?.value == 0) {
        //       item.chamber = {
        //         code: null,
        //         name: null
        //       }
        //     }
        //     return item
        //   })
        //   const resInsert: any = await this.$queue.insert(formUpdate).toPromise()
        //   const table: any = await this.mapForTable(formUpdate, this.request)
        //   this.request.table = table
        //   const resUpdate = await this.$request
        //     .update(this.request._id, this.request)
        //     .toPromise();
        //   if (resUpdate && resUpdate.acknowledged) {
        //     Swal.fire({
        //       title: 'Success',
        //       icon: 'success',
        //       showConfirmButton: false,
        //       timer: 1000,
        //     }).then(() => {
        //       location.reload();
        //     });
        //   }
        // } else {
        //   const setTableData = this.plan$.setDataTable(this.request)
        //   this.planing = this.plan$.genPlan(setTableData);
        // }

        // // this.dataSource.data = this.plan$.setDataTable(resData[0]);

        const resultUserApprove = await this.plan$.getUserApprove(
          this.userLogin,
          this.request,
          this.userApprove,
          'qe_engineer'
        );
        this.userApprove = resultUserApprove.userApprove;
        this.approve = resultUserApprove.approver;
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }

  public async mapForTable(queues: any, request: any) {
    const header = queues.reduce((prev: any, now: any) => {
      const temp: any = prev;
      temp.push(now.condition.name);
      return temp;
    }, []);
    const receive = header.map((h: any) =>
      request.qeReceive?.date
        ? moment(request.qeReceive.date).format('ddd, D-MMM-YY,h:mm a')
        : '-'
    );
    const times_inspection = await this.mapTime(queues, 'inspectionTime');
    const times_report = await this.mapTime(queues, 'reportTime');
    let reportStatus = request?.step4?.data[0]?.reportStatus
      ? request.step4.data[0].reportStatus
      : request.step4.data[0].data.reportStatus;
    if (request.step4.data[0].data.report.length > 0) {
      reportStatus = true;
    }

    const table_inspection: any = await this._qenInspectionTable.genTable(
      times_inspection,
      queues,
      header,
      'inspectionTime',
      times_report,
      ['Sample Receive', ...receive],
      reportStatus,
      request.step4
    );
    return {
      header: header,
      data: table_inspection,
    };
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


  qeReceiveEmit(e_form: any) {
    setTimeout(() => {
      this.request = e_form;
      this.dataSource.data = this.plan$.setDataTable(this.request);
    }, 200);
  }

  public objectComparisonFunction = function (
    option: any,
    value: any
  ): boolean {
    return option._id === value._id;
  };

  validReject() {
    if (this.request.level === 7.8) return false;
    if (this.request.level === 11) return false;
    if (this.request.level === 11.5) return false;
    return true;
  }
  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
