import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ApproverForm } from '../../admin/approver/dialog-approver/dialog-approver.component';
import { PlanService } from '../plan/plan.service';
import { SendMailService } from 'src/app/http/send-mail.service';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.scss'],
})
export class PlanEditComponent implements OnInit {
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
    private sendMailService: SendMailService
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
        const { approver, userApprove } = await this.plan$.getUserApprove(
          this.userLogin,
          this.request,
          this.userApprove,
          'qe_engineer'
        );
        this.approve = approver;
        this.userApprove = userApprove;
        // this.getUserApprove()
        // if (editPlan == 'true') {
        //   this.editPlan = true
        // }
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
  async sendMail() {
    try {
      // Capture element id excel for base64
      const excelElement = document.getElementById('excel');

      if (!excelElement) {
        console.error('Element with id "excel" not found');
        return;
      }

      // Convert element to canvas and then to base64
      const canvas = await html2canvas(excelElement, {
        scale: 2, // Higher quality
        useCORS: true, // Handle cross-origin images
        logging: false
      });

      const base64Image = canvas.toDataURL('image/png');

      // Prepare data to send to backend
      const toUserId = [
        this.request.step5[0]['prevUser']._id,
        this.request.step5[0]['nextUser']._id
      ];
      const receiveQty = this.request.qeReceive.qty || 0;

      // todo swal loading
      Swal.fire({
        title: 'Sending Email...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      })

      // Send to backend
      const response = await this.sendMailService.sendMailRevisePlan({
        toUserId: toUserId,
        requestNo: this.request.requestNo,
        receiveQty: receiveQty,
        table: this.request.table,
        imageBase64: base64Image // Add base64 image to payload
      }).toPromise();

      Swal.fire({
        title: 'Email Sent',
        text: 'The email has been sent successfully.',
        icon: 'success',
      }).then(() => {
        location.reload();
      })

      console.log('Mail sent successfully:', response);
    } catch (error) {
      console.error('Error sending mail:', error);
    }
  }
}
