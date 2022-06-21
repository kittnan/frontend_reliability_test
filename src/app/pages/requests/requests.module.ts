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
import { Step4TestingConditionComponent } from './home/step4-testing-condition/step4-testing-condition.component';


@NgModule({
  declarations: [
    RequestsComponent,
    HomeComponent,
    Step1RequestComponent,
    Step2TestPurposeComponent,
    Step3TestingTypeComponent,
    Step4TestingConditionComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RequestsModule { }
