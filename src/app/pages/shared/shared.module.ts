import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedComponent } from './shared.component';
import { ViewsComponent } from './views/views.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Step1Component } from './views/step1/step1.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { Step2Component } from './views/step2/step2.component';
import { Step3Component } from './views/step3/step3.component';
import { Step4Component } from './views/step4/step4.component';
import { DialogViewComponent } from './dialog-view/dialog-view.component';
import { Step4TwoComponent } from './views/step4-two/step4-two.component';
import { TableRequestComponent } from './table-request/table-request.component';
import { FormRequestComponent } from './form-request/form-request.component';
import { FilesReportComponent } from './files-report/files-report.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { TempFormComponent } from './temp-form/temp-form.component';
import { HumidityFormComponent } from './humidity-form/humidity-form.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { TimeFormComponent } from './time-form/time-form.component';
import { OperateFormComponent } from './operate-form/operate-form.component';
import { TimeInspecFormComponent } from './time-inspec-form/time-inspec-form.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { QtyFormComponent } from './qty-form/qty-form.component';
import { FrequencyFormComponent } from './frequency-form/frequency-form.component';
import { AccelerationFormComponent } from './acceleration-form/acceleration-form.component';
import { DirectionFormComponent } from './direction-form/direction-form.component';
import { ConditionTableComponent } from './condition-table/condition-table.component';


@NgModule({
  declarations: [
    SharedComponent,
    ViewsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    DialogViewComponent,
    Step4TwoComponent,
    TableRequestComponent,
    FormRequestComponent,
    FilesReportComponent,
    HeaderNavComponent,
    SideNavComponent,
    TempFormComponent,
    HumidityFormComponent,
    CycleFormComponent,
    TimeFormComponent,
    OperateFormComponent,
    TimeInspecFormComponent,
    SampleFormComponent,
    QtyFormComponent,
    FrequencyFormComponent,
    AccelerationFormComponent,
    DirectionFormComponent,
    ConditionTableComponent

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
  ],
  providers: [DatePipe],
  exports: [
    ViewsComponent,
    TableRequestComponent,
    FilesReportComponent,
    HeaderNavComponent,
    SideNavComponent,
    TempFormComponent,
    HumidityFormComponent,
    TimeFormComponent,
    CycleFormComponent,
    OperateFormComponent,
    TimeInspecFormComponent,
    SampleFormComponent,
    QtyFormComponent,
    FrequencyFormComponent,
    AccelerationFormComponent,
    DirectionFormComponent,
    ConditionTableComponent
  ]
})
export class SharedModule { }
