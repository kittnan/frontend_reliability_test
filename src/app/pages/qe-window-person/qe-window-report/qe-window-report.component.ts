import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { ShareFunctionService } from 'src/app/services/share-function.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-qe-window-report',
  templateUrl: './qe-window-report.component.html',
  styleUrls: ['./qe-window-report.component.scss']
})
export class QeWindowReportComponent implements OnInit {

  request: any;
  userLogin: any
  userApproveList: any = [];
  dateNow!: Date
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _request: RequestHttpService,
    private _toast: ToastService,
    private _user: UserHttpService,
    private _loading: NgxUiLoaderService,
    private $share: ShareFunctionService

  ) {
    const id: any = localStorage.getItem('_id')
    this._user.getUserById(id).subscribe(res => this.userLogin = res)
    this.dateNow = new Date()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      console.log(params['id']);
      const id = params['id']
      this.request = await this._request.getRequest_formById(id).toPromise()
      const findRequestApprove = this.request.step4.find((r: any) => r.access == 'request_approve')
      if (findRequestApprove) findRequestApprove.time = new Date();
    })
  }

  
  ngAfterViewInit(): void {
    this._loading.stopAll();
  }

  onClickBack() {
    this.router.navigate(['qe-window-person'])
  }


  onClickApprove() {
    Swal.fire({
      title: 'Do you want to approve ?',
      icon: 'question',
      showCancelButton: true,
      input: 'textarea',
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.updateRequest(value.value)
      }
    })

  }
  async updateRequest(confirmValue: any) {
    this.request.status = 'close_job';
  
    const resultFind :any= await this.findMe(this.request.step4)
    resultFind.status = true;
    resultFind.time = new Date();
    await this._request.updateRequest_form(this.request._id, this.request).toPromise();
    await (await this.$share.insertLogFlow('close_job', this.request.step1.controlNo, confirmValue, this.userLogin)).toPromise();
    this._toast.success();
    setTimeout(() => {
      this.router.navigate(['/qe-window-person']);
    }, 500);
  }

  findMe(step4:any){
    return new Promise((resolve,reject)=>{
      const resultFind = step4.find((u:any)=> u.access =='finish')
      if(resultFind){
        resolve(resultFind)
      }else{
        reject('you not access')
      }
    })
  }


}
