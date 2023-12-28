import { GuestComponent } from './pages/guest/guest.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { ApproveGuard } from './guards/approve.guard';
import { QeEngineerGuard } from './guards/qe-engineer.guard';
import { QeSectionHeadGuard } from './guards/qe-section-head.guard';
import { QeWindowPersonGuard } from './guards/qe-window-person.guard';
import { RequestGuard } from './guards/request.guard';
import { AdminModule } from './pages/admin/admin.module';
import { ApproveModule } from './pages/approve/approve.module';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QeEngineerModule } from './pages/qe-engineer/qe-engineer.module';
import { QeSectionHeadModule } from './pages/qe-section-head/qe-section-head.module';
import { QeWindowPersonModule } from './pages/qe-window-person/qe-window-person.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RequestsModule } from './pages/requests/requests.module';
import { Dashboard2Component } from './pages/dashboard/dashboard2/dashboard2.component';
import { QeTechnicalModule } from './pages/qe-technical/qe-technical.module';
import { QeTechnicalGuard } from './guards/qe-technical.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'request',
    loadChildren: () => RequestsModule,
    canActivate: [RequestGuard],
  },
  {
    path: 'approve',
    loadChildren: () => ApproveModule,
    canActivate: [ApproveGuard],
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [AdminGuard],
  },
  {
    path: 'qe-window-person',
    loadChildren: () => QeWindowPersonModule,
    canActivate: [QeWindowPersonGuard],
  },
  {
    path: 'qe-engineer',
    loadChildren: () => QeEngineerModule,
    canActivate: [QeEngineerGuard],
  },
  {
    path: 'qe-section-head',
    loadChildren: () => QeSectionHeadModule,
    canActivate: [QeSectionHeadGuard],
  },
  {
    path: 'qe-technical',
    loadChildren: () => QeTechnicalModule,
    canActivate: [QeTechnicalGuard],
  },
  {
    path: 'view-page',
    component: ViewPageComponent,
  },
  {
    path: 'dashboard',
    // component: DashboardComponent
    component: Dashboard2Component,
  },
  {
    path: 'guest',
    component: GuestComponent,
  },


  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
