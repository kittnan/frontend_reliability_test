import { ConfirmComponent } from './confirm/confirm.component';
import { SheetComponent } from './sheet/sheet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { RequestsComponent } from './requests.component';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    children: [
      // {
      //   path:'home',
      //   component:HomeComponent
      // },
      {
        path: 'sheet',
        component: SheetComponent
      },
      {
        path: 'confirm',
        component: ConfirmComponent
      },

      {
        path: 'manage',
        component: ManageComponent
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
export class RequestsRoutingModule { }
