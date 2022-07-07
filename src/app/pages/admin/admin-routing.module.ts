import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MasterManageComponent } from './master-manage/master-manage.component';
import { UserManageComponent } from './user-manage/user-manage.component';

const routes: Routes = [
  {
    path:'',
    component: AdminComponent,
    children:[
      {
        path:'user-manage',
        component:UserManageComponent
      },
      {
        path:'master-manage',
        component:MasterManageComponent
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'user-manage'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
