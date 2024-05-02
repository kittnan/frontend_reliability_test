import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ReportHttpService } from 'src/app/http/report-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    private $report: ReportHttpService
  ) { }

  ngOnInit(): void {
  }
  onDownload() {
    let url = 'http://10.200.90.152:8081/reliability/assets/excel/report.xlsx';
    let fileName = 'report.xlsx';

    let aTag: any = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute('download', fileName); // กำหนดชื่อไฟล์ที่ต้องการ
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
  }
  async onUpload(e: Event) {
    let inputElem = e.target as HTMLInputElement
    let files: FileList | null = inputElem?.files
    if (files && files[0] && files[0].name == 'report.xlsx') {
      const formData: FormData = new FormData()
      formData.append('Files', files[0], 'report.xlsx')
      const resUpload = await lastValueFrom(this.$report.uploadTemplate(formData))
      Swal.fire({
        title:"Success",
        icon:'success',
        showConfirmButton:false,
        timer:1500
      }).then(()=>{
        location.reload()
      })
    }else{
      Swal.fire('No found file','','error')
    }
  }

}
