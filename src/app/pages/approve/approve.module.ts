import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveRoutingModule } from './approve-routing.module';
import { ApproveComponent } from './approve.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveManageComponent } from './approve-manage/approve-manage.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ApproveComponent,
    ApproveManageComponent
  ],
  imports: [
    CommonModule,
    ApproveRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ApproveModule { }
