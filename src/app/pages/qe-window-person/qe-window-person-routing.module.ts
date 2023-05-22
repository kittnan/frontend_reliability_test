import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeApproveManageComponent } from './qe-approve-manage/qe-approve-manage.component';
import { QeChamberComponent } from './qe-chamber/qe-chamber.component';
import { QeWindowApproveComponent } from './qe-window-approve/qe-window-approve.component';
import { QeWindowPersonComponent } from './qe-window-person.component';
import { QeWindowReportComponent } from './qe-window-report/qe-window-report.component';
import { QeRevisesTableComponent } from './qe-revises-table/qe-revises-table.component';
import { QeRevisesApproveComponent } from './qe-revises-approve/qe-revises-approve.component';


const routes: Routes = [
  {
    path: '',
    component: QeWindowPersonComponent,
    children: [
      {
        path: 'manage',
        component: QeApproveManageComponent
      },
      {
        path: 'approve-request',
        component: QeWindowApproveComponent
      },
      {
        path: 'chamber',
        component: QeChamberComponent
      },

      {
        path: 'report',
        component: QeWindowReportComponent
      },
      {
        path: 'revises-table',
        component: QeRevisesTableComponent
      },
      {
        path: 'revises-approve',
        component: QeRevisesApproveComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QeWindowPersonRoutingModule { }
