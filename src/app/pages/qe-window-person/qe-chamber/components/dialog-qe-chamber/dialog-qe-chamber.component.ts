import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ChamberHttpService } from 'src/app/http/chamber-http.service';
import { QueuesRevisesService } from 'src/app/http/queues-revises.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-dialog-qe-chamber',
  templateUrl: './dialog-qe-chamber.component.html',
  styleUrls: ['./dialog-qe-chamber.component.scss']
})
export class DialogQeChamberComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $chamber: ChamberHttpService,
    private $revise: QueuesRevisesService
  ) { }
  displayedColumns: string[] = ['action', 'code', 'name', 'capacity', 'use', 'function', 'remain'];
  rows: any
  load = false

  async ngOnInit(): Promise<void> {
    this.load = true
    if (this.data) {
      this.data.value = Number(this.data.value)
      console.log(this.data);
      let value = []
      if (this.data.value == 1 || this.data.value == 2) {
        value = [this.data.value, 5]
      } else {
        value = [this.data.value]
      }
      const valueStr = JSON.stringify(value)
      const param: HttpParams = new HttpParams().set('value', valueStr).set('startDate', moment(this.data.startDate).toISOString()).set('qty', this.data.qty)
      if (this.data.revise) {
        this.rows = await this.$revise.getReady(param).toPromise()
      } else {
        this.rows = await this.$chamber.getReady(param).toPromise()
      }
      setTimeout(() => {
        this.load = false
      }, 500);
    }
  }
  htmlCap(item: any) {
    return `${item.run}/${item.capacity}`
  }
  htmlCalCapPercent(item: any) {
    const cap = Number(item.capacity)
    const use = Number(item.run) == 0 ? cap : Number(item.run)
    const percent = (use / cap)
    return percent
  }
  onSelect(e: any) {
    Swal.fire({
      title: `Do you want to select ${e.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.dialogRef.close(e)
      }
    })
  }

}
