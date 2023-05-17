import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from './success/success.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialog: MatDialog
  ) { }

  success(message: string) {
    this.dialog.open(SuccessComponent, {
      data: {
        message: message
      },
      width: '300px',
      // height: '300px',
      disableClose: true,
      panelClass: 'success',
    })
  }

}
