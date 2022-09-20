import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QeWindowPersonRoutingModule } from './qe-window-person-routing.module';
import { QeApproveManageComponent } from './qe-approve-manage/qe-approve-manage.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    QeApproveManageComponent
  ],
  imports: [
    CommonModule,
    QeWindowPersonRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class QeWindowPersonModule { }
