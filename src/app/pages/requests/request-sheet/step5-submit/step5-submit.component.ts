import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilesHttpService } from 'src/app/http/files-http.service';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { ShareFunctionService } from 'src/app/services/share-function.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-step5-submit',
  templateUrl: './step5-submit.component.html',
  styleUrls: ['./step5-submit.component.scss']
})
export class Step5SubmitComponent implements OnInit {

  @Input() step5: any;
  @Output() step5Change = new EventEmitter();
  userLogin: any
  date: Date = new Date()

  userApprove: any;
  selected: any
  authorize = 'request_approve'
  constructor(
    private _stepper: CdkStepper,
    private _request: RequestHttpService,
    private _files: FilesHttpService,
    private _load: NgxUiLoaderService,
    private _toast: ToastService,
    private _user: UserHttpService,
    private $router: Router,
    private route: ActivatedRoute,
    private $share: ShareFunctionService
  ) { }

  ngOnInit(): void {
    this.getUserApprove()
  }

  async getUserApprove() {
    const _id: any = sessionStorage.getItem("_id")
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
    const data = {
      userId: this.selected._id,
      authorize: this.authorize,
      dateApprove: new Date()
    }
    this.step5Change.emit(data)
  }
  onBack() {
    this._stepper.previous();
  }

}
