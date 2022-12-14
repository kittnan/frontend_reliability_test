import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';
import { DialogTestingTypeComponent } from '../testing-type-master/dialog-testing-type/dialog-testing-type.component';
import { DialogTestingConditionComponent } from './dialog-testing-condition/dialog-testing-condition.component';

@Component({
  selector: 'app-testing-condition-master',
  templateUrl: './testing-condition-master.component.html',
  styleUrls: ['./testing-condition-master.component.scss']
})
export class TestingConditionMasterComponent implements OnInit {

  displayedColumns: string[] = ['name', 'list', 'action_edit'];
  dataSource!: MatTableDataSource<any>;
  pageSizeOptions!: number[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _master: MasterHttpService,
    public dialog: MatDialog,
    private _toast_service: ToastService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getMaster()
  }
  async getMaster() {
    const resData = await this._master.getTestingConditionMaster().toPromise();
    this.dataSource = new MatTableDataSource(resData);
    this.setOption()
  }

  private setOption() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [5, 10, 25, 100];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogTestingConditionComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.length > 0) {
        this.getMaster();

      }
    })
  }
  onEdit(item: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogTestingConditionComponent, {
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
        this._master.deleteTestingConditionMaster(item._id).subscribe((res: any) => {
          if (res.acknowledged) {
            this._toast_service.success();
            this.getMaster();
          } else {
            this._toast_service.danger('')
            this.getMaster();

          }
        })
      }
    })
  }
}
