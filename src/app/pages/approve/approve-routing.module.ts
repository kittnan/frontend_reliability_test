import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveManageComponent } from './approve-manage/approve-manage.component';
import { ApproveComponent } from './approve.component';


const routes: Routes = [
  {
    path:'',
    component: ApproveComponent,
    children:[
      {
        path:'manage',
        component:ApproveManageComponent
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'manage'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRoutingModule { }
