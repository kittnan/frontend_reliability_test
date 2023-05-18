import { ConfirmComponent } from './confirm/confirm.component';
import { SheetComponent } from './sheet/sheet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { RequestsComponent } from './requests.component';
import { RevisesSheetComponent } from './revises/revises-sheet/revises-sheet.component';
import { RevisesTableComponent } from './revises/revises-table/revises-table.component';

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
        path: 'revises-sheet',
        component: RevisesSheetComponent
      },
      {
        path: 'revises-table',
        component: RevisesTableComponent
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
