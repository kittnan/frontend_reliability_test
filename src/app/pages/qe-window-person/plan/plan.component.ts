import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserApproveService } from 'src/app/services/user-approve.service';
import { PlanService } from './plan.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApproverForm } from '../../admin/approver/dialog-approver/dialog-approver.component';

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
    private plan$: PlanService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin');
    this.userLogin = JSON.parse(userLoginStr);
  }

  ngOnInit(): void {
    try {
      this.routeActive.queryParams.subscribe(async (params: any) => {
        const { id, editPlan } = params;
        const resData = await this.$request.get_id(id).toPromise();
        this.request = resData[0];
        this.dataSource.data = this.plan$.setDataTable(resData[0]);
        this.planing = this.plan$.genPlan(this.dataSource.data);
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }

  qeReceiveEmit(e_form: any) {
    this.loader$.start();
    setTimeout(() => {
      this.request = e_form;
      this.dataSource.data = this.plan$.setDataTable(this.request);
      this.loader$.stopAll();
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
