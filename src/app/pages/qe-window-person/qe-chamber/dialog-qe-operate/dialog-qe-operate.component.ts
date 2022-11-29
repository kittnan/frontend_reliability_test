import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperateGroupService } from 'src/app/http/operate-group.service';

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
  load = false
  constructor(
    private $operateGroup: OperateGroupService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
    this.load = true
    if (this.data) {
      const startDate = this.data.startDate;
      this.startDate = startDate
      const operate = JSON.stringify(this.data.operate)
      this.getGroupReady()

    }

  }
  async getGroupReady() {
    const groups = await this.$operateGroup.get().toPromise()
    for (let i = 0; i < groups.length; i++) {
      const foo = await this.loopGroup(groups[i])
      this.groupList.push(foo)
      if (i + 1 == groups.length) {
        this.dataSource = this.groupList
        setTimeout(() => {
          this.load = false
        }, 500);
      }
    }
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
    this.dialogRef.close({
      ...item,
      code: element.code
    })
  }




}
