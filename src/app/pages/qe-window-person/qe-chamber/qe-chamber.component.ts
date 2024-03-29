import { ApproverForm } from './../../admin/approver/dialog-approver/dialog-approver.component';
import { UserApproveService } from './../../../services/user-approve.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestHttpService } from 'src/app/http/request-http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface QueueForm {
  startDate: Date | null;
  endDate: Date | null;
  inspectionTime: TimeForm[] | null;
  reportQE: TimeForm[] | null;
  reportTime: TimeForm[] | null;
  work: WorkForm | null;
  condition: ConditionForm | null;
  operate: OperateForm | null;
  model: String | null;
  chamber?: ChamberForm;
  status: String | null;
  _id?: String | null;
  operateTable?: any;
}
interface ChamberForm {
  code: String | undefined;
  name: String | undefined;
}

export interface TimeForm {
  at: Number | null;
  startDate: Date | null;
  endDate: Date | null;
  hr: Number | null;
  delay?: Number | null | undefined;
}
export interface WorkForm {
  requestId: String;
  qty: Number;
  controlNo: String;
}

export interface ConditionForm {
  name: String;
  value: Number;
}

export interface OperateForm {
  power: ToolForm;
  attachment: ToolForm;
  checker: ToolForm;
  status: Boolean;
}
export interface ToolForm {
  code?: String;
  name?: String;
  qty?: Number | String;
}

@Component({
  selector: 'app-qe-chamber',
  templateUrl: './qe-chamber.component.html',
  styleUrls: ['./qe-chamber.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class QeChamberComponent implements OnInit {
  dataSource: any;
  form: any;
  chamberTable!: QueueForm[];
  table: any;
  nextApprove: any;
  userLogin: any;
  authorize = 'qe_engineer';
  userApprove: any = [];

  approve: ApproverForm = {
    groupList: null,
    groupStatus: null,
    level: null,
    name: null,
    selected: null,
    status: null,
  };
  approver: any;

  editPlan: boolean = false;
  constructor(
    private routeActive: ActivatedRoute,
    private $request: RequestHttpService,
    private _userApprove: UserApproveService,
    private loader$: NgxUiLoaderService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);
  }
  ngOnInit(): void {
    this.routeActive.queryParams.subscribe(async (params: any) => {
      const { id, editPlan } = params;
      const resData = await this.$request.get_id(id).toPromise();
      this.form = resData[0];
      const temp = this.setDataTable();
      this.dataSource = temp;
      this.getUserApprove();
      if (editPlan == 'true') {
        this.editPlan = true;
      }
    });
  }

  emitted(item: any) {
    this.chamberTable = [];
    this.chamberTable = item;
  }

  setDataTable() {
    const conditions = this.form.step4.data;
    return conditions.map((condition: any) => {
      return {
        condition: condition,
        ...this.form,
      };
    });
  }
  dataChange(e: any) {
    this.chamberTable = e;
  }
  tableChange(e: any) {
    this.table = e;
    this.form.table = this.table;
  }
  approveChange(e: any) {
    this.nextApprove = e;
  }

  async getUserApprove() {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);
    let select;
    if (this.form.level == 7.8) {
      this.userApprove = await this._userApprove.getUserApprove(
        this.userLogin,
        'request'
      );
      const prevUser = this.form?.step5?.find(
        (s: any) => s.level == 1
      )?.prevUser;
      select = this.userApprove.find((u: any) => u._id == prevUser._id);
    } else {
      if (
        this.form.status == 'qe_revise' ||
        this.form.status == 'reject_qe_window_person'
      ) {
        if (this.form.level == 5.3 || this.form.level == 4.3) {
          this.userApprove = await this._userApprove.getUserApprove(
            this.userLogin,
            'qe_engineer'
          );
          const prevUser = this.form?.step5?.find(
            (s: any) => s.level == 4
          )?.prevUser;
          select = this.userApprove.find((u: any) => u._id == prevUser?._id);
        } else {
          this.userApprove = await this._userApprove.getUserApprove(
            this.userLogin,
            'request'
          );
          const prevUser = this.form?.step5?.find(
            (s: any) => s.level == 1
          )?.prevUser;
          select = this.userApprove.find((u: any) => u._id == prevUser._id);
        }
      } else {
        this.userApprove = await this._userApprove.getUserApprove(
          this.userLogin,
          this.authorize
        );
        select = this.checkPrevApprove(this.form, 3);
      }
    }

    this.approver = await this._userApprove.approver(
      this.authorize,
      this.form.level,
      this.userLogin
    );
    if (this.approver && this.approver.groupStatus) {
      this.userApprove = [this.approver.selected];
      this.approve = this.approver;
    } else {
      this.approve = {
        groupList: this.approver ? this.approver.groupList : [],
        groupStatus: null,
        level: this.form?.level ? this.form.level : null,
        name: null,
        selected: select ? select : this.userApprove[0],
        status: this.form?.status ? this.form.status : null,
      };
    }
  }

  private checkPrevApprove(data: any, level: number) {
    const prevUserApprove = data.step5.find((s: any) => s.level == level);
    if (prevUserApprove) {
      return this.userApprove.find(
        (u: any) => u._id == prevUserApprove.nextUser._id
      );
    } else {
      return null;
    }
  }

  public objectComparisonFunction = function (
    option: any,
    value: any
  ): boolean {
    return option._id === value._id;
  };

  validReject() {
    if (this.form.level === 7.8) return false;
    if (this.form.level === 11) return false;
    if (this.form.level === 11.5) return false;
    return true;
  }

  qeReceiveEmit(e_form: any) {
    this.dataSource = [];
    this.chamberTable = [];
    this.loader$.start();
    setTimeout(() => {
      this.form = e_form;
      const temp = this.setDataTable();
      this.dataSource = temp;
      this.loader$.stopAll();
    }, 200);
  }

  chamberValid() {
    if (this.form?.step4?.data?.find((d: any) => d?.value == 0)) return false;
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
