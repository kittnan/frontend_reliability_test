import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {
  @Input() formInput: any;
  @Input() show1: any = true;
  @Input() show2: any = true;
  @Input() show3: any = true;
  @Input() show4: any = true;
  @Input() show5: any = true;
  @Input() showComment: any = true;
  @Input() showTest: any = true;
  @Input() showReport: any = true;
  @Input() showActual: any = false;
  form: any;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  imgs: any = [];
  constructor(private _loading: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.form = this.formInput;
    if (this.form) {
      this.step1 = this.form.step1;
      this.step2 = this.form.step2;
      this.step3 = this.form.step3;
      this.step4 = this.form.step4;
      this.step5 = this.form.step5;
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
      // this.foo()
    }, 500);
  }
  onClick() {
    this.form = {
      step1: this.step1,
      step2: this.step2,
      step3: this.step3,
      step4: this.step4,
    };
  }
}
