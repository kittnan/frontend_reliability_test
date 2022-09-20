import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { Step4Component } from './views/step4/step4.component';
import { DialogViewComponent } from './dialog-view/dialog-view.component';


@NgModule({
  declarations: [
    SharedComponent,
    ViewsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    DialogViewComponent
    
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
  providers:[DatePipe],
  exports:[
    ViewsComponent
  ]
})
export class SharedModule { }
