import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { DialogAuthorizeComponent } from '../authorize-master/dialog-authorize/dialog-authorize.component';
import { DialogFunctionChamberComponent } from './dialog-function-chamber/dialog-function-chamber.component';

@Component({
  selector: 'app-function-chamber',
  templateUrl: './function-chamber.component.html',
  styleUrls: ['./function-chamber.component.scss']
})
export class FunctionChamberComponent implements OnInit {


  displayedColumns: any = []
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _master_service: MasterHttpService,
    public dialog: MatDialog,
    private _toast_service: ToastService
  ) { }

  ngOnInit(): void {
    this.getMaster()


  }


  async getMaster() {
    const resData = await this._master_service.getFunctionChamber().toPromise()
    this.dataSource = new MatTableDataSource(resData)
    this.displayedColumns = ['no', 'name','value','action']
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
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogFunctionChamberComponent);
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.getMaster();
      }
    })
  }
  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogFunctionChamberComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
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
        this._master_service.deleteFunctionChamber(item._id).subscribe(res => {
          if (res.deletedCount > 0) {
            Swal.fire('SUCCESS', '', 'success')
            this.getMaster();
          } else {
            Swal.fire(res, '', 'error')
          }
        })
      }
    })
  }

}