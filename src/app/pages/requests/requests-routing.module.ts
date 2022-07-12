import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
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
        path:'manage',
        component:ManageComponent
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
