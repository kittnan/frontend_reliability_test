import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ApproverForm } from '../../admin/approver/dialog-approver/dialog-approver.component';
import { PlanService } from '../plan/plan.service';

@Component({
  selector: 'app-plan-actual',
  templateUrl: './plan-actual.component.html',
  styleUrls: ['./plan-actual.component.scss'],
})
export class PlanActualComponent implements OnInit {
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
        console.log('🚀 ~ this.planing:', this.planing);
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
  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
