import { Router } from '@angular/router';
import { RequestHttpService } from './../../../http/request-http.service';
import { Component, Input, OnInit } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-plan-reliability-test',
  templateUrl: './plan-reliability-test.component.html',
  styleUrls: ['./plan-reliability-test.component.scss']
})
export class PlanReliabilityTestComponent implements OnInit {

  @Input() requestForm: any
  @Input() queues: any

  countClass = false
  count = 1;
  constructor(
    private $request: RequestHttpService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  htmlUserRequest(step5: any) {
    return step5.find((item: any) => item.level == 1).prevUser.name || ''
  }

  htmlRowClass(row_i: number) {
    if (row_i + 1 === this.queues.data.length) return 'row-end'
    if ((row_i + 1) % 4 === 0) return 'row-space'
    return 'row-normal'
  }

  downLoadExcel() {
    // alert()
    const table = document.getElementById('excel')
    const wb: XLSX.WorkBook = XLSX.utils.table_to_book(table)
    XLSX.writeFile(wb, 'foo.xlsx', {
      bookType: 'xlsx'
    })
  }
  validAuth() {
    if (localStorage.getItem('RLS_authorize') == 'qe_window_person' && this.requestForm[0].level >= 7 && this.router.url.includes('view-page')) {
      return true
    }
    return false
  }
  onRevise() {
    Swal.fire({
      title: 'Do you want revise?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.revise()
      }
    })
  }

  async revise() {
    // console.log(this.requestForm);

    // const nextApprove = this.requestForm[0].step5[0].prevUser
    // console.log("🚀 ~ nextApprove:", nextApprove)
    const resUpdate = await this.$request.update(this.requestForm[0]._id, {
      ...this.requestForm[0],
      level: 11,
      status: 'qe_revise',
    }).toPromise()
    Swal.fire({
      title: 'Updated',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(() => {
      this.router.navigate(['/qe-window-person/chamber'], {
        queryParams: {
          id: this.requestForm[0]._id
        }
      })
    }, 1000);

  }

}
