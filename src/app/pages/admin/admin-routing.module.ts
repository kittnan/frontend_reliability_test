import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './chamber/table/table.component';
import { AuthorizeMasterComponent } from './master-manage/authorize-master/authorize-master.component';
import { DepartmentComponent } from './master-manage/department/department.component';
import { FunctionChamberComponent } from './master-manage/function-chamber/function-chamber.component';
import { MasterManageComponent } from './master-manage/master-manage.component';
import { ModelMasterComponent } from './master-manage/model-master/model-master.component';
import { SectionMasterComponent } from './master-manage/section-master/section-master.component';
import { TestPurposeMasterComponent } from './master-manage/test-purpose-master/test-purpose-master.component';
import { TestingTypeMasterComponent } from './master-manage/testing-type-master/testing-type-master.component';
import { GroupComponent } from './operate/group/group.component';
import { ItemsComponent } from './operate/items/items.component';
import { UserManageComponent } from './user-manage/user-manage.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'user-manage',
        component: UserManageComponent
      },
      {
        path: 'master-manage',
        component: MasterManageComponent
      },
      {
        path: 'department',
        component: DepartmentComponent
      },
      {
        path: 'section',
        component: SectionMasterComponent
      },
      {
        path: 'authorize',
        component: AuthorizeMasterComponent
      },
      {
        path: 'model',
        component: ModelMasterComponent
      },
      {
        path: 'test-purpose',
        component: TestPurposeMasterComponent
      },
      {
        path: 'testing-type',
        component: TestingTypeMasterComponent
      },
      {
        path: 'functional-chamber',
        component: FunctionChamberComponent
      },
      {
        path: 'chamber',
        component: TableComponent
      },
      {
        path: 'operate-group',
        component: GroupComponent
      },
      {
        path: 'operate-items',
        component: ItemsComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-manage'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
