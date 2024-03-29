import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeSectionHeadApproveComponent } from './qe-section-head-approve/qe-section-head-approve.component';
import { QeSectionHeadManageComponent } from './qe-section-head-manage/qe-section-head-manage.component';
import { QeSectionHeadComponent } from './qe-section-head.component';
import { QeSectionHeadReviseTableComponent } from './revise/qe-section-head-revise-table/qe-section-head-revise-table.component';
import { QeSectionHeadReviseApproveComponent } from './revise/qe-section-head-revise-approve/qe-section-head-revise-approve.component';


const routes: Routes = [
  {
    path: '',
    component: QeSectionHeadComponent,
    children: [
      {
        path: 'manage',
        component: QeSectionHeadManageComponent
      },
      {
        path: 'approve-request',
        component: QeSectionHeadApproveComponent
      },
      {
        path: 'revises-table',
        component: QeSectionHeadReviseTableComponent
      },
      {
        path: 'revises-approve',
        component: QeSectionHeadReviseApproveComponent
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
export class QeSectionHeadRoutingModule { }
