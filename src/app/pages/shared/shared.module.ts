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
import {
  TranslateModule,
  TranslateLoader,
  TranslatePipe,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogApproveComponent } from './approve-form/dialog-approve/dialog-approve.component';
import { DialogRejectComponent } from './approve-form/dialog-reject/dialog-reject.component';
import { DialogApproveRevisesComponent } from './approve-form-revises/dialog-approve-revises/dialog-approve-revises.component';
import { DialogRejectRevisesComponent } from './approve-form-revises/dialog-reject-revises/dialog-reject-revises.component';
import { ShareRevisesTableComponent } from './share-revises-table/share-revises-table.component';
import { ViewLogComponent } from './views/view-log/view-log.component';
import { TopUpComponent } from './top-up/top-up.component';
import { RevisesFormComponent } from './revises-form/revises-form.component';
import { DialogSendmailComponent } from './approve-form/dialog-sendmail/dialog-sendmail.component';
import { CompareStep1Component } from './view-compare/compare-step1/compare-step1.component';
import { CompareStep2Component } from './view-compare/compare-step2/compare-step2.component';
import { CompareStep3Component } from './view-compare/compare-step3/compare-step3.component';
import { CompareStep4Component } from './view-compare/compare-step4/compare-step4.component';
import { HeatShockComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/heat-shock/heat-shock.component';
import { HighLowComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/high-low/high-low.component';
import { HighTempFormComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-form/high-temp-form.component';
import { HighTempHumiFormComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-humi-form/high-temp-humi-form.component';
import { HighTempHumiVibrationFormComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-humi-vibration-form/high-temp-humi-vibration-form.component';
import { InspectionFormComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/inspection-form/inspection-form.component';
import { LowTempFormComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/low-temp-form/low-temp-form.component';
import { NoOvenComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/no-oven/no-oven.component';
import { TempRoomComponent } from '../requests/sheet/components/sheet-step4/step4-form/step4-home/form/temp-room/temp-room.component';
import { ActualDetailComponent } from './views/actual-detail/actual-detail.component';
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
    DialogApproveRevisesComponent,
    DialogRejectRevisesComponent,
    ShareRevisesTableComponent,
    ViewLogComponent,
    ShareRevisesTableComponent,
    TopUpComponent,
    RevisesFormComponent,
    DialogSendmailComponent,
    CompareStep1Component,
    CompareStep2Component,
    CompareStep3Component,
    CompareStep4Component,
    HeatShockComponent,
    HighLowComponent,
    LowTempFormComponent,
    HighTempFormComponent,
    HighTempHumiFormComponent,
    HighTempHumiVibrationFormComponent,
    InspectionFormComponent,
    NoOvenComponent,
    TempRoomComponent,
    ActualDetailComponent,
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
        deps: [HttpClient],
      },
    }),
  ],
  providers: [DatePipe, TranslatePipe],
  exports: [
    ViewsComponent,
    TableRequestComponent,
    FilesReportComponent,
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
    QeReceiveComponent,
    ViewLogComponent,
    ShareRevisesTableComponent,
    TopUpComponent,
    RevisesFormComponent,
    DialogSendmailComponent,
    CompareStep1Component,
    CompareStep2Component,
    CompareStep3Component,
    CompareStep4Component,
    HeatShockComponent,
    HighLowComponent,
    LowTempFormComponent,
    HighTempFormComponent,
    HighTempHumiFormComponent,
    HighTempHumiVibrationFormComponent,
    InspectionFormComponent,
    NoOvenComponent,
    TempRoomComponent,
    ActualDetailComponent
  ],
})
export class SharedModule {}
