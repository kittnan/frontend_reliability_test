import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeEngineerApproveComponent } from './qe-engineer-approve/qe-engineer-approve.component';
import { QeEngineerManageComponent } from './qe-engineer-manage/qe-engineer-manage.component';
import { QeEngineerComponent } from './qe-engineer.component';


const routes: Routes = [
  {
    path:'',
    component: QeEngineerComponent,
    children:[
      {
        path:'manage',
        component:QeEngineerManageComponent
      },
      {
        path:'approve-request',
        component:QeEngineerApproveComponent
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
export class QeEngineerRoutingModule { }
