import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { UserHttpService } from 'src/app/http/user-http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {

  data: any
  constructor(
    private route: ActivatedRoute,
    private $request: RequestHttpService,
    private _loading: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this._loading.start();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const resData = await this.$request.get_id(id).toPromise()
      this.data = resData[0]
      console.log(this.data);

    })
  }

}
