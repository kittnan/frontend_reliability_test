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


import { HttpClientModule } from '@angular/common/http';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { RequestSheetComponent } from './request-sheet/request-sheet.component';

import { Step1DetailComponent } from './request-sheet/step1-detail/step1-detail.component';
import { Step2TestingPurposeComponent } from './request-sheet/step2-testing-purpose/step2-testing-purpose.component';
import { Step3TestingTypeFormComponent } from './request-sheet/step3-testing-type-form/step3-testing-type-form.component';
import { Step4TestingConditionComponent } from './request-sheet/step4-testing-condition/step4-testing-condition.component';
import { TestingConditionComponent } from './request-sheet/step4-testing-condition/testing-condition/testing-condition.component';
import { TempFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/temp-form-component/temp-form-component.component';
import { TempHumiFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/temp-humi-form-component/temp-humi-form-component.component';
import { TempHumiVibrationFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/temp-humi-vibration-form-component/temp-humi-vibration-form-component.component';
import { HeatShockFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/heat-shock-form-component/heat-shock-form-component.component';
import { HighLowFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/high-low-form-component/high-low-form-component.component';
import { InspectionFormComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/inspection-form/inspection-form.component';
import { Step5SubmitComponent } from './request-sheet/step5-submit/step5-submit.component';
import { SheetComponent } from './sheet/sheet.component';
import { SheetStep2Component } from './sheet/components/sheet-step2/sheet-step2.component';
import { Step4HeatShockComponent } from './sheet/components/sheet-step4/step4-form/step4-heat-shock/step4-heat-shock.component';
import { Step4HighLowComponent } from './sheet/components/sheet-step4/step4-form/step4-high-low/step4-high-low.component';
import { Step4TempFormComponent } from './sheet/components/sheet-step4/step4-form/step4-temp-form/step4-temp-form.component';
import { Step4HomeComponent } from './sheet/components/sheet-step4/step4-form/step4-home/step4-home.component';
import { Step4InspectionComponent } from './sheet/components/sheet-step4/step4-form/step4-inspection/step4-inspection.component';
import { Step4HumiComponent } from './sheet/components/sheet-step4/step4-form/step4-humi/step4-humi.component';
import { Step4VibrationComponent } from './sheet/components/sheet-step4/step4-form/step4-vibration/step4-vibration.component';
import { HeatShockComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/heat-shock/heat-shock.component';
import { HighLowComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-low/high-low.component';
import { HighTempFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-form/high-temp-form.component';
import { HighTempHumiFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-humi-form/high-temp-humi-form.component';
import { HighTempHumiVibrationFormComponent } from './sheet/components/sheet-step4/step4-form/step4-home/form/high-temp-humi-vibration-form/high-temp-humi-vibration-form.component';


@NgModule({
  declarations: [
    RequestsComponent,

    ManageComponent,
    RequestSheetComponent,
    Step1DetailComponent,
    Step2TestingPurposeComponent,
    Step3TestingTypeFormComponent,
    Step4TestingConditionComponent,
    TestingConditionComponent,
    TempFormComponentComponent,
    TempHumiFormComponentComponent,
    TempHumiVibrationFormComponentComponent,
    HeatShockFormComponentComponent,
    HighLowFormComponentComponent,
    InspectionFormComponent,
    Step5SubmitComponent,
    SheetComponent,
    SheetStep1Component,
    SheetStep2Component,
    SheetStep3Component,
    SheetStep4Component,
    SheetStep5Component,
    Step4HeatShockComponent,
    Step4HighLowComponent,
    Step4TempFormComponent,
    Step4HomeComponent,
    Step4InspectionComponent,
    Step4HumiComponent,
    Step4VibrationComponent,
    HeatShockComponent,
    HighLowComponent,
    LowTempFormComponent,
    HighTempFormComponent,
    HighTempHumiFormComponent,
    HighTempHumiVibrationFormComponent

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

  ],
  exports: [

  ],
  providers:[

  ]
})
export class RequestsModule { }
