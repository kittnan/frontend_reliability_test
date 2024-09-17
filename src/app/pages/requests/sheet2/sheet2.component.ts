import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sheet2',
  templateUrl: './sheet2.component.html',
  styleUrls: ['./sheet2.component.scss']
})
export class Sheet2Component implements OnInit {

  constructor(
    public translate: TranslateService,
    public router:Router
  ) {

    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('en');
    translate.use('th');
   }

  ngOnInit(): void {
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
  handleHeader() {
    if (localStorage.getItem('RLS_authorize') != 'admin') {
      let element: any = document.querySelectorAll(
        '.mat-horizontal-stepper-header-container'
      );
      element && element.length > 0
        ? (element[0].style.pointerEvents = 'none')
        : '';
    }
    return '';
  }

}
