import { ApproveFormService } from './../../../../shared/approve-form/approve-form.service';
import { Step5HttpService } from './../../../../../http/step5-http.service';
import { CdkStepper } from '@angular/cdk/stepper';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { ShareFunctionService } from 'src/app/services/share-function.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sheet-step5',
  templateUrl: './sheet-step5.component.html',
  styleUrls: ['./sheet-step5.component.css']
})
export class SheetStep5Component implements OnInit {
  @Input() formId: any;
  userLogin: any
  date: Date = new Date()

  userApprove: any[] = [];
  selected: any
  authorize = 'request_approve'
  resStep5: any[] = []
  form: any
  request: any
  constructor(
    private _stepper: CdkStepper,
    private _loading: NgxUiLoaderService,
    private _user: UserHttpService,
    private $step5: Step5HttpService,
    private $request: RequestHttpService,
    private _router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.getUserApprove()
    if (this.formId) {
      this.request = await this.$request.get_id(this.formId).toPromise()
      const params: HttpParams = new HttpParams().set('requestId', this.formId)
      this.resStep5 = await this.$step5.get(params).toPromise()
      const level2 = this.resStep5.find((s: any) => s.level == 2)

      this.form = level2
      if (level2) {
        const temp = this.userApprove.find((u: any) => u._id == level2.userId)
        this.selected = temp
      }
    }
  }

  async getUserApprove() {
    const _id: any = localStorage.getItem("_id")
    this.userLogin = await this._user.getUserById(_id).toPromise();
    const section = [this.userLogin.section]
    const temp_section = JSON.stringify(section)
    const level = [this.authorize]
    const temp_level = JSON.stringify(level)
    this.userApprove = await this._user.getUserBySection(temp_section, temp_level).toPromise();
  }

  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option._id === value._id;
  }

  onNext() {
    Swal.fire({
      title: 'Do you want to submit?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.comment()
      }
    })

  }

  async comment() {
    await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      (value);
      if (value.isConfirmed) {
        this._loading.start()
        const level2 = this.resStep5.find((s: any) => s.level == 2)
        if (level2) {
          this.update(value.value)
        } else {
          this.insert(value.value)
        }
      }
    })
  }

  async update(commentText: any) {
    let level1 = this.resStep5.find((s: any) => s.level == 1)
    level1 = {
      ...level1,
      dateApprove: new Date(),
      statusApprove: true,
      comment: [...level1.comment, commentText]
    }
    const resUpdateStep = await this.$step5.update(level1._id, level1).toPromise()
    const requestUpdate = {
      ...this.request,
      nextApprove: this.selected,
      status: 'request'
    }
    const resUpdateForm = await this.$request.update(this.formId, requestUpdate).toPromise()
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._router.navigate(['/request'])
    }, 1000);
  }


  async insert(commentText: any) {
    let level1 = this.resStep5.find((s: any) => s.level == 1)
    level1 = {
      ...level1,
      dateApprove: new Date(),
      status: true,
      comment: [...level1.comment, commentText]
    }
    const resUpdateStep = await this.$step5.update(level1._id, level1).toPromise()
    const nextApprove = {
      authorize: 'request_approve',
      comment: [],
      dateApprove: new Date(),
      dateReject: new Date(),
      level: 2,
      requestId: this.formId,
      statusApprove: false,
      userId: this.selected._id,
      userName: this.selected.name
    }
    console.log(nextApprove);
    console.log(this.request);
    const resInsert = await this.$step5.insert(nextApprove).toPromise()
    const requestUpdate = {
      ...this.request,
      nextApprove: this.selected,
      status: 'request'
    }
    const resUpdateForm = await this.$request.update(this.formId, requestUpdate).toPromise()
    setTimeout(() => {
      Swal.fire('SUCCESS', '', 'success')
      this._loading.stopAll()
      this._router.navigate(['/request'])
    }, 1000);

  }
  onBack() {
    this._stepper.previous();
  }

}
