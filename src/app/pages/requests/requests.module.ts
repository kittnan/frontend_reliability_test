import { LowTempFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/low-temp-form/low-temp-form.component';
import { SheetStep5Component } from './sheet/components/sheet-step5/sheet-step5.component';
import { SheetStep4Component } from './sheet/components/sheet-step4/sheet-step4.component';
import { SheetStep3Component } from './sheet/components/sheet-step3/sheet-step3.component';
import { SheetStep1Component } from './sheet/components/sheet-step1/sheet-step1.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from 'src/app/pipe/pipe.module';

import { SheetComponent } from './sheet/sheet.component';
import { SheetStep2Component } from './sheet/components/sheet-step2/sheet-step2.component';
import { Step4HomeComponent } from './sheet/components/sheet-step4/step4-form/step4-home/step4-home.component';
import { HeatShockComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/heat-shock/heat-shock.component';
import { HighLowComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-low/high-low.component';
import { HighTempFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-form/high-temp-form.component';
import { HighTempHumiFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-humi-form/high-temp-humi-form.component';
import { HighTempHumiVibrationFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-humi-vibration-form/high-temp-humi-vibration-form.component';
import { InspectionFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/inspection-form/inspection-form.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NoOvenComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/no-oven/no-oven.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RevisesSheetComponent } from './revises/revises-sheet/revises-sheet.component';
import { RevisesTableComponent } from './revises/revises-table/revises-table.component';
import { ReviseSheet1Component } from './revises/revises-sheet/components/revise-sheet1/revise-sheet1.component';
import { ReviseSheet2Component } from './revises/revises-sheet/components/revise-sheet2/revise-sheet2.component';
import { ReviseSheet3Component } from './revises/revises-sheet/components/revise-sheet3/revise-sheet3.component';
import { ReviseSheet4Component } from './revises/revises-sheet/components/revise-sheet4/revise-sheet4.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    RequestsComponent,

    ManageComponent,

    SheetComponent,
    SheetStep1Component,
    SheetStep2Component,
    SheetStep3Component,
    SheetStep4Component,
    SheetStep5Component,
    Step4HomeComponent,
    HeatShockComponent,
    HighLowComponent,
    LowTempFormComponent,
    HighTempFormComponent,
    HighTempHumiFormComponent,
    HighTempHumiVibrationFormComponent,
    InspectionFormComponent,
    ConfirmComponent,
    NoOvenComponent,
    RevisesSheetComponent,
    RevisesTableComponent,
    ReviseSheet1Component,
    ReviseSheet2Component,
    ReviseSheet3Component,
    ReviseSheet4Component,

  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })


  ],
  exports: [

  ],
  providers: [

  ]
})
export class RequestsModule { }
