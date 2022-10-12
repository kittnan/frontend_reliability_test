import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Step1RequestComponent } from './home/step1-request/step1-request.component';
import { Step2TestPurposeComponent } from './home/step2-test-purpose/step2-test-purpose.component';
import { Step3TestingTypeComponent } from './home/step3-testing-type/step3-testing-type.component';
import { Step4DoneComponent } from './home/step4-done/step4-done.component';

import { HttpClientModule } from '@angular/common/http';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { RequestSheetComponent } from './request-sheet/request-sheet.component';

import { Step1DetailComponent } from './request-sheet/step1-detail/step1-detail.component';
import { Step2TestingPurposeComponent } from './request-sheet/step2-testing-purpose/step2-testing-purpose.component';
import { Step3TestingTypeFormComponent } from './request-sheet/step3-testing-type-form/step3-testing-type-form.component';
import { Step4TestingConditionComponent } from './request-sheet/step4-testing-condition/step4-testing-condition.component';
import { TestingConditionFormComponent } from './request-sheet/step4-testing-condition/testing-condition-form/testing-condition-form.component';
import { TestingConditionTableComponent } from './request-sheet/step4-testing-condition/testing-condition-table/testing-condition-table.component';
import { DialogConditionComponent } from './request-sheet/step4-testing-condition/testing-condition-form/dialog-condition/dialog-condition.component';
import { FormTempComponent } from './request-sheet/step4-testing-condition/testing-condition-form/form-temp/form-temp.component';
import { FormHeatShockComponent } from './request-sheet/step4-testing-condition/testing-condition-form/form-heat-shock/form-heat-shock.component';
import { FormVibrationComponent } from './request-sheet/step4-testing-condition/testing-condition-form/form-vibration/form-vibration.component';
import { TestingConditionComponent } from './request-sheet/step4-testing-condition/testing-condition/testing-condition.component';
import { TempFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/temp-form-component/temp-form-component.component';
import { TempHumiFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/temp-humi-form-component/temp-humi-form-component.component';
import { TempHumiVibrationFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/temp-humi-vibration-form-component/temp-humi-vibration-form-component.component';
import { HeatShockFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/heat-shock-form-component/heat-shock-form-component.component';
import { HighLowFormComponentComponent } from './request-sheet/step4-testing-condition/testing-condition/formComponent/high-low-form-component/high-low-form-component.component';


@NgModule({
  declarations: [
    RequestsComponent,
    HomeComponent,
    Step1RequestComponent,
    Step2TestPurposeComponent,
    Step3TestingTypeComponent,
    Step4DoneComponent,
    ManageComponent,
    RequestSheetComponent,
    Step1DetailComponent,
    Step2TestingPurposeComponent,
    Step3TestingTypeFormComponent,
    Step4TestingConditionComponent,
    TestingConditionFormComponent,
    TestingConditionTableComponent,
    DialogConditionComponent,
    FormTempComponent,
    FormHeatShockComponent,
    FormVibrationComponent,
    TestingConditionComponent,
    TempFormComponentComponent,
    TempHumiFormComponentComponent,
    TempHumiVibrationFormComponentComponent,
    HeatShockFormComponentComponent,
    HighLowFormComponentComponent,

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
    PipeModule
  ],
  exports: [

  ]
})
export class RequestsModule { }
