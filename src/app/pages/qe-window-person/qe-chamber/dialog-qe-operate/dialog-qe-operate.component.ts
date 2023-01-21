import { HttpParams } from '@angular/common/http';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperateGroupService } from 'src/app/http/operate-group.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-qe-operate',
  templateUrl: './dialog-qe-operate.component.html',
  styleUrls: ['./dialog-qe-operate.component.scss']
})
export class DialogQeOperateComponent implements OnInit {

  displayedColumns: string[] = ['no', 'code', 'name', 'operate', 'status'];
  dataSource: any;
  startDate: any
  groupList: any = []
  operateItems: any[] = []
  load = false
  constructor(
    private $operateGroup: OperateGroupService,
    private dialogRef: MatDialogRef<any>,
    private $operate: OperateItemsHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.load = true
    if (this.data) {
      this.startDate = new Date(this.data.startDate).toISOString()
      this.getRemainOperateItems()
      this.getGroupReady()
    }

  }

  async getRemainOperateItems() {
    this.getGroupReady()
    const param = new HttpParams().set('startDate', this.startDate)
    this.operateItems = await this.$operate.remain(param).toPromise()
    console.log(this.operateItems);

  }
  async getGroupReady() {
    const param: HttpParams = new HttpParams().set('startDate', this.startDate)
    const foo = await this.$operate.condition(param).toPromise()
    this.groupList = foo
    setTimeout(() => {
      this.load = false
    }, 500);
  }
  async loopGroup(group: any) {
    for (let i = 0; i < group.operate.length; i++) {
      const temp = await this.loopOperate(group.operate[i])
      group.operate[i] = {
        ...temp,

      }
      if (i + 1 == group.operate.length) {
        return group
      }
    }
  }
  async loopOperate(o: any) {
    const operate = JSON.stringify(o)
    return await this.$operateGroup.getReady(this.startDate, operate).toPromise()
  }


  onSelect(element: any, item: any) {

    Swal.fire({
      title: `Do you want to choose ${element.code}?`,
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.dialogRef.close({
          ...item,
          code: element.code
        })
      }

    })
  }




}
