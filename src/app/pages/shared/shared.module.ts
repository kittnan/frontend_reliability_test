import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponent } from './shared.component';
import { ViewsComponent } from './views/views.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Step1Component } from './views/step1/step1.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { Step2Component } from './views/step2/step2.component';
import { Step3Component } from './views/step3/step3.component';


@NgModule({
  declarations: [
    SharedComponent,
    ViewsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipeModule
  ],
  exports:[
    ViewsComponent
  ]
})
export class SharedModule { }
