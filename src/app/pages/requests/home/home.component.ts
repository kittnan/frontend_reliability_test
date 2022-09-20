import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HomeServiceService } from './home-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
export interface Section {
  name: string;
  updated: Date;
  size: number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  request: any;
  loaded: Boolean = false;
  constructor(
    private _home_service: HomeServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _request: RequestHttpService,
    private _loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this._loader.start();
    this._home_service.setBehaviorMaster();
    this.route.queryParams.subscribe(async params => {
      const id = params['id']
      const request = await this._request.getRequest_formById(id).toPromise()
      this._home_service.setFormStep1(request.step1);
      this._home_service.setFormStep2(request.step2);
      this._home_service.setFormStep3(request.step3);
      this._home_service.setFormStep4(request.step4);
      this._loader.stop();
      this.loaded = true;
    })
  }



}
