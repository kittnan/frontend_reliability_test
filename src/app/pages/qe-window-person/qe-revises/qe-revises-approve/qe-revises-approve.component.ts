import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';
import { QeChamberService } from '../../qe-chamber/qe-chamber.service';
import { QueuesRevisesService } from 'src/app/http/queues-revises.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-qe-revises-approve',
  templateUrl: './qe-revises-approve.component.html',
  styleUrls: ['./qe-revises-approve.component.scss']
})
export class QeRevisesApproveComponent implements OnInit {

  form: any = null
  request: any = null

  dataSource: any = null
  // chamberTable: any = null
  queues: any = null

  canApprove: boolean = false

  userLogin: any = null

  constructor(
    private route: ActivatedRoute,
    private _loading: NgxUiLoaderService,
    private $revises: RevisesHttpService,
    private $request: RequestHttpService,
    private _chamber: QeChamberService,
    private $queues_revise: QueuesRevisesService
  ) {
    this.userLogin = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(this.userLogin)
  }

  async ngOnInit(): Promise<void> {
    try {
      this._loading.start();
      const ID: any = await this.handleParams()
      console.log('ID', ID);
      const resData = await this.getRequestRevise(ID)
      console.log("🚀 ~ resData:", resData)
      this.form = resData[0]
      const resRequest = await this.$request.get_id(this.form.requestId).toPromise()
      console.log("🚀 ~ request:", resRequest)
      this.request = resRequest[0]
      this.dataSource = this.setDataSource(this.form)
      const newGenerateQueues = this._chamber.generateQueueRevise(this.dataSource)
      const resQueues = await this.$queues_revise.insert(newGenerateQueues).toPromise()
      this.queues = resQueues
      console.log("🚀 ~ this.queues:", this.queues)

      this._loading.stop()
    } catch (error) {
      console.log(error);

      this._loading.stop()
    }
  }


  private handleParams() {
    return new Promise((resolve, reject) => {
      this._loading.start();
      try {
        this.route.queryParams.subscribe(async params => {
          const id = params['id']
          if (id) {
            resolve(id)
          } else {
            reject('No ID')
          }
        })
      } catch (error) {
        reject(error)
      }

    })
  }

  private getRequestRevise(_id: string) {
    const params: HttpParams = new HttpParams().set('id', _id)
    return this.$revises.get(params).toPromise()
  }

  private setDataSource(data: any) {
    return data.step4.data.map((condition: any) => {
      return {
        condition: condition,
        ...data
      }
    })
  }

  qeReceiveEmit(e: any) {
    console.log(e);
  }

  // planningEmit(resultGenerate: any) {
  //   console.log("🚀 ~ resultGenerate:", resultGenerate)
  //   this.chamberTable = []
  //   this.chamberTable = resultGenerate
  // }
  tableChange(e: any) {
    console.log("🚀 ~ e:", e)
    // this.table = e
    this.form.table = e
  }
  handleValidApprove() {
    const dataNotComplete = this.queues.find((q: any) => q.status === 'draft_revise')
    if (dataNotComplete) return true
    return false
  }

  handleCanApprove(e: boolean) {
    this.canApprove = e
  }
  handleApprove() {
    Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        console.log(v.value);

        this.update(v.value)
      }
    })

  }

  async update(comment: string) {
    // const newComment = comment != '' ? `${this.userLogin.name} ->>> ${comment}` : null
    this.form = {
      ...this.form,


    }
    await this.$revises.update(this.form._id, this.form).toPromise()
  }

  handleReject() {

  }


}
