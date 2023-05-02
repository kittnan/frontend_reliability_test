import { UserApproveService } from 'src/app/services/user-approve.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LogFlowService } from 'src/app/http/log-flow.service';
import { QueueService } from 'src/app/http/queue.service';
import { ReportHttpService } from 'src/app/http/report-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ApproveService } from '../approve-form/approve.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-files-report',
  templateUrl: './files-report.component.html',
  styleUrls: ['./files-report.component.scss']
})
export class FilesReportComponent implements OnInit {

  @Input() queues!: any[]
  @Input() form!: any
  @Input() userLogin!: any
  @Input() show: any = true

  @Output() disable: EventEmitter<boolean> = new EventEmitter(false)

  files!: File[]
  fileProgress: boolean = false

  @ViewChild('fileUpload')
  fileUpload!: ElementRef

  // ! new
  inspectionTime: any[] = []
  constructor(
    private $report: ReportHttpService,
    private $queue: QueueService,
    private _loading: NgxUiLoaderService,
    private _approve: ApproveService,
    private $log: LogFlowService,
    private _userApprove: UserApproveService,
  ) { }

  ngOnInit(): void {
    this.validCompleteFile()
    const resultMap = this.mapReportQE()
    // console.log("🚀 ~ resultMap:", resultMap)
    const resultUnique = [...new Map(resultMap.map((item: any) => [item['at'], item])).values()];
    const resultSort = resultUnique.sort((a: any, b: any) => a.at - b.at)
    // console.log("🚀 ~ resultSort:", resultSort)
    this.inspectionTime = resultSort
  }
  mapReportQE() {
    return this.queues.reduce((p: any, n: any) => {
      const foo = n.reportQE.reduce((p2: any, n2: any) => {
        return p2.concat({
          files: n2.files,
          at: n2.at
        })
      }, [])
      return p.concat(foo)
    }, [])
  }

  onSave() {
    Swal.fire({
      title: 'Do you want to save?',
      icon: 'question',
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {
        // console.log(this.queues);
        await this.saveQueues(this.queues)
        Swal.fire('Success', '', 'success')
        this.validCompleteFile()

      }
    })
  }

  async saveQueues(queues: any) {
    return await queues.map(async (q: any) => {
      return await lastValueFrom(this.$queue.update(q._id, q))
    })
  }

