import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveRoutingModule } from './approve-routing.module';
import { ApproveComponent } from './approve.component';


@NgModule({
  declarations: [
    ApproveComponent
  ],
  imports: [
    CommonModule,
    ApproveRoutingModule
  ]
})
export class ApproveModule { }
