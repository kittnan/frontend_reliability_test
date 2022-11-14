import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<any>
  ) {
    this.$operateGroup.get().subscribe(res => this.dataSource = res)
  }

  ngOnInit(): void {
  }
  onSelect(element: any, item: any) {
    this.dialogRef.close({
      ...item,
      code:element.code
    })
  }


}
