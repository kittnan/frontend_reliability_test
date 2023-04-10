import { RequestHttpService } from './../../../http/request-http.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-qe-receive',
  templateUrl: './qe-receive.component.html',
  styleUrls: ['./qe-receive.component.scss']
})
export class QeReceiveComponent implements OnInit {

  @Input() form: any
  @Output() formChange: EventEmitter<any> = new EventEmitter()

  @Input() disable = false
  minDate = new Date()
  constructor(
    private $request: RequestHttpService
  ) { }

  ngOnInit(): void {
  }

  onDraft() {
    Swal.fire({
      title: 'Do you want to save receive data?',
      icon: 'question',
      showCancelButton: true
    }).then(async (ans: SweetAlertResult) => {
      if (ans.isConfirmed) {
        this.$request.update(this.form._id, this.form).subscribe(res => {
          if (res) {
            Swal.fire({
              title: 'Success',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            }).then((v: any) => {
              location.reload()
            })
            // this.formChange.emit(this.form)
          }
        })

      }
    })
  }

}
