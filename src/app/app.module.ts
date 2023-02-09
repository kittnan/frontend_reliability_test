import { SharedModule } from './pages/shared/shared.module';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './pages/footer/footer.component';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig
} from "ngx-ui-loader";
import { HttpClientModule } from '@angular/common/http';
// import { QeWindowPersonComponent } from './pages/qe-window-person/qe-window-person.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CorporateComponent } from './pages/dashboard/components/corporate/corporate.component';
import { SectionComponent } from './pages/dashboard/components/section/section.component';
import { DailyRemainComponent } from './pages/dashboard/components/daily-remain/daily-remain.component';
import { TableChamberComponent } from './pages/dashboard/components/table-chamber/table-chamber.component';
import { TableOperateRemainComponent } from './pages/dashboard/components/table-operate-remain/table-operate-remain.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#673ab7",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin",
  "blur": 15,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#673ab7",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "cube-grid",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(145,145,145,0.8)",
  "pbColor": "#000000",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    FooterComponent,
    // QeWindowPersonComponent,
    ViewPageComponent,
    DashboardComponent,
    CorporateComponent,
    SectionComponent,
    DailyRemainComponent,
    TableChamberComponent,
    TableOperateRemainComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
