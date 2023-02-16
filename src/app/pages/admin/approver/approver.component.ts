import { ApproverHttpService } from './../../../http/approver-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';
import { DialogApproverComponent } from './dialog-approver/dialog-approver.component';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.scss']
})
export class ApproverComponent implements OnInit {

  displayedColumns: any = []
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _toast_service: ToastService,
    private $approver: ApproverHttpService,
  ) { }

  ngOnInit(): void {
    this.getMaster();
  }

  getMaster() {
    this.$approver.get().pipe(map((val: any) => {
      return val.map((v: any, i: number) => {
        return {
          position: i + 1,
          ...v
        }
      })
      // })).subscribe(res => console.log(res))
    })).subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
      this.displayedColumns = ['position', 'level', 'status', 'name', 'groupStatus', 'groupList', 'action']
      this.tableConfig()
    })
  }

  // async getMaster() {
  //   const resData = await this._operate_items.get().toPromise()
  //   this.dataSource = new MatTableDataSource(resData)
  //   this.displayedColumns = ['no', 'code', 'type', 'name', 'stock', 'qty', 'qtyNon', 'status', 'action']
  //   this.tableConfig()
  // }



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
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogApproverComponent, {
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.length > 0) {
        this.getMaster();
      }
    })
  }

  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogApproverComponent, {
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
        this.$approver.delete(item._id).subscribe(res => {
          if (res.deletedCount > 0) {
            this._toast_service.success();
            this.getMaster();
          } else {
            this._toast_service.danger('')
          }
        })
      }
    })
  }

}
