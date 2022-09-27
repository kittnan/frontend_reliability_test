import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QeDepartmentHeadRoutingModule } from './qe-department-head-routing.module';
import { QeDepartmentHeadComponent } from './qe-department-head.component';
import { QeDepartmentManageComponent } from './qe-department-manage/qe-department-manage.component';
import { QeDepartmentApproveComponent } from './qe-department-approve/qe-department-approve.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    QeDepartmentHeadComponent,
    QeDepartmentManageComponent,
    QeDepartmentApproveComponent
  ],
  imports: [
    CommonModule,
    QeDepartmentHeadRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class QeDepartmentHeadModule { }
