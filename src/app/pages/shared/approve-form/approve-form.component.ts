import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserApproveHttpService } from 'src/app/http/user-approve-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ApproveFormService } from './approve-form.service';

@Component({
  selector: 'app-approve-form',
  templateUrl: './approve-form.component.html',
  styleUrls: ['./approve-form.component.scss']
})
export class ApproveFormComponent implements OnInit {


  @Input() reject: boolean = true
  @Input() data: any
  @Input() userApprove: any

  userLogin: any

  constructor(
    private _router: Router,
    private _request: RequestHttpService,
    private _userApprove: UserApproveHttpService,
    private _user: UserHttpService,
    private $approve: ApproveFormService
  ) { }

  async ngOnInit(): Promise<void> {
    const id: any = localStorage.getItem('_id');
    this.userLogin = await this._user.getUserById(id).toPromise()
    console.log(this.userLogin);

  }
  onApprove() {
    Swal.fire({
      title: `Do you want to approve ?`,
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.$approve.submit('approve', this.data, this.userLogin, this.userApprove)
      }
    })
  }

  onReject() {
    Swal.fire({
      title: `Do you want to reject ?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        Swal.fire('Success', '', 'success')
      }
    })
  }

  onBack() {
    this._router.navigate(['/'])
  }







}
