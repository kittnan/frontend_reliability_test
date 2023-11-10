import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OperateGroupService } from 'src/app/http/operate-group.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { QueueService } from 'src/app/http/queue.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { GenInspectionTableService } from '../../../qe-chamber/qe-chamber-planning-detail/gen-inspection-table.service';
import { QeChamberService } from '../../../qe-chamber/qe-chamber.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
})
export class PlanDetailComponent implements OnInit {
  @Input() queues: any;
  @Output() queuesChange: EventEmitter<any> = new EventEmitter();

  @Input() formInput: any;

  jump: any = null;
  tableData: any = null;
  minDateInitial = new Date();
  shortMenuOption: any = [];

  constructor(
    private dialog: MatDialog,
    private $qe_chamber: QeChamberService,
    private $operateItems: OperateItemsHttpService,
    private $queue: QueueService,
    private $operateGroup: OperateGroupService,
    private $request: RequestHttpService,
    private _qenInspectionTable: GenInspectionTableService,
    private _loading: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.queues = await this.getQueuesDraft(this.queues);
    console.log('🚀 ~ this.queues:', this.queues);
    const table = await this.mapForTable(this.queues, this.formInput);
    this.tableData = table;
    this.shortMenuOption = this.queues.map((a: any, i: number) => {
      return {
        name: a.condition.name.substring(0, 50),
      };
    });
  }

  async getQueuesDraft(queues: any) {
    let tempQueues = queues;
    const queueDraft = await this.$queue
      .getFormId(tempQueues[0].work.requestId)
      .toPromise();

    tempQueues = queues.map((d: any) => {
      const draft = queueDraft.find((draft: any) => {
        return (
          draft.condition?.name == d.condition?.name &&
          draft.operate.status == d.operate.status
        );
      });

      if (draft) {
        const inspectionTime = d?.inspectionTime?.map((d: any) => {
          const a = draft.inspectionTime.find((g: any) => g.at == d.at);
          if (a) return a;
          return d;
        });
        const actualTime = d?.inspectionTime?.map((d: any, i: any) => {
          const a = draft.inspectionTime.find((g: any) => g.at == d.at);
          if (a)
            return {
              ...a,
              index: i,
              onPlan: a.onPlan == true || a.onPlan == false ? a.onPlan : true,
            };
          return { ...d, index: i, onPlan: true };
        });
        const reportQE: any = d?.reportQE?.map((d: any) => {
          const a = draft.reportQE.find((g: any) => g.at == d.at);
          if (a) {
            return a;
          }
          return d;
        });
        const reportTime = d?.reportTime?.map((d: any) => {
          const a = draft.reportTime.find((g: any) => g.at == d.at);
          if (a) return a;
          return d;
        });
        draft['inspectionTime'] = inspectionTime;
        draft['reportQE'] = reportQE;
        draft['reportTime'] = reportTime;
        draft['actualTime'] = actualTime;
        const foo = {
          ...draft,
        };
        return foo;
      } else {
        return d;
      }
    });

    this.minDateInitial = new Date(this.formInput.qeReceive.date);
    return tempQueues;
  }

  jumpTo(i: number) {
    let elements: any = document.querySelectorAll('.jump');
    const elements2: any = [...elements];
    const ids = elements2.map((a: any) => a.id);

    const id: any = ids[i];
    console.log(id);
    (document.getElementById(id) as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    setTimeout(() => {
      this.jump = false;
    }, 100);
  }
  jump2(id: string) {
    setTimeout(() => {
      (document.getElementById(id) as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 500);
  }

  syncData(e: any, index: number) {}

  async onDraft(item: any, index: number, startDate: any) {
    const table = await this.mapForTable(this.queues, this.formInput);
    this.tableData = table;
    Swal.fire({
      title: 'Do you want to save?',
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.insertDirect([item], index);
      }
    });
  }
  async insertDirect(item: any, index: number) {
    try {
      const newItem = item[0];
      if (newItem._id) {
        const r_update = await this.$queue
          .update(newItem._id, newItem)
          .toPromise();
        if (r_update && r_update.acknowledged) {
          const table = await this.mapForTable(this.queues, this.formInput);
          this.tableData = table;
          this.formInput.table = this.tableData;
          await this.$request
            .update(this.formInput._id, this.formInput)
            .toPromise();
          Swal.fire({
            title: 'Success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            location.reload();
          });
          // Swal.fire('SUCCESS', '', 'success')
          // this.queues[index].operateTable = await this.getOperateToolTableAll(newItem.startDate)
        } else {
          Swal.fire('', '', 'error');
        }
      } else {
        if (newItem.condition?.value == 0) {
          newItem.chamber = {
            code: null,
            name: null,
          };
        }

        const r_insert = await this.$queue.insert(newItem).toPromise();
        this.queues[index] = r_insert[0];
        const table = await this.mapForTable(this.queues, this.formInput);
        this.tableData = table;
        // this.queues[index].operateTable = await this.getOperateToolTableAll(
        //   newItem.startDate
        // );
        this.formInput.table = this.tableData;
        const resUpdate = await this.$request
          .update(this.formInput._id, this.formInput)
          .toPromise();
        if (resUpdate && resUpdate.acknowledged) {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            location.reload();
          });
        }
      }
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }
  onDelete(item: any) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.deleteQueue(item);
      }
    });
  }
  async deleteQueue(item: any) {
    if (item._id) {
      // this.data = this.data.filter((d: any) => d != item)
      const r_delete = await this.$queue.delete(item._id).toPromise();
      if (r_delete && r_delete.acknowledged) {
        delete item._id;
        const table = await this.mapForTable(this.queues, this.formInput);
        this.formInput.table = table;
        this.tableData = table;
        // this.getOperateToolTableAll(item.startDate);
        const resUpdate = await this.$request
          .update(this.formInput._id, this.formInput)
          .toPromise();
        // this.getQueuesDraft(this.queues)
        Swal.fire('SUCCESS', '', 'success');

        // this.queues = [...this.tempQueues]
        // this.queues = await this.getQueuesDraft(this.queues)
        // console.log("🚀 ~ this.queues:", this.queues)
        // this.tableData = await this.mapForTable(this.queues)

        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } else {
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
    let reportStatus = this.formInput?.step4?.data[0]?.reportStatus
      ? this.formInput.step4.data[0].reportStatus
      : this.formInput.step4.data[0].data.reportStatus;
    if (this.formInput.step4.data[0].data.report.length > 0) {
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
      this.formInput.step4
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
}
