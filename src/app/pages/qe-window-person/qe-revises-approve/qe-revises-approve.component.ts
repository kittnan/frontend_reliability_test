import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-qe-revises-approve',
  templateUrl: './qe-revises-approve.component.html',
  styleUrls: ['./qe-revises-approve.component.scss']
})
export class QeRevisesApproveComponent implements OnInit {

  userLogin: any = null
  form: any = null
  constructor(
    private _route: ActivatedRoute,
    private $request: RequestHttpService,
    private $revises: RevisesHttpService,
    private _router: Router
  ) {
    this.userLogin = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(this.userLogin)
  }

  ngOnInit(): void {
    try {
      this._route.queryParams.subscribe(async (p: any) => {
        const id = p['id']
        console.log(id);
        if (id) {
          const dataRes = await this.$request.get_id(id).toPromise()
          console.log("🚀 ~ dataRes:", dataRes)
          this.form = dataRes[0]
        }
      })
    } catch (error) {

    }
  }

  async handleReject() {
    await Swal.fire({
      input: 'textarea',
      inputLabel: 'Reject',
      inputPlaceholder: 'Comment....',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.reject(v.value)
      }
    })
  }

  reject(comment: any) {
    this.showLoading('Loading...')
    setTimeout(async () => {
      try {
        console.log(typeof this.form.request_revises.comment);

        const prevComment = (typeof this.form.request_revises.comment) === 'string' ? [this.form.request_revises.comment] : this.form.request_revises.comment
        const newComment = comment ? `${this.userLogin.name} ->>> ${comment}` : null
        const nextApproveUser = this.findNextApprove('request')
        const updateRevises = {
          ...this.form.request_revises,
          status: 'reject_qe_window_person_confirm_revise',
          level: 14.13,
          nextApprove: nextApproveUser,
          comment: newComment ? [newComment, ...prevComment] : prevComment
        }
        console.log("🚀 ~ updateRevises:", updateRevises)
        // await this.$revises.update(updateRevises, updateRevises._id).toPromise()
        Swal.fire({
          title: 'Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        }).then((v: any) => {
          // this._router.navigate(['/qe-window-person/revises-table'])
        })
      } catch (error) {
        Swal.fire({
          title: 'Some thing is wrong!!!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000
        }).then((v: any) => {
          // this._router.navigate(['/qe-window-person/revises-table'])
        })
      }
    }, 1000);

  }

  private findNextApprove(prevStatus: string) {
    const step5 = this.form.step5
    const result = step5.find((s: any) => s.prevStatusForm == prevStatus)
    if (result) return result.prevUser
    return null
  }

  async handleApprove() {
    await Swal.fire({
      input: 'textarea',
      inputLabel: 'Approve',
      inputPlaceholder: 'Comment....',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.approve(v.value)
      }
    })
  }

  private approve(comment: any) {
    this.showLoading('Loading...')
    setTimeout(async () => {
      try {

        const prevComment = (typeof this.form.comment) === 'string' ? [this.form.comment] : this.form.comment
        const newComment = comment ? `${this.userLogin.name} ->>> ${comment}` : null
        const sumComment = newComment ? [newComment, ...prevComment] : prevComment

        const nextApproveUser = this.findNextApprove('request')
        const updateRevises = {
          ...this.form.request_revises,
          status: 'qe_window_person_confirm_revise',
          level: 14,
          nextApprove: nextApproveUser,
          comment: sumComment
        }
        // await this.$revises.update(updateRevises, updateRevises._id).toPromise()


        const nextApproveUser2 = this.findNextApprove('qe_window_person')

        const updateForm = {
          ...this.form,
          status: 'qe_revise',
          level: 11,
          nextApprove: nextApproveUser2,
          comment: sumComment
        }
        console.log("🚀 ~ updateForm:", updateForm)
        // await this.$request.update(this.form._id, this.form).toPromise()

        Swal.fire({
          title: 'Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        }).then((v: any) => {
          this._router.navigate(['/qe-window-person/revises-table'])
        })
      } catch (error) {
        Swal.fire({
          title: 'Some thing is wrong!!!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000
        }).then((v: any) => {
          this._router.navigate(['/qe-window-person/revises-table'])
        })
      }
    }, 1000);
  }


  private showLoading(text: string) {
    Swal.fire({
      title: text,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen(popup) {
        Swal.showLoading()
      },
    })
  }

}
