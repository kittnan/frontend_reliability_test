import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveManageComponent } from './approve-manage/approve-manage.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { ApproveComponent } from './approve.component';
import { ApproveRevisesTableComponent } from './revises/approve-revises-table/approve-revises-table.component';
import { ApproveRevisesApproveComponent } from './revises/approve-revises-approve/approve-revises-approve.component';


const routes: Routes = [
  {
    path: '',
    component: ApproveComponent,
    children: [
      {
        path: 'manage',
        component: ApproveManageComponent
      },
      {
        path: 'approve-request',
        component: ApproveRequestComponent
      },
      {
        path: 'revises-table',
        component: ApproveRevisesTableComponent
      },
      {
        path: 'revises-approve',
        component: ApproveRevisesApproveComponent
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
export class ApproveRoutingModule { }
