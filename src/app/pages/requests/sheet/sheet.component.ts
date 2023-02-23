import { RequestHttpService } from './../../../http/request-http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';


interface requestForm {
  step1: any,
  step2: any
}
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  params: any
  formId: any
  request: requestForm = {
    step1: null,
    step2: null
  }
  constructor(
    private active: ActivatedRoute,
    private $request: RequestHttpService,
    private _loading: NgxUiLoaderService
  ) {
    this.active.queryParams.subscribe(params => this.params = params)
  }

  ngOnInit(): void {
    this._loading.start()
    if (this.params && this.params['id']) {
      this.formId = this.params['id']
      this.$request.get_id(this.params['id']).subscribe(res => {
        this.request = res[0]
      })
    }

  }
  emit(e: any) {
    this.formId = e
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll()
    }, 1000);
  }
}
