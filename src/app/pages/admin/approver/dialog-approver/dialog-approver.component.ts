import { ApproverHttpService } from './../../../../http/approver-http.service';
import { UserHttpService } from './../../../../http/user-http.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';

export interface ApproverForm {
  level: Number | null,
  status: String | null,
  name: String | null,
  groupStatus: Boolean | null,
  selected: any | null,
  groupList: any[] | null
}

@Component({
  selector: 'app-dialog-approver',
  templateUrl: './dialog-approver.component.html',
  styleUrls: ['./dialog-approver.component.scss']
})
export class DialogApproverComponent implements OnInit {

  title: string = 'New Approver'
  approver: ApproverForm = {
    groupList: [],
    groupStatus: null,
    level: null,
    selected: null,
    status: null,
    name: null
  }
  userList: any

  displayedColumns: string[] = []
  dataSource!: MatTableDataSource<any>
  selection = new SelectionModel<any>(true, []);

  constructor(
    private $user: UserHttpService,
    private $loading: NgxUiLoaderService,
    private $approver: ApproverHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private _toast_service: ToastService
  ) { }

  ngOnInit(): void {
    this.$loading.start()
    this.getMaster()
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.$loading.stopAll()
    }, 1000);
  }

  getMaster() {
    this.$user.getUser().subscribe(res => {

      this.userList = res
      this.dataSource = new MatTableDataSource(res)
      this.displayedColumns = [
        'select', 'position', 'section', 'name', 'auth', 'email'
      ]
      if (this.data) {
        this.title = 'Update Approver'
        this.approver = {
          ...this.data
        }
        this.selection = new SelectionModel(true, this.data.groupList)
        this.selection.setSelection(...this.data.groupList)
      }

    })
  }
  isSelected(row: any) {
    return this.selection.selected.find((s: any) => s._id == row._id) ? true : false
  }
  compareObjects(o1: any, o2: any) {
    if (o1.name == o2.name && o1.id == o2.id)
      return true;
    else return false
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submit() {
    this.approver.groupList = this.selection.selected
    if (this.data) {
      Swal.fire({
        title: 'Do you want to save?',
        icon: 'question',
        showCancelButton: true
      }).then((ans: SweetAlertResult) => {
        if (ans.isConfirmed) {
          this.update()
        }
      })
    } else {
      Swal.fire({
        title: 'Do you want to add new?',
        icon: 'question',
        showCancelButton: true
      }).then((ans: SweetAlertResult) => {
        if (ans.isConfirmed) {
          this.insert()
        }
      })
    }
  }
  private async insert() {
    const resInsert = await this.$approver.insert(this.approver).toPromise()
    if (resInsert && resInsert.length !== 0) {
      this._toast_service.success()
      this.dialogRef.close(resInsert)
    }
  }
  private async update() {
    const resUpdate = await this.$approver.update(this.data._id, this.approver).toPromise()
    console.log(resUpdate);

    if (resUpdate && resUpdate.modifiedCount != 0) {
      this._toast_service.success()
      this.dialogRef.close(resUpdate)
    }

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  unSelect(item: any) {
    this.selection.deselect(item)
  }



}
