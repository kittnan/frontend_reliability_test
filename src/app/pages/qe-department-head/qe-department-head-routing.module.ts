import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeDepartmentApproveComponent } from './qe-department-approve/qe-department-approve.component';
import { QeDepartmentHeadComponent } from './qe-department-head.component';
import { QeDepartmentManageComponent } from './qe-department-manage/qe-department-manage.component';

const routes: Routes = [
  {
    path: '',
    component: QeDepartmentHeadComponent,
    children: [
      {
        path: 'manage',
        component: QeDepartmentManageComponent
      },
      {
        path: 'approve-request',
        component: QeDepartmentApproveComponent
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
export class QeDepartmentHeadRoutingModule { }
