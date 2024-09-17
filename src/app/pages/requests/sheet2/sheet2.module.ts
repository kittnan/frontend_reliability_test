import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sheet2RoutingModule } from './sheet2-routing.module';
import { Sheet2Component } from './sheet2.component';
import { Sheet2Page1Component } from './page/sheet2-page1/sheet2-page1.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SharedModule } from '../../shared/shared.module';
import { HttpLoaderFactory } from '../requests.module';


@NgModule({
  declarations: [
    Sheet2Component,
    Sheet2Page1Component
  ],
  imports: [
    CommonModule,
    Sheet2RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ]
})
export class Sheet2Module { }
