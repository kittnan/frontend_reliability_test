import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QeSectionHeadRoutingModule } from './qe-section-head-routing.module';
import { QeSectionHeadComponent } from './qe-section-head.component';
import { QeSectionHeadManageComponent } from './qe-section-head-manage/qe-section-head-manage.component';
import { QeSectionHeadApproveComponent } from './qe-section-head-approve/qe-section-head-approve.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { QeSectionHeadReviseTableComponent } from './revise/qe-section-head-revise-table/qe-section-head-revise-table.component';
import { QeSectionHeadReviseApproveComponent } from './revise/qe-section-head-revise-approve/qe-section-head-revise-approve.component';


@NgModule({
  declarations: [
    QeSectionHeadComponent,
    QeSectionHeadManageComponent,
    QeSectionHeadApproveComponent,
    QeSectionHeadReviseTableComponent,
    QeSectionHeadReviseApproveComponent
  ],
  imports: [
    CommonModule,
    QeSectionHeadRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class QeSectionHeadModule { }
