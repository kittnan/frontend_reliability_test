import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeApproveManageComponent } from './qe-approve-manage/qe-approve-manage.component';
import { QeWindowPersonComponent } from './qe-window-person.component';


const routes: Routes = [
  {
    path:'',
    component: QeWindowPersonComponent,
    children:[
      {
        path:'manage',
        component:QeApproveManageComponent
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
export class QeWindowPersonRoutingModule { }
