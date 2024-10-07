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
import { ConfirmComponent } from './confirm/confirm.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RevisesSheetComponent } from './revises/revises-sheet/revises-sheet.component';
import { RevisesTableComponent } from './revises/revises-table/revises-table.component';
import { RevisesSheet1Component } from './revises/revises-sheet/components/revises-sheet1/revises-sheet1.component';
import { RevisesSheet2Component } from './revises/revises-sheet/components/revises-sheet2/revises-sheet2.component';
import { RevisesSheet3Component } from './revises/revises-sheet/components/revises-sheet3/revises-sheet3.component';
import { RevisesSheet4Component } from './revises/revises-sheet/components/revises-sheet4/revises-sheet4.component';
import { RevisesSheet5Component } from './revises/revises-sheet/components/revises-sheet5/revises-sheet5.component';
import { RevisesApproveComponent } from './revises/revises-approve/revises-approve.component';
import { Sheet3Component } from './sheet3/sheet3.component';
import { Sheet3Step1Component } from './sheet3/components/sheet3-step1/sheet3-step1.component';
import { Sheet3Step2Component } from './sheet3/components/sheet3-step2/sheet3-step2.component';
import { Sheet3Step3Component } from './sheet3/components/sheet3-step3/sheet3-step3.component';
import { Sheet3Step4Component } from './sheet3/components/sheet3-step4/sheet3-step4.component';
import { Sheet3Step5Component } from './sheet3/components/sheet3-step5/sheet3-step5.component';
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

    ConfirmComponent,
    RevisesSheetComponent,
    RevisesTableComponent,
    RevisesSheet1Component,
    RevisesSheet2Component,
    RevisesSheet3Component,
    RevisesSheet4Component,
    RevisesSheet5Component,
    RevisesApproveComponent,
    Sheet3Component,
    Sheet3Step1Component,
    Sheet3Step2Component,
    Sheet3Step3Component,
    Sheet3Step4Component,
    Sheet3Step5Component,
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
        deps: [HttpClient],
      },
    }),
  ],
  exports: [],
  providers: [],
})
export class RequestsModule {}
