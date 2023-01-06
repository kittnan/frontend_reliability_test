import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QueueService } from 'src/app/http/queue.service';
import { ReportHttpService } from 'src/app/http/report-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { QueueForm } from '../../qe-window-person/qe-chamber/qe-chamber.component';

@Component({
  selector: 'app-files-report',
  templateUrl: './files-report.component.html',
  styleUrls: ['./files-report.component.scss']
})
export class FilesReportComponent implements OnInit {

  @Input() queues!: any[]

  files!: File[]
  fileProgress: boolean = false

  @ViewChild('fileUpload')
  fileUpload!: ElementRef
  constructor(
    private $report: ReportHttpService,
    private $queue: QueueService,
    private _loading: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
  }

  onClickViewFile(item: any) {

  }

  async onUploadFile(e: any, time: any, no: any, i_queue: any) {
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
        setTimeout(() => {
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
            setTimeout(() => {
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

  download(dataUrl: any, filename: any) {
    let link = document.createElement("a");
    link.target = '_blank'
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }

}
