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
  selector: 'app-qe-section-head-approve',
  templateUrl: './qe-section-head-approve.component.html',
  styleUrls: ['./qe-section-head-approve.component.scss']
})
export class QeSectionHeadApproveComponent implements OnInit {


  userLogin: any;
  config_auth = 'qe_window_person'
  dateNow!: Date

  data: any
  authorize = 'qe_window_person'
  userApprove: any = [];
  approve = new FormControl(null, Validators.required)
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private $request: RequestHttpService,
    private _toast: ToastService,
    private $user: UserHttpService,
    private _loading: NgxUiLoaderService,

  ) {
    const id: any = localStorage.getItem('_id')
    this.$user.getUserById(id).subscribe(res => this.userLogin = res)
    this.dateNow = new Date()
  }

  ngOnInit(): void {
    this._loading.start();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const resData = await this.$request.get_id(id).toPromise()
      this.data = resData[0];
      this.getUserApprove()

    })


  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }


  async getUserApprove() {
    const _id: any = localStorage.getItem("_id")
    this.userLogin = await this.$user.getUserById(_id).toPromise();
    const section = [this.userLogin.section]
    const temp_section = JSON.stringify(section)
    const level = [this.authorize]
    const temp_level = JSON.stringify(level)
    this.userApprove = await this.$user.getUserBySection(temp_section, temp_level).toPromise();
    const qe_window_person = this.data.step5.find((u: any) => u.level == 3)
    if (qe_window_person) {
      const findOld = this.userApprove.find((u: any) => u._id == qe_window_person.prevUser._id)
      const selected = findOld ? findOld : this.userApprove[0]
      this.approve.patchValue(selected)
    }


  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

}
