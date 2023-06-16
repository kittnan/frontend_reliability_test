import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeEngineerApproveComponent } from './qe-engineer-approve/qe-engineer-approve.component';
import { QeEngineerManageComponent } from './qe-engineer-manage/qe-engineer-manage.component';
import { QeEngineerComponent } from './qe-engineer.component';
import { QeEngineerReviseTableComponent } from './revise/qe-engineer-revise-table/qe-engineer-revise-table.component';
import { QeEngineerReviseApproveComponent } from './revise/qe-engineer-revise-approve/qe-engineer-revise-approve.component';


const routes: Routes = [
  {
    path: '',
    component: QeEngineerComponent,
    children: [
      {
        path: 'manage',
        component: QeEngineerManageComponent
      },
      {
        path: 'approve-request',
        component: QeEngineerApproveComponent
      },
      {
        path: 'revises-table',
        component: QeEngineerReviseTableComponent
      },
      {
        path: 'revises-approve',
        component: QeEngineerReviseApproveComponent
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
export class QeEngineerRoutingModule { }
