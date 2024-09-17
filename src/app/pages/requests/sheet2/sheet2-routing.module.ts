import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sheet2Component } from './sheet2.component';
import { Sheet2Page1Component } from './page/sheet2-page1/sheet2-page1.component';

const routes: Routes = [
  {
    path: '',
    component: Sheet2Component,
    children: [
      {
        path: 'page1',
        component: Sheet2Page1Component
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'page1'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sheet2RoutingModule { }
