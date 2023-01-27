import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LogFlowService } from 'src/app/http/log-flow.service';
import { QueueService } from 'src/app/http/queue.service';
import { ReportHttpService } from 'src/app/http/report-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ApproveService } from '../approve-form/approve.service';

@Component({
  selector: 'app-files-report',
  templateUrl: './files-report.component.html',
  styleUrls: ['./files-report.component.scss']
})
export class FilesReportComponent implements OnInit {

  @Input() queues!: any[]
  @Input() form!: any
  @Input() userLogin!: any

  @Output() disable: EventEmitter<boolean> = new EventEmitter(false)

  files!: File[]
  fileProgress: boolean = false

  @ViewChild('fileUpload')
  fileUpload!: ElementRef
  constructor(
    private $report: ReportHttpService,
    private $queue: QueueService,
    private _loading: NgxUiLoaderService,
    private _approve: ApproveService,
    private $log: LogFlowService
  ) { }

  ngOnInit(): void {
    this.validCompleteFile()
  }


  onUploadFile(e: any, time: any, no: any, i_queue: any) {
    Swal.fire({
      title: `Do you want to upload report?`,
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {

        this._loading.start()
        let runNumber = 0
        const files = e.target.files
        const len = time['files'] && time['files'].length > 0 ? time['files'].length : 1
        runNumber = len
        if (len > 1) {
          const spt = time['files'][len - 1].name.split('-')
          runNumber = Number(spt[6]) + 1
        }
        const formData: any = await this.formAppend(files, no, time, i_queue, runNumber)
        const res = await this.$report.upload(formData).toPromise()
        if (res && res.length > 0) {
          time['files'].push(...res)
          const r_update = await this.$queue.update(this.queues[i_queue]._id, this.queues[i_queue]).toPromise()

          if (r_update && r_update.acknowledged) {
            const logData = {
              formId: this.form._id,
              action: 'uploadReport',
              user: this.userLogin
            }
            this.sendLog(logData)
            this.sendMail('uploadReport')
            setTimeout(() => {
              this.validCompleteFile()
              this._loading.stopAll()
              Swal.fire('SUCCESS', '', 'success')
              this.fileUpload.nativeElement.value = ""
            }, 1000);
          } else {
            Swal.fire(`Can't update queue`, '', 'error')
            this.fileUpload.nativeElement.value = ""
          }
        } else {
          Swal.fire(`Can't upload files`, '', 'error')
          this.fileUpload.nativeElement.value = ""
        }
      }
    })
  }

  formAppend(files: any, no: any, time: any, i_queue: any, runNumber: any) {
    return new Promise(resolve => {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        const r_split = files[i].name.split('.')
        const type = r_split[r_split.length - 1]
        let name = `${no}-${i_queue + 1}-${runNumber + i}-${time.at}hr.${type}`
        formData.append('Files', files[i], name)
        if (i + 1 == files.length) {
          resolve(formData)
        }
      }

    })
  }

  onDelete(file: File, time: any, i_queue: any) {
    Swal.fire({
      title: `Do you want to delete ${file.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
        const res = await this.$report.delete(file.name).toPromise()
        if (res) {
          time.files = time.files.filter((f: any) => f != file)
          const r_update = await this.$queue.update(this.queues[i_queue]._id, this.queues[i_queue]).toPromise()
          if (r_update && r_update.acknowledged) {
            const logData = {
              formId: this.form._id,
              action: 'deleteReport',
              user: this.userLogin
            }
            this.sendLog(logData)

            this.sendMail('deleteReport')

            setTimeout(() => {
              this.validCompleteFile()
              this._loading.stopAll()
              Swal.fire('SUCCESS', '', 'success')
            }, 1000);
          } else {
            Swal.fire(`Can't update queue`, '', 'error')
          }
        } else {
          Swal.fire(`Can't delete file`, '', 'error')
        }

      }
    })
  }
  sendMail(action: any) {
    if (!!this.form) {
      const nextUser = this.form?.step5?.find((item: any) => item.prevStatusForm === "request")
      const eng = this.form?.step5?.find((item: any) => item.prevStatusForm === "qe_engineer")
      const eng2 = this.form?.step5?.find((item: any) => item.prevStatusForm === "qe_engineer2")
      if (!!nextUser) {
        this._approve.sendMail([nextUser.prevUser._id, eng._id, eng2._id], action, this.form._id)
      } else {
        console.error('not found user')
      }
    } else {
      console.error('not found form')
    }
  }
  sendLog(data: any) {
    this.$log.insertLogFlow(data).subscribe(res => console.log(res))
  }

  download(dataUrl: any, filename: any) {
    let link = document.createElement("a");
    link.target = '_blank'
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }

  validCompleteFile() {
    // console.log(this.queues);
    const reduceTimes: any = this.queues.reduce((prev: any, now: any) => {
      prev = prev.concat(now.reportTime)
      return prev
    }, [])
    // console.log(reduceTimes);

    const foo = reduceTimes.filter((time: any) => {
      if (time.files.length === 0) return true
      return false
    })
    // console.log(foo);

    if (foo.length === 0) {
      this.disable.emit(false)
    } else {
      this.disable.emit(true)
    }
  }

}
