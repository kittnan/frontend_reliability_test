import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { OperateItemsHttpService } from 'src/app/http/operate-items-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { DialogModelMasterComponent } from '../../master-manage/model-master/dialog-model-master/dialog-model-master.component';
import { ItemsDialogComponent } from './items-dialog/items-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {


  displayedColumns: any = []
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _operate_items: OperateItemsHttpService,
    public dialog: MatDialog,
    private _toast_service: ToastService
  ) { }

  ngOnInit(): void {
    this.getMaster();
  }

  async getMaster() {
    const resData = await this._operate_items.get().toPromise()
    this.dataSource = new MatTableDataSource(resData)
    this.displayedColumns = ['no', 'code', 'type', 'name', 'stock', 'qty', 'qtyNon', 'status', 'action']
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
    const dialogRef: MatDialogRef<any> = this.dialog.open(ItemsDialogComponent, {
      minWidth: 100,
      maxWidth: 300
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.length > 0) {
        this.getMaster();
      }
    })
  }

  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(ItemsDialogComponent, {
      minWidth: 100,
      maxWidth: 300,
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
        this._operate_items.delete(item._id).subscribe(res => {
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
