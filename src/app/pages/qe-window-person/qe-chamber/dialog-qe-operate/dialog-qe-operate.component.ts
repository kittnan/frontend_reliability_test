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
  constructor(
    private $operateGroup: OperateGroupService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
    if (this.data) {
      const startDate = this.data.startDate;
      const operate = JSON.stringify(this.data.operate)
      this.$operateGroup.getReady(startDate,operate).subscribe(res=>{
        console.log(res);

      })
    }
  }
  onSelect(element: any, item: any) {
    this.dialogRef.close({
      ...item,
      code: element.code
    })
  }


}
