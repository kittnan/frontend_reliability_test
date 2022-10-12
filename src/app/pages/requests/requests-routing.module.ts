import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { RequestSheetComponent } from './request-sheet/request-sheet.component';
import { RequestsComponent } from './requests.component';

const routes: Routes = [
  {
    path:'',
    component: RequestsComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'request-sheet',
        component:RequestSheetComponent
      },
      {
        path:'manage',
        component:ManageComponent
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
export class RequestsRoutingModule { }
