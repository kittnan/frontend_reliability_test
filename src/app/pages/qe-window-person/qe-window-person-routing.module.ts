import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeApproveManageComponent } from './qe-approve-manage/qe-approve-manage.component';
import { QeChamberComponent } from './qe-chamber/qe-chamber.component';
import { QeWindowApproveComponent } from './qe-window-approve/qe-window-approve.component';
import { QeWindowPersonComponent } from './qe-window-person.component';
import { QeWindowReportComponent } from './qe-window-report/qe-window-report.component';
import { QeWindowPersonReviseTableComponent } from './revise/qe-window-person-revise-table/qe-window-person-revise-table.component';
import { QeWindowPersonReviseApproveComponent } from './revise/qe-window-person-revise-approve/qe-window-person-revise-approve.component';
import { PlanComponent } from './plan/plan.component';
import { PlanEditComponent } from './plan-edit/plan-edit.component';
import { PlanActualComponent } from './plan-actual/plan-actual.component';

const routes: Routes = [
  {
    path: '',
    component: QeWindowPersonComponent,
    children: [
      {
        path: 'manage',
        component: QeApproveManageComponent,
      },
      {
        path: 'approve-request',
        component: QeWindowApproveComponent,
      },
      // {
      //   path: 'chamber',
      //   component: QeChamberComponent,
      // },
      {
        path: 'chamber',
        component: PlanComponent,
      },
      {
        path: 'plan-edit',
        component: PlanEditComponent,
      },
      {
        path: 'plan-actual',
        component: PlanActualComponent,
      },

      {
        path: 'report',
        component: QeWindowReportComponent,
      },
      {
        path: 'revises-table',
        component: QeWindowPersonReviseTableComponent,
      },
      {
        path: 'revises-approve',
        component: QeWindowPersonReviseApproveComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QeWindowPersonRoutingModule {}