  // ! new
  onUploadFile(e: any, at: number) {
    Swal.fire({
      title: 'Do you want to upload files?',
      icon: 'question',
      showCancelButton: true
    }).then(async (v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.showLoading('Uploading...')
        setTimeout(() => {
          const files = e.target.files
          this.upload(files, at)
        }, 500);
      } else {
        window.location.reload()
      }
    })
  }
  async upload(files: any, at: number) {
    const formData: any = await this.onFormData(files, at)
    const resUpload = await lastValueFrom(this.$report.upload(formData))
    const queues: any = this.queues.filter((q: any, i: number) => {
      if (q.reportQE.find((report: any) => report.at == at)) return true
      return false
    })
    const changeData_queues = queues.map((q: any) => {
      const foo = q.reportQE.find((r: any) => r.at == at)
      if (foo) {
        foo['files'] = resUpload
        return q
      }
      return q
    })

    await this.updateQueues(changeData_queues)
    setTimeout(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      }).then(() => {
        Swal.close()
        location.reload()
      })
    }, 1000);
  }


  async updateQueues(queues: any) {
    let arr = []
    for (let i = 0; i < queues.length; i++) {
      arr.push(
        await lastValueFrom(this.$queue.update(queues[i]._id, queues[i]))
      )
    }
    return arr
    // return await queues.map(async (q: any) => await lastValueFrom(this.$queue.update(q._id, q)))
  }

  onFormData(files: any, at: number) {
    return new Promise(resolve => {
      const formData: FormData = new FormData()
      const controlNo = this.form.step1.controlNo
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);

        const type = files[i].name.split('.').pop()
        const filename = `${controlNo}-${at}Hr-${i + 1}.${type}`
        // console.log("🚀 ~ filename:", filename)
        formData.append('Files', files[i], filename)

        if (i + 1 == files.length) resolve(formData)
      }
    })

  }



  onDelete(at: number, file: any) {
    Swal.fire({
      title: `Do you want to delete file at ${at}Hr?`,
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.showLoading('Deleting...')
        setTimeout(() => {
          this.deleteFile(at, file)
        }, 500);
      }
    })
  }

  async deleteFile(at: number, file: any) {
    const queues: any = this.queues.filter((q: any, i: number) => {
      if (q.reportQE.find((report: any) => report.at == at)) return true
      return false
    })
    const changeData_queues = queues.map((q: any) => {
      const foo = q.reportQE.find((r: any) => r.at == at)
      if (foo) {
        foo['files'] = foo['files'].filter((f: any) => f.name
          != file.name
        )
        return q
      }
      return q
    })
    await this.updateQueues(changeData_queues)
    await this.$report.delete(file.name).toPromise()
    setTimeout(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      }).then(() => {
        Swal.close()
        location.reload()
      })
    }, 1000);

  }

  async sendMail(action: any, at: any) {
    Swal.fire({
      title: 'Do you want to send mail?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.showLoading('Sending...')
        setTimeout(async () => {
          if (!!this.form) {
            const nextUser = this.form?.step5?.find((item: any) => item.prevStatusForm === "request")
            let approver = await this._userApprove.approver('', 7, this.userLogin)
            let newApprover
            if (approver) {
              newApprover = {
                ...approver,
                selected: approver.groupStatus ? approver.selected : nextUser.prevUser,
                groupList: approver.groupList.map((g: any) => g._id)
              }
            } else {
              newApprover = {
                selected: nextUser.prevUser,
                groupList: []
              }
            }

            if (!!nextUser) {
              this._approve.sendMailUploadFile([newApprover.selected._id], action, this.form._id, newApprover.groupList, at)
            } else {
              console.error('not found user')
            }
          } else {
            console.error('not found form')
          }
        }, 500);

      }
    })
  }
  sendLog(data: any) {
    this.$log.insertLogFlow(data).subscribe(res => console.log(res))
  }

  download(dataUrl: any, filename: any) {
    this.showLoading('Opening...')
    setTimeout(() => {
      let link = document.createElement("a");
      link.target = '_blank'
      link.href = dataUrl;
      link.download = filename;
      link.click();
      Swal.fire({
        title: 'Success',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      }).then(() => {
        Swal.close()
      })
    }, 500);
  }

  validCompleteFile() {
    // console.log(this.queues);
    const reduceTimes: any = this.queues.reduce((prev: any, now: any) => {
      prev = prev.concat(now.reportQE)
      return prev
    }, [])
    // console.log(reduceTimes);
    if (!this.form.step4.data[0].reportStatus) {
      const foo = reduceTimes.filter((time: any) => {
        if (time.resultDetail == '' || time.resultDetail == null) return true
        return false
      })
      if (foo.length === 0) {
        this.disable.emit(false)
      } else {
        this.disable.emit(true)
      }
    } else {
      const foo = reduceTimes.filter((time: any) => {
        if (time.files.length === 0) return true
        return false
      })
      if (foo.length === 0) {
        this.disable.emit(false)
      } else {
        this.disable.emit(true)
      }
    }


  }

  validButton() {
    if (localStorage.getItem('RLS_authorize') == 'guest') {
      return false
    }
    return true
  }
  validButtonSendMail(at: any) {
    if (this.findFile(at)) {
      return false
    }
    return true
  }

  findFile(at: any) {
    const queues: any = this.queues.find((q: any, i: number) => {
      if (q.reportQE.find((report: any) => report.at == at && report.files.length != 0)) return true
      return false
    })

    return queues
  }

  showLoading(text: string) {
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
