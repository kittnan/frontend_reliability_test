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
    private _user: UserHttpService,
    private _approve: ApproveFormService,

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
        this._approve.submit('approve', this.data, this.userLogin, this.userApprove)
      }
    })
  }

  async onReject() {

    console.log(this.data);

    const option = this.genOption(this.data.status)

    const { value: key } = await Swal.fire({
      title: 'Select REJECT ',
      input: 'select',
      inputOptions: option,
      inputPlaceholder: 'Select reject owner',
      showCancelButton: true,

    })

    if (key) {
      await Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      }).then((value: SweetAlertResult) => {
        console.log(value);
        if (value.isConfirmed) {
          Swal.fire(key)
          // Swal.fire(value.value)
          this._approve.reject('reject', this.data, this.userLogin,key,value.value)
        }
      })


    }


  }

  genOption(status: any) {
    const request_user = this.data.step5.find((s: any) => s.authorize == 'request')
    if (status == 'request') {
      return {
        'request': request_user ? 'request ➢ ' + request_user.userName : '-'
      }

    }
    return {

    }
  }

  onBack() {
    this._router.navigate(['/'])
  }







}
