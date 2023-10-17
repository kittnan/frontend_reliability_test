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
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderRouterModule,
} from 'ngx-ui-loader';
import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
// import { QeWindowPersonComponent } from './pages/qe-window-person/qe-window-person.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CorporateComponent } from './pages/dashboard/components/corporate/corporate.component';
import { SectionComponent } from './pages/dashboard/components/section/section.component';
import { DailyRemainComponent } from './pages/dashboard/components/daily-remain/daily-remain.component';
import { TableChamberComponent } from './pages/dashboard/components/table-chamber/table-chamber.component';
import { TableOperateRemainComponent } from './pages/dashboard/components/table-operate-remain/table-operate-remain.component';
import { ReportStatusComponent } from './pages/dashboard/components/report-status/report-status.component';
import { GuestComponent } from './pages/guest/guest.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DailyRemain2Component } from './pages/dashboard/components/daily-remain2/daily-remain2.component';
import { Dashboard2Component } from './pages/dashboard/dashboard2/dashboard2.component';
import { CardNumberComponent } from './pages/dashboard/components/card-number/card-number.component';
import { MomentPipe } from './pipe/moment.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// export function translateHttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
//   return new TranslateHttpLoader(new HttpClient(httpBackend));
// }

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#673ab7',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin',
  blur: 15,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#673ab7',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'cube-grid',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(145,145,145,0.8)',
  pbColor: '#000000',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
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
    ReportStatusComponent,
    GuestComponent,
    DailyRemain2Component,
    Dashboard2Component,
    CardNumberComponent,
    MomentPipe,
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
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
