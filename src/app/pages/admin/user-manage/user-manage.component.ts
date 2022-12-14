import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserHttpService } from 'src/app/http/user-http.service';
import { UserForm } from 'src/app/interface/user';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {


  displayedColumns: any = []
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _user_api: UserHttpService,
    private _toast: ToastService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.getMaster()

  }

  async getMaster() {
    const resData = await this._user_api.getUser().toPromise()
    this.dataSource = new MatTableDataSource(resData)
    this.displayedColumns = ['no', 'name','employee_ID','email','department','section','auth','action']
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

  openDialogAddUser() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogAddUserComponent);
    dialogRef.afterClosed().subscribe(closed => {
      if (closed) {
        this.getMaster();
      }
    })
  }

  onEdit(user: any, index: number) {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: { ...user, index: index },
    })
    dialogRef.afterClosed().subscribe(closed => {
      if (closed) {
        this.getMaster();
      }
    })
  }

  onDelete(item: any) {
    Swal.fire({
      title: `Do you want to delete?`,
      icon: 'question',
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this._user_api.deleteUser(item._id).subscribe(res => {
          if (res.deletedCount > 0) {
            this._toast.success()
            this.getMaster()
          }
        })
      }
    })
  }



}
