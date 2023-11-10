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
import { QeWindowPersonReviseTableComponent } from './revise/qe-window-person-revise-table/qe-window-person-revise-table.component';
import { QeWindowPersonReviseApproveComponent } from './revise/qe-window-person-revise-approve/qe-window-person-revise-approve.component';
import { TablePlaningComponent } from './revise/qe-window-person-revise-approve/components/table-planing/table-planing.component';
import { RevisesQueuesComponent } from './revise/qe-window-person-revise-approve/components/revises-queues/revises-queues.component';
import { DialogSelectDateComponent } from './qe-chamber/components/dialog-select-date/dialog-select-date.component';
import { PlanTableComponent } from './plan/components/plan-table/plan-table.component';
import { PlanDetailComponent } from './plan/components/plan-detail/plan-detail.component';
import { PlanComponent } from './plan/plan.component';
import { PlanDetail1Component } from './plan/components/plan-detail/components/plan-detail1/plan-detail1.component';
import { PlanDetail2Component } from './plan/components/plan-detail/components/plan-detail2/plan-detail2.component';
import { PlanDetail3Component } from './plan/components/plan-detail/components/plan-detail3/plan-detail3.component';
import { PlanEditComponent } from './plan-edit/plan-edit.component';
import { PlanActualComponent } from './plan-actual/plan-actual.component';
import { PlanActualDetailComponent } from './plan-actual/components/plan-actual-detail/plan-actual-detail.component';

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
    QeWindowPersonReviseTableComponent,
    QeWindowPersonReviseApproveComponent,
    TablePlaningComponent,
    RevisesQueuesComponent,
    DialogSelectDateComponent,
    PlanComponent,
    PlanTableComponent,
    PlanDetailComponent,
    PlanDetail1Component,
    PlanDetail2Component,
    PlanDetail3Component,
    PlanEditComponent,
    PlanActualComponent,
    PlanActualDetailComponent,
  ],
  imports: [
    CommonModule,
    QeWindowPersonRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [],
})
export class QeWindowPersonModule {}
