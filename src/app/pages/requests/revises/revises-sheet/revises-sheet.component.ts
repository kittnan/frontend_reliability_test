import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { RevisesHttpService } from 'src/app/http/revises-http.service';

@Component({
  selector: 'app-revises-sheet',
  templateUrl: './revises-sheet.component.html',
  styleUrls: ['./revises-sheet.component.scss']
})
export class RevisesSheetComponent implements OnInit {

  userLogin: any
  form: any = null
  constructor(
    private _loading: NgxUiLoaderService,
    private route: ActivatedRoute,
    private $revises: RevisesHttpService,
    public translate: TranslateService
  ) {
    let userLoginStr: any = localStorage.getItem('RLS_userLogin')
    this.userLogin = JSON.parse(userLoginStr)
    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  async ngOnInit(): Promise<void> {
    try {
      this._loading.start();
      const ID: any = await this.handleParams()
      const resData = await this.getPrevData(ID)
      this.form = resData[0]
      this._loading.stop()
    } catch (error) {
      alert(error)
      this._loading.stop()
    }
  }

  handleParams() {
    return new Promise((resolve, reject) => {
      this._loading.start();
      try {
        this.route.queryParams.subscribe(async params => {
          const id = params['id']
          if (id) {
            resolve(id)
          } else {
            reject('No ID')
          }
        })
      } catch (error) {
        reject(error)
      }

    })
  }

  getPrevData(id: string) {
    const params: HttpParams = new HttpParams().set('id', id)
    return this.$revises.getByRequestId(params).toPromise()
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

}
