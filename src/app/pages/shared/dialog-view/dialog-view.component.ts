import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss']
})
export class DialogViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _loading: NgxUiLoaderService
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 500);
  }

}
