import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QeTechnicalRoutingModule } from './qe-technical-routing.module';
import { QeTechnicalComponent } from './qe-technical.component';
import { QeTechnicalManageComponent } from './qe-technical-manage/qe-technical-manage.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { QeTechnicalRequestComponent } from './qe-technical-request/qe-technical-request.component';
import { QeTechnicalDetailComponent } from './qe-technical-request/qe-technical-detail/qe-technical-detail.component';
import { QeTechnicalEquipmentControlComponent } from './qe-technical-equipment-control/qe-technical-equipment-control.component';


@NgModule({
  declarations: [
    QeTechnicalComponent,
    QeTechnicalManageComponent,
    QeTechnicalRequestComponent,
    QeTechnicalDetailComponent,
    QeTechnicalEquipmentControlComponent,
  ],
  imports: [
    CommonModule,
    QeTechnicalRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class QeTechnicalModule { }
