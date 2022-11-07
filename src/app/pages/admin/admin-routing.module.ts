import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './chamber/table/table.component';
import { MasterManageComponent } from './master-manage/master-manage.component';
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
