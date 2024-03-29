import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveRoutingModule } from './approve-routing.module';
import { ApproveComponent } from './approve.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveManageComponent } from './approve-manage/approve-manage.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { ApproveRevisesTableComponent } from './revises/approve-revises-table/approve-revises-table.component';
import { ApproveRevisesApproveComponent } from './revises/approve-revises-approve/approve-revises-approve.component';


@NgModule({
  declarations: [
    ApproveComponent,
    ApproveManageComponent,
    ApproveRequestComponent,
    ApproveRevisesTableComponent,
    ApproveRevisesApproveComponent
  ],
  imports: [
    CommonModule,
    ApproveRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ApproveModule { }
