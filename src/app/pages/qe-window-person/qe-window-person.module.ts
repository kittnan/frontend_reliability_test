import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QeWindowPersonRoutingModule } from './qe-window-person-routing.module';
import { QeApproveManageComponent } from './qe-approve-manage/qe-approve-manage.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { QeWindowApproveComponent } from './qe-window-approve/qe-window-approve.component';
import { QeWindowReportComponent } from './qe-window-report/qe-window-report.component';
import { QeChamberComponent } from './qe-chamber/qe-chamber.component';
import { QeChamberSelectComponent } from './qe-chamber-select/qe-chamber-select.component';
import { DialogQeChamberComponent } from './qe-chamber/dialog-qe-chamber/dialog-qe-chamber.component';


@NgModule({
  declarations: [
    QeApproveManageComponent,
    QeWindowApproveComponent,
    QeWindowReportComponent,
    QeChamberComponent,
    QeChamberSelectComponent,
    DialogQeChamberComponent
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
