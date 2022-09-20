import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HomeServiceService } from '../../requests/home/home-service.service';


@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  @Input() formInput: any
  form: any;
  step1: any
  step2: any
  step3: any
  step4: any


  constructor(
    private _homeService: HomeServiceService,
    private _loading: NgxUiLoaderService

  ) { }

  ngOnInit(): void {
    console.log(this.formInput);


    this.form = this.formInput;

    if (this.form) {
      this.step1 = this.form.step1
      this.step2 = this.form.step2
      this.step3 = this.form.step3
      this.step4 = this.form.step4

    }
    console.log(this.form);

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 500);
  }
  onClick() {
    this.form = {
      step1: this.step1,
      step2: this.step2,
      step3: this.step3,
      step4: this.step4,
    }
    console.log(this.form);

  }

}
