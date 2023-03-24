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
    const resultUnique = [...new Map(resultMap.map((item: any) => [item['at'], item])).values()];
    const resultSort = resultUnique.sort((a: any, b: any) => a.at - b.at)
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
        const files = e.target.files
        this.upload(files, at)
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
    location.reload()
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
        const type = files[i].name.split('.')[1]
        const filename = `${controlNo}-${at}Hr-${i + 1}.${type}`
        // console.log("🚀 ~ filename:", filename)
        formData.append('Files', files[i], filename)

        if (i + 1 == files.length) resolve(formData)
      }
    })

  }

  // onUploadFile(e: any, time: any, no: any, i_queue: any) {
  //   Swal.fire({
  //     title: `Do you want to upload report?`,
  //     icon: 'question',
  //     showCancelButton: true
  //   }).then(async (value: SweetAlertResult) => {
  //     if (value.isConfirmed) {

  //       this._loading.start()
  //       let runNumber = 0
  //       const files = e.target.files
  //       const len = time['files'] && time['files'].length > 0 ? time['files'].length : 1
  //       runNumber = len
  //       if (len > 1) {
  //         const spt = time['files'][len - 1].name.split('-')
  //         runNumber = Number(spt[6]) + 1
  //       }
  //       const formData: any = await this.formAppend(files, no, time, i_queue, runNumber)
  //       const res = await this.$report.upload(formData).toPromise()
  //       if (res && res.length > 0) {
  //         time['files'].push(...res)
  //         const r_update = await this.$queue.update(this.queues[i_queue]._id, this.queues[i_queue]).toPromise()

  //         if (r_update && r_update.acknowledged) {
  //           const logData = {
  //             formId: this.form._id,
  //             action: 'uploadReport',
  //             user: this.userLogin
  //           }
  //           this.sendLog(logData)
  //           this.sendMail('uploadReport')
  //           setTimeout(() => {
  //             this.validCompleteFile()
  //             this._loading.stopAll()
  //             Swal.fire('SUCCESS', '', 'success')
  //             this.fileUpload.nativeElement.value = ""
  //           }, 1000);
  //         } else {
  //           Swal.fire(`Can't update queue`, '', 'error')
  //           this.fileUpload.nativeElement.value = ""
  //         }
  //       } else {
  //         Swal.fire(`Can't upload files`, '', 'error')
  //         this.fileUpload.nativeElement.value = ""
  //       }
  //     }
  //   })
  // }

  // formAppend(files: any, no: any, time: any, i_queue: any, runNumber: any) {
  //   return new Promise(resolve => {
  //     const formData = new FormData()
  //     for (let i = 0; i < files.length; i++) {
  //       const r_split = files[i].name.split('.')
  //       const type = r_split[r_split.length - 1]
  //       let name = `${no}-${i_queue + 1}-${runNumber + i}-${time.at}hr.${type}`
  //       formData.append('Files', files[i], name)
  //       if (i + 1 == files.length) {
  //         resolve(formData)
  //       }
  //     }

  //   })
  // }

  onDelete(at: number, file: any) {
    Swal.fire({
      title: `Do you want to delete file at ${at}Hr?`,
      icon: 'question',
      showCancelButton: true
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._loading.start()
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
    this._loading.stopAll()
    location.reload()
  }

  // onDelete(file: File, time: any, i_queue: any) {
  //   Swal.fire({
  //     title: `Do you want to delete ${file.name}?`,
  //     icon: 'question',
  //     showCancelButton: true
  //   }).then(async (value: SweetAlertResult) => {
  //     if (value.isConfirmed) {
  //       this._loading.start()
  //       const res = await this.$report.delete(file.name).toPromise()
  //       if (res) {
  //         time.files = time.files.filter((f: any) => f != file)
  //         const r_update = await this.$queue.update(this.queues[i_queue]._id, this.queues[i_queue]).toPromise()
  //         if (r_update && r_update.acknowledged) {
  //           const logData = {
  //             formId: this.form._id,
  //             action: 'deleteReport',
  //             user: this.userLogin
  //           }
  //           this.sendLog(logData)

  //           // this.sendMail('deleteReport')

  //           setTimeout(() => {
  //             this.validCompleteFile()
  //             this._loading.stopAll()
  //             Swal.fire('SUCCESS', '', 'success')
  //           }, 1000);
  //         } else {
  //           Swal.fire(`Can't update queue`, '', 'error')
  //         }
  //       } else {
  //         Swal.fire(`Can't delete file`, '', 'error')
  //       }

  //     }
  //   })
  // }
  async sendMail(action: any) {
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
        this._approve.sendMail([newApprover.selected._id], action, this.form._id, newApprover.groupList)
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
    this._loading.start()
    setTimeout(() => {
      let link = document.createElement("a");
      link.target = '_blank'
      link.href = dataUrl;
      link.download = filename;
      link.click();
    }, 500);
    setTimeout(() => {
      this._loading.stopAll()
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



}
