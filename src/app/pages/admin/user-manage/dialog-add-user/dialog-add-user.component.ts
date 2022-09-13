import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { AuthorizeForm } from 'src/app/interface/authorize_master';
import { UserForm } from 'src/app/interface/user';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  newUserForm = new FormGroup({
    employee_ID: new FormControl('', Validators.required),
    username: new FormControl(''),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    authorize: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    createdBy: new FormControl('system', Validators.required),
  })

  authorizes!: AuthorizeForm[]
  _id!: string;
  URL = environment.API
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserForm,
    private _user_api: UserHttpService,
    private _toast: ToastService,
    private _master_service: MasterHttpService
  ) { }

  ngOnInit(): void {

    this._master_service.getAuthorizeMaster().subscribe(res=>{
      this.authorizes = res
    })


    if (this.data) {
      this.newUserForm.patchValue({
        employee_ID: this.data.employee_ID,
        username: this.data.username,
        password: this.data.password,
        name: this.data.name,
        email: this.data.email,
        department: this.data.department,
        section: this.data.section,
        authorize: this.data.authorize[0],
        createdBy: this.data.createdBy,
      })
      this._id = this.data._id
    }
  }
  onAddUser() {
    if (this.newUserForm.valid) {
      const authorize = [this.newUserForm.value.authorize]
      this.newUserForm.patchValue({
        username: this.newUserForm.value.employee_ID,
        createdBy: localStorage.getItem('name')
      })
      const body = {
        ...this.newUserForm.value,
        authorize:authorize
      }
      this._user_api.insertUser(body).subscribe(res => {
        if (res.length > 0) {
          this._toast.success()
          this.dialogRef.close(true)
        }
      })
    }
  }
  onSaveUser() {
    if (this.newUserForm.valid) {
      const authorize = [this.newUserForm.value.authorize]
      this.newUserForm.patchValue({
        createdBy: localStorage.getItem('name')
      })
      const body = {
        ...this.newUserForm.value,
        authorize:authorize
      }
      this._user_api.updateUser(this._id, this.newUserForm.value).subscribe(res => {
        if (res.modifiedCount > 0) {
          this._toast.success()
          this.dialogRef.close(true)
        }
      })
    }
  }

}
