import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChamberHttpService } from 'src/app/http/chamber-http.service';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { OperateGroupService } from 'src/app/http/operate-group.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { GroupDialogComponent } from '../../operate/group/group-dialog/group-dialog.component';
import { DialogAddComponent } from './dialog-add/dialog-add.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  displayedColumns: any = []
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private $operate_items: OperateItemsHttpService,
    public dialog: MatDialog,
    private _toast_service: ToastService,
    private $operate_group: OperateGroupService,
    private $master: MasterHttpService,
    private $chamber: ChamberHttpService
  ) {
  }

  ngOnInit(): void {
    this.getMaster();
  }

  async getMaster() {
    const resData = await this.$chamber.get().toPromise()
    this.dataSource = new MatTableDataSource(resData)
    this.displayedColumns = ['no', 'code', 'name', 'capacity', 'function', 'use', 'status', 'action']
    this.tableConfig()
  }



  tableConfig() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogAddComponent, {
      minWidth: 300,
      maxWidth: 500,

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getMaster();
      }
    })
  }

  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogAddComponent, {
      minWidth: 100,
      maxWidth: 500,
      data: item
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getMaster();
      }
    })
  }
  onDelete(item: any) {
    Swal.fire({
      title: `Do you want to delete ${item.name}?`,
      icon: 'question',
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this.$chamber.delete(item._id).subscribe(res => {
          if (res.deletedCount > 0) {
            Swal.fire('SUCCESS','','success')
            this.getMaster();
          } else {
            Swal.fire(res,'','error')
          }
        })
      }
    })
  }


}
