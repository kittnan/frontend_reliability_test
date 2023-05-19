import { RequestHttpService } from './../../../http/request-http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';


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

  @Input() propRequest: any
  @Input() propReviseMode: boolean = false
  params: any
  formId: any
  request: requestForm = {
    step1: null,
    step2: null
  }
  constructor(
    private active: ActivatedRoute,
    private $request: RequestHttpService,
    private _loading: NgxUiLoaderService,
    public translate: TranslateService,
  ) {
    this.active.queryParams.subscribe(params => this.params = params)

    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('en');
    translate.use('en');
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

  onTranslate() {
    console.log(this.translate.currentLang);
    if (this.translate.currentLang == 'th') {
      this.translate.use('en');
      return;
    }
    if (this.translate.currentLang == 'en') {
      this.translate.use('th');
      return;
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
