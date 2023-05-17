import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from './success.component';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(message: string) {
    this.dialog.open(SuccessComponent, {
      data: {
        message: message
      }
    })
  }
}
