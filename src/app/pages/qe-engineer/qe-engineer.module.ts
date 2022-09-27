import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QeEngineerRoutingModule } from './qe-engineer-routing.module';
import { QeEngineerComponent } from './qe-engineer.component';
import { QeEngineerManageComponent } from './qe-engineer-manage/qe-engineer-manage.component';
import { QeEngineerApproveComponent } from './qe-engineer-approve/qe-engineer-approve.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    QeEngineerComponent,
    QeEngineerManageComponent,
    QeEngineerApproveComponent
  ],
  imports: [
    CommonModule,
    QeEngineerRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class QeEngineerModule { }
