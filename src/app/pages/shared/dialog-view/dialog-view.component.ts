import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss']
})
export class DialogViewComponent implements OnInit {

  foo:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _loading: NgxUiLoaderService,
    private _request: RequestHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    // console.log(this.data);
     const resData = await this._request.get_id(this.data._id).toPromise()
     console.log(resData);
     this.foo =resData[0];
     console.log(this.foo);


  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 500);
  }

}
