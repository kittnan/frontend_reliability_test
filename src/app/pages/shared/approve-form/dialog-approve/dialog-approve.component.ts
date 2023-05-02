import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-approve',
  templateUrl: './dialog-approve.component.html',
  styleUrls: ['./dialog-approve.component.scss']
})
export class DialogApproveComponent implements OnInit {
  select: any
  constructor(
    public dialogRef: MatDialogRef<DialogApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);

  }

}
