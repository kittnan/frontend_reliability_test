import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestGuard } from './guards/request.guard';
import { AdminModule } from './pages/admin/admin.module';
import { ApproveModule } from './pages/approve/approve.module';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'request',
    loadChildren: () =>   import('./pages/requests/requests.module').then(
      (m) => m.RequestsModule
    ),
    canActivate: [RequestGuard]
  },
  {
    path: 'approve',
    loadChildren: () => ApproveModule
  }, 
  {
    path: 'admin',
    loadChildren: () => AdminModule
  }, 
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
