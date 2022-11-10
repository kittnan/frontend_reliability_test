import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ChamberTableComponent } from '../chamber-table/chamber-table.component';

@Component({
  selector: 'app-condition-table',
  templateUrl: './condition-table.component.html',
  styleUrls: ['./condition-table.component.scss']
})
export class ConditionTableComponent implements OnInit {

  @Input() data: any
  @Output() dataChange: EventEmitter<any> = new EventEmitter()
  @Input() click: any
  @Output() clickChange: EventEmitter<any> = new EventEmitter();
  constructor(
    private $master: MasterHttpService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  displayedColumns: string[] = ['item', 'condition', 'operate', 'inspection', 'timeInspection', 'timeReport', 'sampleNo', 'qty'];

  ngOnInit(): void {
    const access = localStorage.getItem('authorize')
    if (access == 'qe_window_person') {
      this.displayedColumns = ['item', 'condition', 'operate', 'inspection', 'timeInspection', 'timeReport', 'sampleNo', 'qty', 'chamber'];
    }
  }
  getRowSpan(action: string, index: number) {
    if (action == 'row') {
      if (index == 0) return this.data.length
      return 1
    }
    if (action == 'style') {
      if (index != 0) return false
      return true
    }
    return 1
  }
  trimStr(item: string) {
    return item.trim()
  }

  async onClickChamber(item: any) {
    console.log(item);

    this.clickChange.emit('xxx')

    // console.log(item);
    // const resData = await this.$master.getChamberByValue(item.value).toPromise()
    // console.log(resData);
    // const dialogRef: MatDialogRef<any> = this.dialog.open(ChamberTableComponent, {
    //   data: resData,
    //   maxWidth: 1000,
    //   maxHeight: 1000
    // })
  }



}
