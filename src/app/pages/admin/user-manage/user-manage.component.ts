import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  users!: UserForm[];
  user!: UserForm

  userFiltered!: UserForm[];
  constructor(
    public dialog: MatDialog,
    private _user_api: UserHttpService,
    private _toast: ToastService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.getUser()

  }

  getUser() {
    this._user_api.getUser().subscribe(res => {
      this.users = res
      this.userFiltered = res
    })
  }

  openDialogAddUser() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogAddUserComponent);
    dialogRef.afterClosed().subscribe(closed => {
      if (closed) {
        this.getUser();
      }
    })
  }

  onUserFilter(key: any) {
    if (key != '') {
      let filtered: any = this.users.filter((user: any) =>
        user.employee_ID.toLowerCase().includes(key.toLowerCase()) ||
        user.username.toLowerCase().includes(key.toLowerCase()) ||
        user.name.toLowerCase().includes(key.toLowerCase()) ||
        user.email.toLowerCase().includes(key.toLowerCase()) ||
        user.authorize.toLowerCase().includes(key.toLowerCase())
      )
      this.userFiltered = filtered
    } else {
      this.userFiltered = this.users
    }
  }

  onEdit(user: any, index: number) {
    console.log(user);
    
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: { ...user, index: index },
    })
    dialogRef.afterClosed().subscribe(closed => {
      if (closed) {
        this.getUser();
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
            this.getUser()
          }
        })
      }
    })
  }



}
