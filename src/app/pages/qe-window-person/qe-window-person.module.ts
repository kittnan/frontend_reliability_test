import { QeWindowPersonComponent } from './qe-window-person.component';
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
import { QeChamberPlanningComponent } from './qe-chamber/qe-chamber-planning/qe-chamber-planning.component';
import { QeChamberPlanningDetailComponent } from './qe-chamber/qe-chamber-planning-detail/qe-chamber-planning-detail.component';
import { DialogQeChamberComponent } from './qe-chamber/components/dialog-qe-chamber/dialog-qe-chamber.component';
import { DialogQeOperateComponent } from './qe-chamber/components/dialog-qe-operate/dialog-qe-operate.component';
import { DialogDateComponent } from './qe-chamber/components/dialog-date/dialog-date.component';
import { DialogDateStartInspectionComponent } from './qe-chamber/components/dialog-date-start-inspection/dialog-date-start-inspection.component';
import { QeRevisesApproveComponent } from './qe-revises/qe-revises-approve/qe-revises-approve.component';
import { QeRevisesTableComponent } from './qe-revises/qe-revises-table/qe-revises-table.component';
import { PlanningTableComponent } from './qe-revises/components/planning-table/planning-table.component';
import { PlanningQueuesComponent } from './qe-revises/components/planning-queues/planning-queues.component';


@NgModule({
  declarations: [
    QeWindowPersonComponent,
    QeApproveManageComponent,
    QeWindowApproveComponent,
    QeWindowReportComponent,
    QeChamberComponent,
    DialogQeChamberComponent,
    DialogQeOperateComponent,
    QeChamberPlanningComponent,
    QeChamberPlanningDetailComponent,
    DialogDateComponent,
    DialogDateStartInspectionComponent,
    QeRevisesApproveComponent,
    QeRevisesTableComponent,
    PlanningTableComponent,
    PlanningQueuesComponent,
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
