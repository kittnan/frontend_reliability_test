import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedComponent } from './shared.component';
import { ViewsComponent } from './views/views.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Step1Component } from './views/step1/step1.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { Step2Component } from './views/step2/step2.component';
import { Step3Component } from './views/step3/step3.component';
import { Step4Component } from './views/step4/step4.component';
import { DialogViewComponent } from './dialog-view/dialog-view.component';
import { TableRequestComponent } from './table-request/table-request.component';
import { FilesReportComponent } from './files-report/files-report.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { ConditionTableComponent } from './condition-table/condition-table.component';
import { Step5Component } from './views/step5/step5.component';
import { ApproveFormComponent } from './approve-form/approve-form.component';
import { ChamberTableComponent } from './chamber-table/chamber-table.component';
import { PlanReliabilityTestComponent } from './plan-reliability-test/plan-reliability-test.component';
import { InputOperateComponent } from './form-components/input-operate/input-operate.component';
import { InputSampleComponent } from './form-components/input-sample/input-sample.component';
import { InputQtyComponent } from './form-components/input-qty/input-qty.component';
import { InputTimeInspecComponent } from './form-components/input-time-inspec/input-time-inspec.component';
import { InputTempComponent } from './form-components/input-temp/input-temp.component';
import { InputHumiComponent } from './form-components/input-humi/input-humi.component';
import { InputFrequencyComponent } from './form-components/input-frequency/input-frequency.component';
import { InputAccelerationComponent } from './form-components/input-acceleration/input-acceleration.component';
import { InputTimeComponent } from './form-components/input-time/input-time.component';
import { InputCycleComponent } from './form-components/input-cycle/input-cycle.component';
import { InputDirectionComponent } from './form-components/input-direction/input-direction.component';
import { DialogAuthComponent } from './dialog-auth/dialog-auth.component';
import { TableOperateComponent } from './table-operate/table-operate.component';
import { CommentComponent } from './comment/comment.component';
import { QeReceiveComponent } from './qe-receive/qe-receive.component';
import { ConditionTableNoChamberComponent } from './condition-table-no-chamber/condition-table-no-chamber.component';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogApproveComponent } from './approve-form/dialog-approve/dialog-approve.component';
import { DialogRejectComponent } from './approve-form/dialog-reject/dialog-reject.component';
import { SuccessComponent } from './alert/success/success.component';
import { WarningComponent } from './alert/warning/warning.component';
import { DangerComponent } from './alert/danger/danger.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SharedComponent,
    ViewsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    DialogViewComponent,
    TableRequestComponent,
    FilesReportComponent,
    HeaderNavComponent,
    SideNavComponent,
    ConditionTableComponent,
    Step5Component,
    ApproveFormComponent,
    ChamberTableComponent,
    PlanReliabilityTestComponent,
    InputOperateComponent,
    InputSampleComponent,
    InputQtyComponent,
    InputTimeInspecComponent,
    InputTempComponent,
    InputHumiComponent,
    InputFrequencyComponent,
    InputAccelerationComponent,
    InputTimeComponent,
    InputCycleComponent,
    InputDirectionComponent,
    DialogAuthComponent,
    TableOperateComponent,
    CommentComponent,
    QeReceiveComponent,
    ConditionTableNoChamberComponent,
    DialogApproveComponent,
    DialogRejectComponent,
    SuccessComponent,
    WarningComponent,
    DangerComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipeModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DatePipe, TranslatePipe],
  exports: [
    ViewsComponent,
    TableRequestComponent,
    FilesReportComponent,
    HeaderNavComponent,
    SideNavComponent,
    ConditionTableComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    ApproveFormComponent,
    ChamberTableComponent,
    PlanReliabilityTestComponent,
    InputOperateComponent,
    InputSampleComponent,
    InputQtyComponent,
    InputTimeInspecComponent,
    InputTempComponent,
    InputHumiComponent,
    InputFrequencyComponent,
    InputAccelerationComponent,
    InputTimeComponent,
    InputCycleComponent,
    InputDirectionComponent,
    TableOperateComponent,
    CommentComponent,
    QeReceiveComponent
  ]
})
export class SharedModule { }
