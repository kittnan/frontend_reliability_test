import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QeTechnicalComponent } from './qe-technical.component';
import { QeTechnicalManageComponent } from './qe-technical-manage/qe-technical-manage.component';
import { QeTechnicalRequestComponent } from './qe-technical-request/qe-technical-request.component';
import { QeTechnicalEquipmentControlComponent } from './qe-technical-equipment-control/qe-technical-equipment-control.component';

const routes: Routes = [
  {
    path: '',
    component: QeTechnicalComponent,
    children: [
      {
        path: 'manage',
        component: QeTechnicalManageComponent
      },
      {
        path: 'request',
        component: QeTechnicalRequestComponent
      },
      {
        path: 'equipment-control',
        component: QeTechnicalEquipmentControlComponent
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
export class QeTechnicalRoutingModule { }
